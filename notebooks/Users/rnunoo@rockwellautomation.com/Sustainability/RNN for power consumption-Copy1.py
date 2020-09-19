# Databricks notebook source
## importing Packages 
import numpy as np
from numpy import concatenate
import pandas as pd
import math
import seaborn as sns
from math import sqrt
import matplotlib.pyplot as plt
from keras.models import Sequential
from keras.layers import Dense, Dropout, LSTM
from keras.callbacks import EarlyStopping
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error
from pandas import read_csv
from matplotlib import pyplot

from pandas import read_csv
from pandas import DataFrame
from pandas import concat
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import MinMaxScaler

# COMMAND ----------

# File location and type
file_location ="/FileStore/tables/df2.csv"
file_type = "csv"

# CSV options
infer_schema = "True"
first_row_is_header = "True"
delimiter = ","

# The applied options are for CSV files. For other file types, these will be ignored.
df = spark.read.format(file_type) \
  .option("inferSchema", infer_schema) \
  .option("header", first_row_is_header) \
  .option("sep", delimiter) \
  .load(file_location)

aggreg_data= df.toPandas()

# COMMAND ----------

##Importing data
#aggreg_data = pd.read_csv (r'C:\Users\rnunoo\Documents\Sustainability_DownloadMe\Sustainability_DownloadMe\Sustainability_Dataset\Twinsburg, Ohio\July Data Only\aggreg_dataset.csv')

# COMMAND ----------

#missing values
len(aggreg_data) - aggreg_data.count()

# COMMAND ----------

aggreg_data1 = aggreg_data[aggreg_data.Time_Stamp <= '7/28/2020 23:30']
len(aggreg_data1) - aggreg_data1.count()

# COMMAND ----------

aggreg_data1.fillna(aggreg_data1.mean(), inplace =True)
aggreg_data1.dtypes

# COMMAND ----------


aggreg_data1['KW']= aggreg_data1['KW'].str.replace(',','')
aggreg_data1['KVA'] = aggreg_data1['KVA'].str.replace(',','')
#aggreg_data1['SM4-TAC'] = aggreg_data1['SM4-TAC'].str.replace(',','')
aggreg_data1['KW']= aggreg_data1['KW'].astype(float)
aggreg_data1['KVA'] = aggreg_data1['KVA'].astype(float)
aggreg_data1['SM4-TAC'] = aggreg_data1['SM4-TAC'].astype(float)
aggreg_data1.dtypes

# COMMAND ----------

aggreg_data1['Energy_cost'] = aggreg_data1['BILL-RATE']*aggreg_data1['KW']

# COMMAND ----------

aggreg_data1.head()

# COMMAND ----------

aggreg_data2 = aggreg_data1 [['Time_Stamp','Compressor Running %','compressor_KWH','KWH_SM1','KWH_SM4','KWH_SM7','PF','KWH']]
aggreg_data2.set_index('Time_Stamp')
aggreg_data2_ts = aggreg_data2.set_index('Time_Stamp')

# COMMAND ----------

values = aggreg_data2_ts.values
# specify columns to plot
groups = [0, 1, 2, 3, 4, 5, 6]
i = 1
# plot each column
pyplot.figure(figsize=(10,6))
for group in groups:
	pyplot.subplot(len(groups), 1, i)
	pyplot.plot(values[:, group])
	pyplot.title(aggreg_data2_ts.columns[group], y=0.5, loc='right')
	i += 1
pyplot.show()

# COMMAND ----------

variables = ['Compressor Running %','compressor_KWH','KWH_SM1','KWH_SM4','KWH_SM7','PF','KWH','TEMP','SM1-TAC','SM4-TAC','SM7-TAC']
df_features = aggreg_data1[variables]
corr = df_features.corr()

ax = sns.heatmap(
    corr, 
    vmin=-1, vmax=1, center=0,
    cmap=sns.diverging_palette(20, 220, n=200),
    square=True
)
ax.set_xticklabels(
    ax.get_xticklabels(),
    rotation=45,
    horizontalalignment='right'
)

# COMMAND ----------

len(values)

# COMMAND ----------

# Framing the problem as a supervised learning problem

# Predict the Energy consumption at premise for the next 30 min based on: 
#   ✔ weather conditions*
#   ✔
#   ✔
#   ✔
#   ✔
#over the last 24 hours.

# COMMAND ----------

# convert series to supervised learning
def series_to_supervised(data, n_in=1, n_out=1, dropnan=True):
	n_vars = 1 if type(data) is list else data.shape[1]
	df = DataFrame(data)
	cols, names = list(), list()
	# input sequence (t-n, ... t-1)
	for i in range(n_in, 0, -1):
		cols.append(df.shift(i))
		names += [('var%d(t-%d)' % (j+1, i)) for j in range(n_vars)]
	# forecast sequence (t, t+1, ... t+n)
	for i in range(0, n_out):
		cols.append(df.shift(-i))
		if i == 0:
			names += [('var%d(t)' % (j+1)) for j in range(n_vars)]
		else:
			names += [('var%d(t+%d)' % (j+1, i)) for j in range(n_vars)]
	# put it all together
	agg = concat(cols, axis=1)
	agg.columns = names
	# drop rows with NaN values
	if dropnan:
		agg.dropna(inplace=True)
	return agg

# COMMAND ----------

# prepare data for RNN


# convert data to float
values = values.astype('float32')
# normalize features
#scaler = MinMaxScaler(feature_range=(0, 1))
#scaled = scaler.fit_transform(values)
# frame as supervised learning
reframed = series_to_supervised(values, 1, 1)

print(reframed.head())

# COMMAND ----------

# train test split
values = reframed.values
n_train_min = 20 * 24 * 2 # Training with 20 days data
train = values[:n_train_min, :]
test = values[n_train_min:, :]

# split into input and outputs
train_X, train_y = train[:, :-1], train[:, -1]
test_X, test_y = test[:, :-1], test[:, -1]

# reshape input to be 3D [samples, timesteps, features]
train_X = train_X.reshape((train_X.shape[0], 1, train_X.shape[1]))
test_X = test_X.reshape((test_X.shape[0], 1, test_X.shape[1]))
print(train_X.shape, train_y.shape, test_X.shape, test_y.shape)

# COMMAND ----------

#Build RNN
# design network
model = Sequential()
model.add(LSTM(1000, input_shape=(train_X.shape[1], train_X.shape[2])))
model.add(Dense(1))
model.compile(loss='mae', optimizer='adam')
# fit network
history = model.fit(train_X, train_y, epochs=90, batch_size=72, validation_data=(test_X, test_y), verbose=2, shuffle=False)


# COMMAND ----------

# plot history
pyplot.plot(history.history['loss'], label='train')
pyplot.plot(history.history['val_loss'], label='test')
pyplot.legend()
pyplot.show()

# COMMAND ----------

#prediction
yhat = model.predict(test_X)
test_X=test_X.reshape((test_X.shape[0], test_X.shape[2]))

# COMMAND ----------

# invert scaling for forecast
inv_yhat = concatenate((yhat, test_X[:, 1:]), axis=1)
#scaler = MinMaxScaler(feature_range=(0, 1)).fit(inv_yhat)
#pred_y = scaler.inverse_transform(inv_yhat)
pred_y = inv_yhat[:,0]

# COMMAND ----------

# invert scaling for actual
test_y = test_y.reshape((len(test_y), 1))
#inv_y = concatenate((test_y, test_X[:, 1:]), axis=1)
#scaler = MinMaxScaler(feature_range=(0, 1)).fit(inv_y)
#act_y = scaler.inverse_transform(inv_y)
act_y = test_y [:,0]

# COMMAND ----------

#calculate RMSE
rmse = sqrt(mean_squared_error(pred_y, act_y))
print('Test RMSE: %.3f' % rmse)

# COMMAND ----------

def mape(y_true, y_pred): 
    y_true, y_pred = np.array(y_true), np.array(y_pred)
    return np.mean(np.abs((y_true - y_pred) / y_true)) * 100
mape = mape(act_y, pred_y)
print('%.3f' % mape)

# COMMAND ----------

act_y

# COMMAND ----------

pred_y