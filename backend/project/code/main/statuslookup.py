# -*- coding: utf-8 -*-
"""
Created on Wed Jul  3 22:05:28 2019

@author: khalid
"""

import modules
import pandas as pd

import math
import pickle
import glob

from components import Component

path = modules.path

def tweet_download(csvpath, pklpath, user_com):
    
    paths = glob.glob(csvpath)
    dfs = [pd.read_csv(path) for path in paths]
    all_tweets=[]
    
    for j,df in enumerate(dfs):
        df = df.tweet_id.tolist()         
        num_requests = math.ceil(len(df)/100)    
        tweets=[]
        for i in range(num_requests):  
            tweet=None
            try:
                tweet = user_com.statuses_lookup(df[i*100:100*(i+1)])
                print('{}tweets downloaded'.format((i+1)*100))
            except:
                print('wait for new request')
                time.sleep(900)
                print('released')
                tweet = user_com.statuses_lookup(df[i*100:100*(i+1)])
            tweets.append(tweet)

        all_tweets.append(tweets)    
        print(' downloaded{}'.format(j))
    try:
        with open(pklpath,'wb') as f:
            pickle.dump(all_tweets,f)
    except:
        print('error while pickling')
    return all_tweets



def analyze(pklpath, anapath, user_com):
    
    tweets=[]
    with open(pklpath,'rb') as f:
        all_tweets = pickle.load(f)
    
    for tweet in all_tweets:
        for t in tweet:        
            tweets.extend(t)
    
    print('file readed successfuly')
    an = user_com.analysis(tweets)
    
    with open(anapath ,'wb') as f:
        pickle.dump(an,f)
    
    return an
    
        
def main(search, download=1):
    autho = tweepy.OAuthHandler(user[0], user[1])
    autho.set_access_token(user[2], user[3])
    api = tweepy.API(autho)
    user_com = Component(api)
    
    ''' while write t & a put \ before it '''
    
    folder = '{}/project/datasets/Twitter-Get-Old-Tweets-Scraper-master/csv/{}/'.format(path,search)
    tweetcsvpath = r'' +folder+'*{}*.csv'.format(search)
    
    folder = '{}/project/datasets/Twitter-Get-Old-Tweets-Scraper-master/pkl/'.format(path)
    tweetpklpath = r'' +folder+'{}tweets.pkl'.format(search)
    
    if download:
        tweets = tweet_download(tweetcsvpath, tweetpklpath, user_com)
    
    folder = '{}/project/datasets/Twitter-Get-Old-Tweets-Scraper-master/pkl/analysis/'.format(path)
    analysis_pkl_path = r'' +folder+'{}_analysis.pkl'.format(search)
    
    an = analyze(tweetpklpath , analysis_pkl_path, user_com)
    
    return an


if __name__=='__main__':

    tweets = main('apple',0)    
    




#with open(r"E:\project\datasets\Twitter-Get-Old-Tweets-Scraper-master\pkl\analysis\apple_analysis.pkl",'rb') as f:
#    an = pickle.load(f)



