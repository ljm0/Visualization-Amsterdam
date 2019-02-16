import pandas as pd
import numpy as np

meteodf = pd.read_csv('meteo.csv')
# print(meteodf)

# meteoGroup = meteodf['temperature'].groupby(meteodf['year'],meteodf['month'])


meteoGroup = meteodf.groupby(['year', 'month'])[['temperature']].mean()
meteoGroup[['temperature']] = meteoGroup[['temperature']].astype(int)
meteoGroup.to_csv('newmeteo.csv')
# print(meteoGroup)
# print(meteoGroup['temperature'].agg(np.mean))
