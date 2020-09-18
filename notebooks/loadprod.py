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

print(df1)

df['Date'] = pandas.to_datetime(df1['Time_Stamp'])


for idx, row in dfprod.iterrows():
    print(df1[idx, 0])
    break 

    
