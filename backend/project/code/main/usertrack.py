# -*- coding: utf-8 -*-
"""
Created on Thu Dec 13 14:42:03 2018
@author: khalid
"""

import pandas as pd
import numpy as np
import tweepy
from collections import Counter
import sentimental_pickle  as model
import re
import json
import sys
import localize as loc

consumer_key = "uQjxZTBtwpKJlJUjBTkKzZoOB"#"a1BJf5YSTl0CevVwiLbG9yktJ"
consumer_secret = "DrHlZhHbylLUg25q7Inta7VL0TFTWEdufTpi8JIfo9nv3zUlec"
access_token =  "823320430702379009-aZzdJfrM03l7yslxR0h8xXJQKOUyaZC"
access_token_secret = "BYLJ36d7n0xr7VMPvfd9BOAeVQRoylueXbNf4vZ4Z16vT"

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)

class Usertrack:
    
    def __init__(self,user_id):
        self.user_id = user_id
        self.max_id = None
        self.user_analysis={}
        self.api = api
        self.exist = self.basicinfo()
        self.test =[]
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
        self.name = user.name
        self.pic= user.profile_image_url_https
        self.bio = user.description
        self.profile_banner = user.profile_banner_url
        self.lists = user.listed_count
        
        self.user_analysis['cards'] = {"name":self.name
                 ,"screen_name":self.user_id
                 ,"profile_url":self.profileurl
                 ,"profile_pic":self.pic
                 ,"profile_banner":self.profile_banner 
                 ,"bio":self.bio
                 ,"lists":self.lists
                 ,"followers":self.num_followers
                 ,"following":self.num_following
                 ,"num_tweets":self.num_tweets
                 ,"location":self.location
                 ,"likes":self.likes}
        return 1
        
    def validate (self):
        if self.exist:
            return 1
        else:
            return 0
    
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
                self.tweets.extend(self.api.user_timeline(screen_name = self.user_id, count= 10, include_rts = True, exclude_replies=False, tweet_mode = 'extended',max_id=self.max_id))
                self.max_id = self.tweets[-1].id
                itter_num -= 1
            except :
                print('maximum num of tweets reach')
                break
        

    def tweet_analysis(self,tweet):
        
        def tweet_type(tweet):
            user_mention = None
            try:
                if tweet.retweeted_status:
                    retflag = True
            except:
                retflag = False
    
            if (retflag) and ( not (tweet.is_quote_status)) :
                ty ='retweet'                
                user_mention = tweet.retweeted_status.user.screen_name                           
            elif (tweet.is_quote_status) and  ( not (retflag)):
                ty ='quote'
                try:
                    user_mention = tweet.quoted_status.user.screen_name
                except:
    #                   deleted account
                    user_mention = None                
            elif tweet.in_reply_to_user_id:
                ty ='reply'
                user_mention = tweet.in_reply_to_screen_name
            else:
                ty ='tweet'
            return ty,user_mention
        
        type_,user_mention = tweet_type(tweet)    
        lang = 'en'
        retweet_count = tweet.retweet_count
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
            
        sentiment = model.predict(tweet.full_text,lang)
        try:
            user_type = tweet.metadata['result_type'] #POPULAR OR RECENT
        except:
            user_type = None
            
        analysis = {"name":tweet.user.name
                    ,"user_url" : 'https://twitter.com/{}'.format(tweet.user.screen_name) 
                    ,"user_pic" : tweet.user.profile_image_url
                    ,"user_followers" : tweet.user.followers_count
                    ,"user_type" : user_type
                    ,"tweet" : tweet.full_text
                    ,"tweet_url" : "https://twitter.com/statuses/{}".format(tweet.id_str)
                    ,"likes" : tweet.favorite_count
                    ,"retweet_count" : retweet_count
                    ,"application" : tweet.source
#                    ,"created_at" : tweet.created_at
                    ,"content" : contentv
                    ,"photo" : photo
                    ,"sentiment" : int(sentiment)
                    ,"type" : type_
                    ,"hashtags" : entity['hashtags']
                    ,"user_mention" : user_mention
                    }
        
        return analysis, tweet.created_at

    def fol_locate(self,users):
        """
        fol_locate: mapping country into coords
        params: users objects
        return: Dict with users location
        """
        fol_location={}
        for user in users.items(10):
            location = user.location
            self.test .append(location)
            if location:                    
                location = re.sub(r'\d+',r'',location)\
                            .split(',')[-1].strip().lower() 
            country_name, coord = loc.locate(location)
            if country_name:
                if country_name in fol_location:    
                    fol_location[country_name]['population'] += 1
                else:
                    fol_location[country_name] = {'name':country_name
                                          ,'coordinates':coord
                                          ,'population':1}
        return fol_location
    
    def following(self):
        """
        following: locate country of following user
        Parameter: None
        return: dict
        """
        users = tweepy.Cursor(self.api.friends,id=self.user_id,skip_status=True)
        follewing_location = self.fol_locate(users)
        
        return follewing_location 
        
    def follower(self):
        """
        following: locate country of follower user
        Parameter: None
        return: dict
        """
        users = tweepy.Cursor(self.api.followers,id=self.user_id,skip_status=True)
        follower__location = self.fol_locate(users)
        
        return follower__location

    def user_likes(self):
        """ 
        user_timeline: collect like`s tweets for specific user,
            do analysis on it.
        Parameter: None.
        Return: None.
        """
        self.likes_tweets = self.api.favorites(screen_name = self.user_id,tweet_mode = 'extended')

        self.user_analysis['like_tweets'] = []
        for tweet in self.likes_tweets:
            analysis,_ = self.tweet_analysis(tweet)
            self.user_analysis['like_tweets'].append(analysis)

    def analysis(self):
        """
        analysis: gather all analysis timeline and likes analysis,
            follower and following location and user activites.
        Parameter: None.
        Return: userAnalysis.
        """
        if self.exist:
            self.user_timeline()
        else:
            return
        hash_num = Counter()
        app = Counter()
        content = Counter()
        tweet_typ = Counter()
        quote = Counter()
        reply = Counter()
        retweet = Counter()
        hours = Counter()
        day_of_week = Counter()
        day_of_month = Counter()        
        total_retweet_count=0
        self.user_analysis["timeline"] = []
        
        self.user_likes()
        
        follower_loc = self.follower().values()
        following_loc = self.following().values()
        self.user_analysis['map'] = {'follower':list(follower_loc)
                                ,'following':list(following_loc)}        
        
        for tweet in self.tweets:
            
            analysis,created_at = self.tweet_analysis(tweet)    
            type_ = analysis['type']
            
            if type_ != 'retweet':
                total_retweet_count += analysis['retweet_count']
                        
            app[analysis['application']] += 1
            content[analysis['content']] += 1
            tweet_typ[type_] += 1
            hours[created_at.strftime("%I%p")] += 1
            day_of_week[created_at.strftime("%a")] += 1
            day_of_month[created_at.strftime("%d")] += 1
            
            hasht = analysis["hashtags"]
            for i in range(len(hasht)):
                hash_num[hasht[i]['text']] += 1
                
            user_mention = analysis["user_mention"]  
            
            self.user_analysis['timeline'].append(analysis)

            if user_mention:
                if type_ == 'reply':
                    reply[user_mention] +=1
                elif type_ == 'quote':
                    quote[user_mention] +=1
                elif type_ == 'retweet':
                    retweet[user_mention] +=1
                
        most_replied_user = dict(reply.most_common(3))
        most_quoted_user = dict(quote.most_common(3))
        most_retweeted_user = dict(retweet.most_common(3))
        
        hours = {'labels':list(hours.keys()),'values':list(hours.values())}
        day_of_week = {'labels':list(day_of_week.keys()),'values':list(day_of_week.values())}
        day_of_month = {'labels':list(day_of_month.keys()),'values':list(day_of_month.values())}
        
        self.user_analysis['analysis'] = {"freq_tweet_app" : dict(app)#.most_common(5),
                                ,"freq_tweet_content" : dict(content)
                                ,"freq_tweet_type" : dict(tweet_typ)
                                ,"freq_tweet_hashtag" : dict(hash_num)
                                ,"most_replied_user" : most_replied_user
                                ,"most_quoted_user" : most_quoted_user
                                ,"most_retweeted_user" : most_retweeted_user
                                ,"hours" : hours
                                ,"day_of_week" : day_of_week
                                ,"day_of_month" : day_of_month
                                }
        
        return self.user_analysis
        

lines = sys.stdin.readlines()[0].replace('"', "").replace("\n", "")

user = Usertrack(lines)
if user.validate():
    an = user.analysis()
    print(json.dumps(an))



