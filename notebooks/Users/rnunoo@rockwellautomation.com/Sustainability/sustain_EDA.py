# Databricks notebook source
# MAGIC %sh git init

# COMMAND ----------

# File location and type
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

#display(df1)


# COMMAND ----------

#Air compressor EDA
import datetime
import pandas as pd
from math import *
import matplotlib.pyplot as plt
import numpy as np
compressor_data = df1.toPandas()
#display(df1)

# COMMAND ----------

# File location and type
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
#display(df2)

# COMMAND ----------

#plot Oven
display(df2)

# COMMAND ----------

# File location and type
file_location = "/FileStore/tables/julyUsage.csv"
file_type = "csv"

# CSV options
infer_schema = "true"
first_row_is_header = "true"
delimiter = ","

# The applied options are for CSV files. For other file types, these will be ignored.
df3 = spark.read.format(file_type) \
  .option("inferSchema", infer_schema) \
  .option("header", first_row_is_header) \
  .option("sep", delimiter) \
  .load(file_location)
Usage_cost = df3.toPandas()
display(df3)

# COMMAND ----------

display(df3)

# COMMAND ----------

# File location and type
file_location = "/FileStore/tables/July2020_Oven_TrendData-2.csv"
file_type = "csv"

# CSV options
infer_schema = "true"
first_row_is_header = "true"
delimiter = ","

# The applied options are for CSV files. For other file types, these will be ignored.
df4 = spark.read.format(file_type) \
  .option("inferSchema", infer_schema) \
  .option("header", first_row_is_header) \
  .option("sep", delimiter) \
  .load(file_location)
Oven_trend = df4.toPandas()
display(df4)

# COMMAND ----------

# File location and type
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
display(df5)

# COMMAND ----------

#the five pandas dataframe 
#compressor_data
#meter_data
# Oven_trend
#Usage_cost*
#production_data

# COMMAND ----------

compressor_data.head()

# COMMAND ----------

meter_data.head(10)

# COMMAND ----------

Oven_trend.head(10)

# COMMAND ----------

production_data.head()