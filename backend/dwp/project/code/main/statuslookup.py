# -*- coding: utf-8 -*-
"""
Created on Wed Jul  3 22:05:28 2019

@author: khalid
"""

import modules
from modules import *
import math

path = modules.path

def tweet_download(tweets_id, user_com):
    
    num_requests = math.ceil(len(tweets_id)/100)    
    all_tweets=[]
    for i in range(num_requests):  
        try:
            tweets = user_com.statuses_lookup(tweets_id[i*100:100*(i+1)])
            print('{}tweets downloaded'.format((i+1)*100))
        except:
            print('wait for new request')
            time.sleep(900)
            print('released')
            tweets = user_com.statuses_lookup(tweets_id[i*100:100*(i+1)])
        all_tweets.extend(tweets)    
        
    try:
        #call analysis analyze(all_tweets,user_com)
        pass
    except:
        print('error while analyze')
    
    return all_tweets



def analyze(tweets, user_com):
    ''' problem when analyze we talk only 100 tweet'''
    print('analysis start')
    an = user_com.analysis(tweets)
    print('analysis finish')
    
    return an
    
