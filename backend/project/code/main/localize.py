#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Apr 21 11:39:21 2019

@author: khalid
"""

import pandas as pd
import re
import modules

path = modules.path

def read(path):
            
    country_map = pd.read_csv(r"{}/project/datasets/worldmap/map.csv".format(path))
    country_map['name'] = country_map['name'].str.lower()
    country_map['code3'] = country_map['code3'].str.lower()
    country_map['code2'] = country_map['code2'].str.lower()
    return country_map


country_map = read(path)

def locate(location):
    """ Take location (code2,code3,country name)
        return countryName and coords """
    coord = None
    country_name = None
    if location:
        location = location.lower()

    for ind,row in country_map.iterrows():
            
        if (
            (re.match(r'(.*\W|\W*){}\b'.format(row['code2']) , location))
            or(re.match(r'(.*\W|\W*){}\b'.format(row['code3']), location))        
            or(re.match(r'(.*\W|\W*){}\b'.format(row['name']) , location))):
            
            coord = [row['lat'],row['lang']]
            country_name = row['name']
            break
    return country_name, coord

                
#{'united kingdom':['london','England']}
#dt = pd.read_html(r"C:\Users\khalid\Desktop\ISO 3166-1 - Wikipedia.html")
#dt[1].to_csv(r"E:\project\datasets\worldmap\scrap.csv",index=False)
#
#print(locate('united states'.lower()))
#
#
#country_map.to_csv("{}/project/datasets/worldmap/map.csv".format(path),index=False)
    
#print(locate('united kingdom'))

#country_map['coord'] = country_map['coord'].apply(lambda x: list(map( float, x.strip(r'[|]').split(','))))
#country_map['lat'] =country_map['coord'].apply(lambda x: x[0])
#country_map['lang'] =country_map['coord'].apply(lambda x: x[1])
#d = country_map.drop('coord',axis=1) 
#d.to_csv("{}/project/datasets/worldmap/map.csv".format(path),index=False)

