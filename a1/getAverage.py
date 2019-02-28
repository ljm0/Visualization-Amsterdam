import pandas as pd
import numpy as np

meteodf = pd.read_csv('meteo.csv')
# print(meteodf)

# meteoGroup = meteodf['temperature'].groupby(meteodf['year'],meteodf['month'])


meteoGroup = meteodf.groupby(['year', 'month'])[['temperature']].mean()
meteoGroup[['temperature']] = meteoGroup[['temperature']].astype(int)
new = pd.pivot_table(meteoGroup, index=['month'], columns=['year'])
# print(new)
new.to_csv('newmeteo.csv')
# print(meteoGroup)
# print(meteoGroup['temperature'].agg(np.mean))
