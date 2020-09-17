# Databricks notebook source
# MAGIC %md 
# MAGIC # Importing datasets from databricks fileStore  

# COMMAND ----------

import datetime
import pandas as pd
from math import *
import matplotlib.pyplot as plt
import numpy as np

# COMMAND ----------

# Air_compressor data

file_location = "/FileStore/tables/Twinsburg_Main_Air_Compressor.csv"
file_type = "csv"

# CSV options
infer_schema = "true"
first_row_is_header = "true"
delimiter = ","

# The applied options are for CSV files. For other file types, these will be ignored.
df1 = spark.read.format(file_type) \
  .option("inferSchema", infer_schema) \
  .option("header", first_row_is_header) \
  .option("sep", delimiter) \
  .load(file_location)

compressor_data = df1.toPandas()

#dropping irrelevant data 
compressor_data = compressor_data.drop(columns = ['Compressor Total Run Hours (Hours)','Compressed Air Desiccant Dryer Dew Point (F)','Outside_Humidity (% RH)','OutSide_Temp (F)', 'Compressed Air Flow near distribution header (SCFM)','Compressed Air Totalizer near distribution header (m3n)','_c15','_c16','_c17','SampleNumber'])

compressor_data.rename(columns ={'Time Stamp':'Time_Stamp'},inplace = True)

# COMMAND ----------

# Production data 
file_location = "/FileStore/tables/Barcode_Reflow_Oven_Scan_Times_July_2020_1.csv"
file_type = "csv"

# CSV options
infer_schema = "true"
first_row_is_header = "true"
delimiter = ","

# The applied options are for CSV files. For other file types, these will be ignored.
df2 = spark.read.format(file_type) \
  .option("inferSchema", infer_schema) \
  .option("header", first_row_is_header) \
  .option("sep", delimiter) \
  .load(file_location)
production_data = df2.toPandas()
#dropping irrelevant data 
production_data = production_data.drop(columns = ['COMPLETE REASON','CONST TIME','PLANT','AREA','OPERATION','Unique Index'])
production_data.rename(columns ={'PRIOR COMPLETION TIME':'Time_Stamp'},inplace = True)

# COMMAND ----------

# Energy usage cost
file_location = "/FileStore/tables/julyUsage.csv"
file_type = "csv"

# CSV options
infer_schema = "true"
first_row_is_header = "true"
delimiter = ","

df3 = spark.read.format(file_type) \
  .option("inferSchema", infer_schema) \
  .option("header", first_row_is_header) \
  .option("sep", delimiter) \
  .load(file_location)
Usage_cost = df3.toPandas()

# COMMAND ----------

# Oven trend_data
file_location = "/FileStore/tables/July2020_Oven_TrendData-2.csv"
file_type = "csv"

# CSV options
infer_schema = "true"
first_row_is_header = "true"
delimiter = ","

df4 = spark.read.format(file_type) \
  .option("inferSchema", infer_schema) \
  .option("header", first_row_is_header) \
  .option("sep", delimiter) \
  .load(file_location)
Oven_trend = df4.toPandas()
#Cleaning and reorganizing data
Oven_trend = Oven_trend.iloc[4:]
Oven_trend.columns =['Time_Stamp',	'Avg_Current_SM1','Avg_Voltage_SM1','Avg_Current_SM4','Avg_Voltage_SM4','Avg_Current_SM7','Avg_Voltage_SM7']

# COMMAND ----------

# meter data
file_location = "/FileStore/tables/Meter_Jan1_to_July_28_2020_interval_data.csv"
file_type = "csv"

# CSV options
infer_schema = "true"
first_row_is_header = "true"
delimiter = ","

# The applied options are for CSV files. For other file types, these will be ignored.
df5 = spark.read.format(file_type) \
  .option("inferSchema", infer_schema) \
  .option("header", first_row_is_header) \
  .option("sep", delimiter) \
  .load(file_location)
meter_data = df5.toPandas()
meter_data ['Time_Stamp'] = meter_data['Date']+' '+meter_data['Time']
#dropping irrelevant data 
meter_data = meter_data.drop(columns = ['CAP KVAR','CAP KVA','CAP PF','MV90 ID','Rate','Premise','Name','Address','Date','Time'])

# COMMAND ----------

# MAGIC %md
# MAGIC # five dataset
# MAGIC ###compressor_data
# MAGIC ###meter_data
# MAGIC ###Oven_trend
# MAGIC ###Usage_cost*
# MAGIC ###production_data

# COMMAND ----------

compressor_data.head()

# COMMAND ----------

meter_data.head(10)

# COMMAND ----------

production_data.head()

# COMMAND ----------

# MAGIC %md
# MAGIC ## Calculating Energy (KWH)

# COMMAND ----------

#Changing datatypes 

Oven_trend['Time_Stamp']=pd.to_datetime(Oven_trend['Time_Stamp'])
Oven_trend['Avg_Current_SM1'] = Oven_trend['Avg_Current_SM1'].astype(float)
Oven_trend['Avg_Current_SM4'] = Oven_trend['Avg_Current_SM4'].astype(float)
Oven_trend['Avg_Current_SM7'] = Oven_trend['Avg_Current_SM7'].astype(float)
Oven_trend['Avg_Voltage_SM1'] = Oven_trend['Avg_Voltage_SM1'].astype(float)
Oven_trend['Avg_Voltage_SM4'] = Oven_trend['Avg_Voltage_SM4'].astype(float)
Oven_trend['Avg_Voltage_SM7'] = Oven_trend['Avg_Voltage_SM7'].astype(float)

## Energy consumed by each oven 
Oven_trend['KWH_SM1'] = (Oven_trend['Avg_Current_SM1']*Oven_trend['Avg_Voltage_SM1'])/250
Oven_trend['KWH_SM4'] = (Oven_trend['Avg_Current_SM4']*Oven_trend['Avg_Voltage_SM4'])/250
Oven_trend['KWH_SM7'] = (Oven_trend['Avg_Current_SM7']*Oven_trend['Avg_Voltage_SM7'])/250


# COMMAND ----------



compressor_data['Time_Stamp'] = pd.to_datetime(compressor_data['Time_Stamp'])
compressor_data['Compressor Running %'] = compressor_data['Compressor Running %'].astype(float)
compressor_data['Compressor Motor Current (Amps)'] = compressor_data['Compressor Motor Current (Amps)'].astype(float)
compressor_data['Compressed Motor Speed (RPM)'] = compressor_data['Compressed Motor Speed (RPM)'].astype(float)
compressor_data['Compressor Motor Voltage (Volts)'] = compressor_data['Compressor Motor Voltage (Volts)'].astype(float)
compressor_data['Compressor Discharge Pressure (PSI)'] = compressor_data['Compressor Discharge Pressure (PSI)'].astype(float)
compressor_data['Compressed Air Pressure near distribution header (PSI)'] = compressor_data['Compressed Air Pressure near distribution header (PSI)'].astype(float)
compressor_data['Compressed Air Stream Temperature near distribution header (F)'] = compressor_data['Compressed Air Stream Temperature near distribution header (F)'].astype(float)

##Energy consumption by compressor

compressor_data['compressor_KWH'] = (compressor_data['Compressor Motor Current (Amps)']*compressor_data['Compressor Motor Voltage (Volts)'])/60000

# COMMAND ----------

