# -*- coding: utf-8 -*-
"""
Created on Fri Dec 14 03:58:46 2018
@author: khalid
"""
import warnings
warnings.filterwarnings("ignore")
import urllib.parse
from modules import *
import tweepy
from components import Component
from auth import *
from historical_data import update_tweets



def urlencode(str):
    return urllib.parse.quote(str)

def urldecode(str):
    return urllib.parse.unquote(str)


if __name__=='__main__':

    autho = tweepy.OAuthHandler(user[0], user[1])
    autho.set_access_token(user[2], user[3])
    api = tweepy.API(autho)
    co_api = Component(api)

    query =  sys.argv[1]    
    query = urldecode(query)
    query = query.encode('utf-8').decode()

    if len(sys.argv) ==2:
        "guest"
        tweets = co_api.search(query)
    elif len(sys.argv) ==3:
        "client"
        since_id = sys.argv[2]
        tweets = update_tweets(query,co_api,since_id)

    an= co_api.analysis(tweets) 
    
    print(json.dumps(an))

