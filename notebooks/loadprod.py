import datetime
import pandas as pd
from math import *
import matplotlib.pyplot as plt
import numpy as np

file_location = "main.csv"
file_type = "csv"

prod_location = r"Barcode Reflow Oven Scan Times July 2020_1.xlsx"
dfprod = pd.read_excel(prod_location, index_col=0)
df1 = pd.read_csv(file_location)

df = df1

# display(df1)

df[['Date', 'time']] = df['Time_Stamp'].str.split(" ", expand=True,)

def my_to_datetime(date_str):
    #print(date_str)
    if date_str[8:10] != '24':
        return pd.to_datetime(date_str, format='%m/%d/%Y %H:%M', errors='ignore')

    date_str = date_str[0:8] + '00' + date_str[10:]
    return pd.to_datetime(date_str, format='%m/%d/%Y %H:%M', errors='ignore') + \
           dt.timedelta(days=1)
df['Time_Stamp'] = df.Time_Stamp.apply(my_to_datetime) 

dateStartMatch = pd.to_datetime('2020-01-01 00:30:00')

for idx, row in df.iterrows():
    
    print(row['Time_Stamp']) 
    # np.datetime64('2020-07-01 03:30:00')
    t2 =  dateStartMatch  + datetime.timedelta(minutes=30)
    dateEndMatch = t2  #np.datetime64('2020-07-01 04:00:00')
    print (dateStartMatch, dateEndMatch)
    
    dfseg = dfprod[(dfprod['COMPLETION TIME'] > dateStartMatch) 
               & (dfprod['COMPLETION TIME'] < dateEndMatch)]
    g = dfseg.groupby(by="LINE")
    x = g.sum()
    row['TACTIMESUM'] = x['TAC TIME MIN'].sum()
    
    print(row['TACTIMESUM'])
    
    dateStartMatch = dateEndMatch
    

# display(df)