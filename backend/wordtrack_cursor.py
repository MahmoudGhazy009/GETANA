# -*- coding: utf-8 -*-
"""
Created on Fri Dec 14 03:58:46 2018
@author: khalid
"""


import pandas as pd
import numpy as np
from collections import Counter
import tweepy
#from sklearn.metrics.pairwise import cosine_similarity
#from sklearn.feature_extraction.text import TfidfVectorizer

consumer_key = "uQjxZTBtwpKJlJUjBTkKzZoOB"
consumer_secret = "DrHlZhHbylLUg25q7Inta7VL0TFTWEdufTpi8JIfo9nv3zUlec"
access_token =  "823320430702379009-aZzdJfrM03l7yslxR0h8xXJQKOUyaZC"
access_token_secret = "BYLJ36d7n0xr7VMPvfd9BOAeVQRoylueXbNf4vZ4Z16vT"
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)

class Wordtrack:
    
    def __init__(self,query,tweets_count=100,lang="en",result_type="recent"):
        self.query = query.split()
        self.tweets_count = tweets_count
        self.lang = lang
        self.result_type = result_type
        self.api = api
#        self.gender()
        

    def search(self):
        
        """
        gather tweets
        pram : num of itteration
        return list of json objects
        """
        self.tweets=[]
        self.track_df = pd.DataFrame({'created_at':[],'tweet':[]})
        self.track_df['created_at'] = self.track_df['created_at'].astype('datetime64[ns]')
        hash_num = Counter()
        app = Counter()
        place = Counter()
        content = Counter()
        tweet_type = Counter()
        timeline_analysis={}
        timeline_analysis['timeline'] = []        

        for i,tweet in enumerate(tweepy.Cursor(self.api.search, q= self.query, lang=self.lang, result_type=self.result_type, include_rts = False, tweet_mode = 'extended').items(self.tweets_count)):
            self.tweets.append(tweet)
            retweet_count=0
            self.track_df.loc[i,'created_at'] = tweet.created_at
            self.track_df.loc[i,'tweet'] = tweet.full_text
                                    
            entity = tweet.entities            
            photo = []
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
                    temp = tweet.user.location.split(',')
                    if len(temp)>1:
                        location = temp[1].strip()
                    else:
                        location = temp[0].strip()
            else:
                location = tweet.place.country   
            
#                retweets                
            try:
                if tweet.retweeted_status:
                    retflag = True
            except:
                retflag = False

            if (retflag) and ( not (tweet.is_quote_status)) :
                typev ='retweet'
                
#                quote
            elif (tweet.is_quote_status) and  ( not (retflag)):
                typev ='quote'
                retweet_count+=tweet.retweet_count

#                reply                
            elif tweet.in_reply_to_user_id:
                typev ='reply'
                retweet_count+=tweet.retweet_count                

#                    orignal tweet
            else:
                typev ='tweet'
                retweet_count+=tweet.retweet_count                

            
            timeline_analysis['timeline'].append({"name":tweet.user.name,
                        "user_url" : 'https://twitter.com/{}'.format(tweet.user.screen_name) ,
                        "user_pic" : tweet.user.profile_image_url,
                        "user_followers" : tweet.user.followers_count,
                        "user_type" : tweet.metadata['result_type'], #POPULAR OR RECENT
                        "tweet" : tweet.full_text,
                        "tweet_url" : "https://twitter.com/statuses/{}".format(tweet.id_str),
                        "likes" : tweet.favorite_count,
                        "retweet_count" : retweet_count,
                        "application" : tweet.source,
                        "created_at" : str(tweet.created_at),
                        "content" : contentv,
                        "photo" : photo,
                        "location" : location
                        })
            
            app[tweet.source] += 1
            content[contentv] += 1
            tweet_type[typev] += 1
            place[location] += 1
    
            hasht = tweet.entities['hashtags']
            for i in range(len(hasht)):
                hash_num[hasht[i]['text']] += 1

        
        day_of_week = self.track_df['created_at'].dt.day_name().value_counts().to_dict()
        active_hours = self.track_df['created_at'].dt.hour.value_counts().to_dict()
        active_time = self.track_df.set_index('created_at').resample('D').count()['tweet'].to_dict()
        

        timeline_analysis['analysis']= {"freq_tweet_app" : dict(app),#.most_common(5),
                            "freq_tweet_content" : dict(content),
                            "freq_tweet_type" : dict(tweet_type),
                            "freq_tweet_hashtag" : dict(hash_num),
                            "distribution" : dict(place),
                            "time" : active_time,
                            "day_of_week" : day_of_week,
                            "hours" : active_hours
                            }
        
        return timeline_analysis
        


word = Wordtrack(query="salah",tweets_count=300)
t = word.search()
