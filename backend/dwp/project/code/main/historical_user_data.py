# -*- coding: utf-8 -*-
"""
Created on Sun Jul  7 00:51:55 2019

@author: khalid
"""
import scrap_user
import statuslookup as sl
from modules import *

def get_user_timeline(user_id,user_api,since_id):

    since_date = date(2019,1,1)
    until_date = date.today()
    months = math.ceil((until_date - since_date).days/30)
    intervals=[]
    for i in range(months):
        temp_date = since_date + timedelta(days=30)   
        temp = temp_date.strftime('%Y-%m-%d')
        intervals.append((since_date.strftime('%Y-%m-%d') , temp))
        since_date = temp_date

    tweets_id=[]
    for tupl in intervals:
        maxTweets= 10000
        since= tupl[0]
        until= tupl[1]
        r=''
        i=0
        status=200
        
        while 1:
            r,status,result,last_id = scrap_user.main(r, username=user_id, max_tweets= maxTweets, since=since, until=until)
            print(last_id,'from historical')
            i+=1
            maxTweets = maxTweets-len(result)
            if status == 200:
                tweets_id.extend(result)
                break
            else:
                print('wait and try again')
                time.sleep((i*10)%300)
        since_id = last_id
                
    ''' we can call thread here to download tweet '''
    tweets = sl.tweet_download(tweets_id,user_api)
    return tweets,last_id
    