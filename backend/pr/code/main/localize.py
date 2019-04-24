#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Apr 21 11:39:21 2019

@author: khalid
"""

import pandas as pd

country_map = pd.read_csv(
    r'K:\final pro\GETANA\backend\pr\datasets\worldmap\worldmap.csv')
country_map['country'] = country_map['country'].str.lower()
country_map['code3'] = country_map['code3'].str.lower()
country_map['code2'] = country_map['code2'].str.lower()


def locate(location):
    """ Take location (code2,code3,country name)
        return countryName and coords """
    coord = None
    country_name = None
    for ind, row in country_map.iterrows():
        if ((row['country'] in location)or(row['code2'] in location) or (row['code3'] in location)):
            # print(row['country'])
            coord = row['coordinates']
            coord = list(map(lambda x: float(x), coord.strip('[]').split(',')))
            country_name = row['country']
            break
    return country_name, coord
