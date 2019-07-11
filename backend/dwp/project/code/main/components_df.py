# -*- coding: utf-8 -*-
"""
Created on Fri Dec 14 03:58:46 2018
@author: khalid
"""

#from modules import *

from collections import Counter
import sentimental_pickle as model
import localize as loc
from auth import *
import pandas as pd

class Component:
    
    def __init__(self,api):
        self.api = api
#        self.gender()
        
    def statuses_lookup(self,id):
        return self.api.statuses_lookup(id)
        
    def search(self,query,iterr_num=1,count=100,result='mixed'):
        """
        gather tweets
        pram : num of itteration
        return list of json objects
        """
        max_id = None
        query = query.split()
        tweets=[]
        while iterr_num:
            try:
                tweets.extend(self.api.search(lang="en",q=query,count = count, result_type=result,include_rts = False, tweet_mode = 'extended',max_id=max_id))
                max_id = (int(tweets[-1].id_str[:4])) * (10**15) #day by day
                iterr_num-=1
            except :
                break
        return tweets
    
    
    def content(self,tweet):    
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
        return contentv,photo    
    
    def tweet_type(self,tweet):
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
    
    
    def location_distribution(self,tweet):
        
        if tweet.place is None:
            if tweet.user.location is None:
                location = None
                l = None
            else:                    
                l = tweet.user.location
                location = l.lower()
                
        else:
            location = tweet.place.country
            l = location
        country_name, coord = loc.locate(location)
        
        return country_name, coord, l
        
        
    def basicAnalysis(self,tweet):
        
        retweet_count = tweet.retweet_count
        contentv,photo = self.content(tweet)
        try:
            text = tweet.full_text
        except:
            text = tweet.text
        try:
            user_type = tweet.metadata['result_type']
        except:
            if tweet.favorite_count > 1000:
                user_type = 'popular'
            else:
                user_type = 'recent'
        type_ = self.tweet_type(tweet)
        lang = tweet.lang

        hasht = tweet.entities['hashtags']
        hashtags = ','.join([h['text'] for h in hasht ])

        country_name, coord, l = self.location_distribution(tweet)
        sentiment = model.predict(text=text,lang=lang)
            
        tweetBanalysis = {"name":tweet.user.name
                    ,"user_url" : 'https://twitter.com/{}'.format(tweet.user.screen_name) 
                    ,"user_pic" : tweet.user.profile_image_url
                    ,"user_followers" : tweet.user.followers_count
                    ,"user_type" : user_type #POPULAR OR RECENT
                    ,"tweet" : text
                    ,"tweet_url" : "https://twitter.com/statuses/{}".format(tweet.id_str)
                    ,"likes" : tweet.favorite_count
                    ,"retweet_count" : retweet_count
                    ,"application" : tweet.source
                    ,"created_at" : tweet.created_at
                    ,"content" : contentv
                    ,"photo" : photo
                    ,"lang" : lang
                    ,"type" : type_
                    ,"countryname" : country_name
                    ,"coords": coord
                    ,"location_without" : l
                    ,"hashtags" : hashtags
                    ,"sentiment" : int(sentiment)
                    }
        df = pd.DataFrame.from_dict(tweetBanalysis)
        return tweetBanalysis,df
                
        
    def analysis(self,tweets):
        """
        analysis: create dataframe for tweets
        Parameter: None
        Return: json object
        """
        hash_num = Counter()
        apps = Counter()
        contents = Counter()
        tweet_typ = Counter()
        place =  {}
        timelineBanalysis={}
        timeline_analysis={}
        timeline_analysis['timeline'] = []
        hours = Counter()
        day_of_week = Counter()
        day_of_month = Counter()
        
        
        for tweet in (tweets):
    
            timelineBanalysis = self.basicAnalysis(tweet)
            timeline_analysis['timeline'].append(timelineBanalysis)
    
            if timelineBanalysis['location']:
                country_name = timelineBanalysis['location']['name']
                if country_name in place:    
                    place[country_name] = timelineBanalysis['location']
                    place[country_name]['population'] += 1
                    
                else:
                    place[country_name] = timelineBanalysis['location']
                    place[country_name]['population'] = 1
                    
            else:
                country_name=None
                        
            type_ = timelineBanalysis["type"]
            tweet_typ[type_] += 1
            app = timelineBanalysis["application"]
            apps[app] += 1
            content = timelineBanalysis['content']
            contents[content] += 1
            
            for hasht in timelineBanalysis["hashtags"]:
                hash_num[hasht] += 1
            
            hours[tweet.created_at.strftime("%I%p")] += 1
            day_of_week[tweet.created_at.strftime("%a")] += 1
            day_of_month[tweet.created_at.strftime("%d %b")] += 1


        hours = {'labels':list( hours.keys()),'values':list( hours.values())}
        day_of_week = {'labels':list( day_of_week.keys()),'values':list( day_of_week.values())}
        day_of_month = {'labels':list( day_of_month.keys()),'values':list( day_of_month.values())}


        timeline_analysis['analysis'] = {"freq_tweet_app" : dict(apps)#.most_common(5),
                            ,"freq_tweet_content" : dict(contents)
                            ,"freq_tweet_type" : dict(tweet_typ)
                            ,"freq_tweet_hashtag" : dict(hash_num)
                            ,"distribution" : list(place.values())
                            ,"hours" : hours
                            ,"day_of_week" : day_of_week
                            ,"day_of_month" : day_of_month
                            }
#            self.track_df.loc[i,'gender'] = self.gender_predict(tweet.user.name.lower())
        
        return timeline_analysis





    
autho = tweepy.OAuthHandler(user[0], user[1])
autho.set_access_token(user[2], user[3])
api = tweepy.API(autho)
co = Component(api)

tweets = co.search(query='love',count=10)
an,df = co.basicAnalysis(tweets[0]) 
    
"""Need to call         self.tweets = self.search(tweets_count/100) """

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