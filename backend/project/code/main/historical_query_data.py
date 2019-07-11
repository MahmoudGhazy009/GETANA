# -*- coding: utf-8 -*-
"""
Created on Sun Jul  7 00:51:55 2019

@author: khalid
"""
from modules import *
import scrap_query
import statuslookup as sl
from components import Component
from auth import *

from modules import *

def get_query_tweets(query,api,since_id):

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
    for i in range(months):
        temp_date = since_date + timedelta(days=30)   
        temp = temp_date.strftime('%Y-%m-%d')
        intervals.append((since_date.strftime('%Y-%m-%d') , temp))
        since_date = temp_date

    # since_id = until_date.strftime('%Y-%m-%d')
    
    tweets_id=[]
    for tupl in intervals:
        maxTweets= 10000
        since= tupl[0]
        until= tupl[1]
        r=''
        i=0
        status=200
        
        while 1:
            r,status,result = scrap_user.main(r, query=query, max_tweets= maxTweets, since=since, until=until)

            i+=1
            maxTweets = maxTweets-len(result)
            if status == 200:
                tweets_id.extend(result)
                break
            else:
                print('wait and try again')
                time.sleep((i*10)%300)
                

    tweets = sl.tweet_download(tweets_id,api)
    return tweets

   
    