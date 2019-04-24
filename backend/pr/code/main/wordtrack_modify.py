# -*- coding: utf-8 -*-
"""
Created on Fri Dec 14 03:58:46 2018
@author: khalid
"""


import pandas as pd
import numpy as np
from collections import Counter
import tweepy
import json
import re
import string
import sentimental_pickle  as model
from datetime import datetime 

#from sklearn.metrics.pairwise import cosine_similarity
#from sklearn.feature_extraction.text import TfidfVectorizer


consumer_key = "uQjxZTBtwpKJlJUjBTkKzZoOB"
consumer_secret = "DrHlZhHbylLUg25q7Inta7VL0TFTWEdufTpi8JIfo9nv3zUlec"
access_token =  "823320430702379009-aZzdJfrM03l7yslxR0h8xXJQKOUyaZC"
access_token_secret = "BYLJ36d7n0xr7VMPvfd9BOAeVQRoylueXbNf4vZ4Z16vT"
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)

table = str.maketrans({key: None for key in string.punctuation})


country_map = pd.read_csv(r'K:\final pro\GETANA\backend\pr\datasets\worldmap\worldmap.csv')
country_map['country'] = country_map['country'].str.lower()
country_map['code3'] = country_map['code3'].str.lower()
country_map['code2'] = country_map['code2'].str.lower()

#country_map = country_map.set_index('country')
#country_map_dict = country_map.to_dict()

class Wordtrack:
    
    def __init__(self,query,tweets_count=100):
        self.query = query.split()
#        self.tweets_count = tweets_count
        self.max_id = None
        self.api = api
        self.tweets = self.search(tweets_count/100)
#        self.gender()
        
    def search(self,iterr_num):
        """
        gather tweets
        pram : num of itteration
        return list of json objects
        """
        tweets=[]
        while iterr_num:
            try:
                tweets.extend(api.search(q=self.query,count = 50, result_type="recent",include_rts = False, tweet_mode = 'extended',max_id=self.max_id))
                self.max_id = (int(tweets[-1].id_str[:4])) * (10**15) #day by day
                iterr_num-=1
            except :
                break
        return tweets
    
    
    def locate(self,location):
        """ Take location (code2,code3,country name)
            return countryName and coords """
        coord = None
        country_name = None
        for ind,row in country_map.iterrows():
            if ((row['country'] in location) or
                (row['code2'] in location) or
                (row['code3'] in location)):
            
                coord = row['coordinates']
                coord = list(map(lambda x: float(x) ,coord.strip('[]').split(',')))
                country_name = row['country']
        return country_name, coord
                  
    def analysis(self):
        """
        analysis: create dataframe for tweets
        Parameter: None
        Return: json object
        """
        hash_num = Counter()
        app = Counter()
        content = Counter()
        tweet_typ = Counter()
        place =  {}
        timeline_analysis={}
        timeline_analysis['timeline'] = []
        hours = Counter()
        day_of_week = Counter()
        day_of_month = Counter()
        
        def tweet_type(tweet):
            try:
                if tweet.retweeted_status:
                    retflag = True
            except:
                retflag = False
    
            if (retflag) and ( not (tweet.is_quote_status)) :
                ty ='retweet'
            elif (tweet.is_quote_status) and  ( not (retflag)):
                ty ='quote'
            elif tweet.in_reply_to_user_id:
                ty ='reply'
            else:
                ty ='tweet'
            return ty
        
        for i,tweet in enumerate(self.tweets):

            retweet_count = tweet.retweet_count
            
            type_ = tweet_type(tweet)
            
            entity = tweet.entities            
            photo = ['#']
            url = entity['urls']
            if entity.get('media'):
                contentv = entity.get('media')[0]['type']
                if contentv == 'photo':
                    for media in entity.get('media'):
                        photo.append(media['media_url'])
                
            elif len(url):
                contentv = 'url'
            else:
                contentv = 'text'

            if tweet.place is None:
                if tweet.user.location is None:
                    location = None
                else:                    
                    location = re.sub(r'\d+',r'',tweet.user.location)\
                                .split(',')[-1].strip().lower() 
            else:
                location = tweet.place.country.strip()
            
            country_name, coord = self.locate(location)
            
            if country_name:
                if country_name in place:    
                    place[country_name]['population'] += 1
                else:
                    place[country_name] = {'name':country_name
                                          ,'coordinates':coord
                                          ,'population':1}
               
            
            sentiment = model.predict(tweet.full_text,'en')
            
            timeline_analysis['timeline'].append({"name":tweet.user.name
                        ,"user_url" : 'https://twitter.com/{}'.format(tweet.user.screen_name) 
                        ,"user_pic" : tweet.user.profile_image_url
                        ,"user_followers" : tweet.user.followers_count
                        ,"user_type" : tweet.metadata['result_type'] #POPULAR OR RECENT
                        ,"tweet" : tweet.full_text
                        ,"tweet_url" : "https://twitter.com/statuses/{}".format(tweet.id_str)
                        ,"likes" : tweet.favorite_count
                        ,"retweet_count" : retweet_count
                        ,"application" : tweet.source
                        ,"created_at" : str(tweet.created_at)
                        ,"content" : contentv
                        ,"photo" : photo
                        ,"location" : country_name
                        ,"sentiment" : int(sentiment)
                        ,"query":self.query[0]
                        })
            
            app[tweet.source] += 1
            content[contentv] += 1
            tweet_typ[type_] += 1
            hours[tweet.created_at.strftime("%I%p")] += 1
            day_of_week[tweet.created_at.strftime("%a")] += 1
            day_of_month[tweet.created_at.strftime("%d")] += 1
    
            hasht = tweet.entities['hashtags']
            for i in range(len(hasht)):
                hash_num[hasht[i]['text']] += 1

        hours = {'labels':list( hours.keys()),'values':list( hours.values())}
        day_of_week = {'labels':list( day_of_week.keys()),'values':list( day_of_week.values())}
        day_of_month = {'labels':list( day_of_month.keys()),'values':list( day_of_month.values())}


        timeline_analysis['analysis'] = {"freq_tweet_app" : dict(app)#.most_common(5),
                            ,"freq_tweet_content" : dict(content)
                            ,"freq_tweet_type" : dict(tweet_typ)
                            ,"freq_tweet_hashtag" : dict(hash_num)
                            ,"distribution" : list(place.values())
                            ,"hours" : hours
                            ,"day_of_week" : day_of_week
                            ,"day_of_month" : day_of_month
                            }
#            self.track_df.loc[i,'gender'] = self.gender_predict(tweet.user.name.lower())
        
        return timeline_analysis
    



# =============================================================================
#     
#     def gender(self):
#         self.gender_df = pd.read_csv(r"/project/datasets/name_gender.csv")
#         self.gender_df['name'] = self.gender_df['name'].str.lower()
#         self.gender_df.dropna(inplace=True)
#         self.tfidf_vectorizer = TfidfVectorizer()
#         self.tfidf_matrix = self.tfidf_vectorizer.fit_transform(self.gender_df['name'])
# 
#     def gender_predict(self,name):
#         
#         g = self.gender_df.loc[self.gender_df['name']==name,'gender']
#         
#         if len(g):
#             g.reset_index(drop=True,inplace=True)
#             return g[0]
#         else:
#             name = self.tfidf_vectorizer.transform([name])
#             self.out = cosine_similarity(name, self.tfidf_matrix)[0]
#             g = self.gender_df.loc[self.out.argmax(),'gender']
#             return g
# 
# 
# =============================================================================