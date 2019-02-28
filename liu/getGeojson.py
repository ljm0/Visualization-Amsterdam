import pandas as pd
import numpy as np
import geopandas as gp
import fiona

from shapely import wkt


initDf = pd.read_csv(r"D:\000_VU_Study\P4\IV\project\d3_js_learn\liu\ams_safety_index_districts.csv")

safeDf = initDf[['district_1_in_area',
                 'safety_index_2014', 'safety_index_2015', 'safety_index_2016', 'safety_index_2017', 'polygon_of_district_1_in_area']]
# safeDf.rename(columns={'polygon_of_area': 'geometry'}, inplace=True)

safeDf['polygon_of_district_1_in_area'] = safeDf['polygon_of_district_1_in_area'].apply(
    wkt.loads)
safe_geo = gp.GeoDataFrame(safeDf, crs={'init': 'epsg:4326'})
# df.crs = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs"
# safe_geo = gp.GeoDataFrame(safeDf)
safe_geo = safe_geo.set_geometry('polygon_of_district_1_in_area')

safe_geo.to_file('test.geojson', driver="GeoJSON")

# with open('test.geojson', 'w') as f:
#     f.write(safe_geo.to_json())
