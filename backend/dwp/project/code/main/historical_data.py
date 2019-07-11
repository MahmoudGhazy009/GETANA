# -*- coding: utf-8 -*-
"""
Created on Sun Jul  7 00:51:55 2019

@author: khalid
"""
from modules import *
import scrapp
import statuslookup as sl
from components import Component
from auth import *

from modules import *

def update_tweets(search,api,since_id):

    user = search.startswith('@')

    year,month,day=since_id.split('-')
    if month[0]==0:
        month = int(month[1])
    else:
        month = int(month)

    if day[0]==0:
        day = int(day[1])
    else:
        day = int(day)

    year = int(year)

    since_date = date(year,month,day)
    until_date = date.today()
    months = math.ceil((until_date - since_date).days/30)
    intervals=[]
    if months ==0:
        "normal api"
        temp_date = since_date 
        # since_date = since_date - timedelta(days=15) 
        temp = temp_date.strftime('%Y-%m-%d')
        intervals.append((since_date.strftime('%Y-%m-%d') , temp))
                
    else:
        for i in range(months):
            temp_date = since_date + timedelta(days=30)   
            temp = temp_date.strftime('%Y-%m-%d')
            intervals.append((since_date.strftime('%Y-%m-%d') , temp))
            since_date = temp_date

    # since_id = until_date.strftime('%Y-%m-%d')
    
    tweets_id=[]
    for tupl in intervals:

        print(tupl)
        maxTweets= 10000
        since= tupl[0]
        until= tupl[1]
        r=''
        i=0
        status=200
        
        while 1:
            
            if user:
                r,status,result = scrapp.main(r, username=search, max_tweets= maxTweets, since=since, until=until)
            else:
                r,status,result = scrapp.main(r, query=search, max_tweets= maxTweets, since=since, until=until)

            i+=1
            maxTweets = maxTweets-len(result)
    
            if status == 200:        
                tweets_id.extend(result)
                break
            else:
                print('wait and try again')
                time.sleep((i*10)%300)
                            
    print(len(tweets_id),tweets_id)
    tweets = sl.tweet_download(tweets_id,api)

    return tweets


