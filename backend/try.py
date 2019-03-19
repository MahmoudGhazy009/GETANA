# -*- coding: utf-8 -*-
"""
Created on Fri Dec 14 11:10:29 2018

@author: khalid
"""


from wordtrack_modify import Wordtrack
import tweepy
import pandas as pd
import numpy as np
import json
#import sentimental_pickle as sent


## Twitter credentials
consumer_key = "uQjxZTBtwpKJlJUjBTkKzZoOB"
consumer_secret = "DrHlZhHbylLUg25q7Inta7VL0TFTWEdufTpi8JIfo9nv3zUlec"
access_token =  "823320430702379009-aZzdJfrM03l7yslxR0h8xXJQKOUyaZC"
access_token_secret = "BYLJ36d7n0xr7VMPvfd9BOAeVQRoylueXbNf4vZ4Z16vT"
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)





# trends feature



#if __name__ == "__main__":
#    main()    
#
import sys, json


lines = sys.stdin.readlines()[0].replace('"',"").replace("\n","")
word = Wordtrack(lines,api)
json_object = word.analysis()
#df = word.track_df
#
#out = sent.predict(df['tweet'])
#
#json_object['sent'] = out.tolist()
#json_object['time_graph'] = {"day_name" : df['created_at'].dt.day_name().tolist(),
#           "day_hour" : df['created_at'].dt.hour.tolist()
#           }
#           
#
#with open("data_file.json", "w") as write_file:
#    json.dump(json_object, write_file)
#
print(json.dumps(json_object))


# =============================================================================
# 
# from_khalid_to_ghazy = {"name":word.df.loc[:,'name'].tolist(),
#                         "user_url" : word.df.loc[:,'user_url'].tolist(),
#                         "user_pic" : word.df.loc[:,'user_profile_img'].tolist(),
#                         "tweet" : word.df.loc[:,'tweet'].tolist(),
#                         "tweet_url" : word.df.loc[:,'tweet_url'].tolist()
#                         }
# 
# =============================================================================
