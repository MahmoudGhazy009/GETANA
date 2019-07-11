# -*- coding: utf-8 -*-
"""
Created on Sun Jul  7 00:51:55 2019

@author: khalid
"""
from modules import *
import scrap
import statuslookup as sl
from components import Component
from auth import *


if __name__ == '__main__':
    '''handle maxtweet''' 
    
    autho = tweepy.OAuthHandler(user[0], user[1])
    autho.set_access_token(user[2], user[3])
    api = tweepy.API(autho)
    user_com = Component(api)
    
    num_tweets=1000

    search= sys.argv[1]
    if sys.argv[2] ==1:
        userName= 1
    elif sys.argv[2] ==2:
        query = 1
    else:
        print('error')

    #language= 'ar'
    start= '2019-{}-{}'
    
    intervals = [(start.format(f'{i%12:02}','01'),start.format(f'{(i+1)%12:02}','01'))for i in range(1,8)]
    num_iters = math.ceil(num_tweets/(len(intervals)*100))
    
    for i in intervals:
        print('-'*7)
        print(i)
        print('-'*7)
        for t in range(num_iters):
            
            tweets_id=[]
            tweets=[]
            analysis=[]
            
            
            since= i[0]
            until= i[1]
            r=''
            new=1
            j=0
            maxTweets= 100
                    
            while 1:
                if userName:
                    r,status,result = scrap.main(r, new, username=search, max_tweets= maxTweets,since=since,until=until)
                elif query:
                    r,status,result = scrap.main(r, new, query=search, max_tweets= maxTweets,since=since,until=until)
                else:
                    print('choose what u want to scrapp: user or word')
                    break
                j+=1
                maxTweets = maxTweets-len(result)
                if status == 200:
                    tweets_id.extend(result)
                    break
                else:
                    print('wait and try again')
                    new= 0
                    time.sleep((j*10)%300)
            ''' we can call thread here to download tweet '''
            tweets = sl.tweet_download(tweets_id,user_com)
            analysis = sl.analyze(tweets,user_com)
            ''' send analysis to DB or NJ'''
   
    