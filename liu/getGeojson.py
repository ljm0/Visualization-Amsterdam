import pandas as pd
import numpy as np
# import geopandas as gp

initDf = pd.read_csv(r"D:\000_VU_Study\P4\IV\project\d3_js_learn\liu\ams_safety_index_districts.csv")

safeDf = initDf[['area', 'polygon_of_area',
                 'safety_index_2014', 'safety_index_2015', 'safety_index_2016', 'safety_index_2017']]
safeDf.rename(columns={'polygon_of_area': 'geometry'})
# safe_geo = gp.GeoDataFrame(safeDf)

# print(safeDf.head())
safeDf.to_csv('temp.csv')
