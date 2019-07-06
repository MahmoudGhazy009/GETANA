# -*- coding: utf-8 -*-
"""
Created on Thu Dec 13 14:42:03 2018
@author: khalid
"""

import pandas as pd
import numpy as np
import tweepy

consumer_key = "uQjxZTBtwpKJlJUjBTkKzZoOB"
consumer_secret = "DrHlZhHbylLUg25q7Inta7VL0TFTWEdufTpi8JIfo9nv3zUlec"
access_token =  "823320430702379009-aZzdJfrM03l7yslxR0h8xXJQKOUyaZC"
access_token_secret = "BYLJ36d7n0xr7VMPvfd9BOAeVQRoylueXbNf4vZ4Z16vT"
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)



class Usertrack:
    
    def __init__(self,user_id):
        self.user_id = user_id
#        self.tweets_count = tweets_count
        self.max_id = None
        self.api = api
        self.flag = self.basicinfo()
    
    def basicinfo(self):
        """
        basicinfo: essential information about user like "tweets_count,likes,# of followers,# of following,user's location and user's profile"
        Parameter: None
        Return: None
        """
        try:
            user = self.api.get_user(self.user_id)
        except:
            return 0 #'userName is invalide'
        self.num_followers = user.followers_count
        self.num_following = user.friends_count
        self.num_tweets = user.statuses_count
        self.likes = user.favourites_count
        self.location = user.location
        self.profileurl= 'https://twitter.com/{}'.format(user.screen_name)
        return 1
        
    def user_timeline(self):
        """ 
        user_timeline: collect tweets for specific user
        Parameter: None
        Return:
            json object for tweets
        """
        
        self.tweets=[]
        itter_num = int(self.num_tweets/100)
        if itter_num<1:
            itter_num=1
#        1000 tweet/user
        elif itter_num>10:
            itter_num=10
        while itter_num:
            try:
                self.tweets.extend(self.api.user_timeline(screen_name = self.user_id, count= 100, include_rts = True, exclude_replies=False, tweet_mode = 'extended',max_id=self.max_id))
                self.max_id = self.tweets[-1].id
                itter_num -= 1
            except :
                print('maximum num of tweets reach')
                break
        return self.tweets
    
    def user_likes(self):
        """ 
        user_timeline: collect like`s tweets for specific user
        Parameter: None
        Return:
            json object for tweets
        """
        likes_tweets = self.api.favorites(screen_name = self.user_id)
        return likes_tweets
    
    def preanalysis(self):
        """
        preanalysis: create dataframe for tweets
        Parameter: None
        Return: Nothing
        """
        self.tweet_df = pd.DataFrame()
        self.engagement=0
        retweet_count=0
        self.hashtag={}
        try:
            self.tweets
        except:
            self.user_timeline()
        
        for i,tweet in enumerate(self.tweets):
            retweet_count=0
            self.tweet_df.loc[i,'tweet'] = tweet.full_text
            self.tweet_df.loc[i,'application'] = tweet.source
            self.tweet_df.loc[i,'created_at'] = tweet.created_at
            self.tweet_df.loc[i,'likes'] = tweet.favorite_count
            entity = tweet.entities            
            url = entity['urls']
            if entity.get('media'):
                media = entity.get('media')[0]
                contentv = media['type'] 
            elif len(url):
                contentv = 'url'
            else:
                contentv = 'text'
            self.tweet_df.loc[i,'content'] = contentv

#                retweets                
            try:
                x = tweet.retweeted_status
                retflag = True
            except:
                retflag = False

            if (retflag==True) and (tweet.is_quote_status == False) :
                typev ='retweet'
                
#                retweeted user
                user_mentions = tweet.retweeted_status.user.screen_name
# =============================================================================
#                 try:
#                     re = tweet.entities['user_mentions'][0]['screen_name']
#                 except:
#                     re = tweet.retweeted_status.user.screen_name
# =============================================================================

#                quote
    
            elif (tweet.is_quote_status==True) and (retflag==False):
                typev ='quote'
                """ problem """
                retweet_count+=tweet.retweet_count


#                quoted user
                try:
                    user_mentions = tweet.quoted_status.user.screen_name
                except:
#                   deleted account
                    user_mentions = np.nan
                    
                
#                reply                

            elif tweet.in_reply_to_user_id:
                typev ='reply'
                """ problem """
                retweet_count+=tweet.retweet_count                

#                reply user

                user_mentions = tweet.in_reply_to_screen_name
                
#                    orignal tweet

            else:
                typev ='tweet'
                user_mentions = np.nan
                
                retweet_count+=tweet.retweet_count
                
            self.tweet_df.loc[i,'retweet_count'] = retweet_count     
            self.tweet_df.loc[i,'type'] = typev 
            self.tweet_df.loc[i,'most_user'] = user_mentions
            
            
            hasht = entity['hashtags']
            for i in range(len(hasht)):
                h = hasht[i]['text']
                if h in self.hashtag:
                    self.hashtag[h] += 1
                else:
                    self.hashtag[h] = 1
            
        
    

    def extrainfo(self):
        """
        extrainfo: extra information about user such as "engagement, gender, most freq applications, most mention users, day of week, type of tweets and the content"
        Parameter: None
        Return: ??
        """
        try:
            self.tweet_df
        except:
            self.preanalysis()
        retweet_count = self.tweet_df['retweet_count'].sum()
        #num_tweets = sum(self.tweet_df.type!='reply')
        num_tweets = len(self.tweet_df)
        likes = self.tweet_df['likes'].sum()
        
#        need add num of replies
        self.engagement = (likes + retweet_count)*100/(self.num_followers + num_tweets)
        self.most_freq_app = self.tweet_df['application'].value_counts()
        self.most_quoted_user = self.tweet_df[self.tweet_df['type']=='quote']['most_user'].value_counts()[:10]
        self.most_reply_user = self.tweet_df[self.tweet_df['type']=='reply']['most_user'].value_counts()[:10]
        self.most_retweet_user = self.tweet_df[self.tweet_df['type']=='retweet']['most_user'].value_counts()[:10]
        self.content = self.tweet_df['content'].value_counts()
        self.tweet_type = self.tweet_df['type'].value_counts()
        self.day_of_week = self.tweet_df['created_at'].dt.day_name()
    
    def following(self):
        """
        following: return country of following user
        Parameter: None
        return: dict
        """
        results = tweepy.Cursor( self.api.friends,id=self.user_id,skip_status=True)
        self.following_location={}
        for result in results.items():
            l = result.location.strip(' ').split(',')
            if l[0]=='':
                continue
            l = result.location.split(',')
            if l[0] in self.following_location :
                self.following_location[l[0]] += 1
            else:
                self.following_location[l[0]] = 1
        return self.following_location
    
    
    
    
    def followers(self):
        """
        followers: return country of followers user
        Parameter: None
        return: dict
        """
        results = tweepy.Cursor( self.api.followers,id=self.user_id,skip_status=True)
        self.followers_location={}
        for result in results.items():
            l = result.location.strip(' ').split(',')
            if l[0]=='':
                continue
            l = result.location.split(',')
            if l[0] in self.followers_location :
                self.followers_location[l[0]] += 1
            else:
                self.followers_location[l[0]] = 1
        return self.followers_location







