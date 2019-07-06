# -*- coding: utf-8 -*-
"""
Created on Sat Jul  6 22:04:03 2019

@author: khalid
"""

import pickle
import modules
import localize as loc
from collections import Counter

place_dic={}
place = Counter() 

search = 'apple'

folder = '{}/project/datasets/Twitter-Get-Old-Tweets-Scraper-master/pkl/analysis/'.format(modules.path)
analysis_pkl_path = r'' +folder+'{}_analysis.pkl'.format(search)


with open(analysis_pkl_path,'rb') as f:
    an = pickle.load(f)
    

for i,tweet in enumerate(an['timeline']):
    
    country_name, coord = loc.locate(tweet['location_without'])
    an['timeline'][i]['location'] = country_name 
    if country_name in place_dic:    
        place_dic[country_name]['population'] += 1
    else:
        place_dic[country_name] = {'name':country_name
                              ,'coordinates':coord
                              ,'population':1
                              }
    place[country_name]+=1

an['analysis']['distribution'] = list(place.values())


with open(analysis_pkl_path,'wb') as f:
    pickle.dump(an,f)











