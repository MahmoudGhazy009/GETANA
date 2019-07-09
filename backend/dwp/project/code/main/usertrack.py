# -*- coding: utf-8 -*-
"""
Created on Thu Dec 13 14:42:03 2018
@author: khalid
"""
import warnings
warnings.filterwarnings("ignore")

from modules import *
import tweepy
from components import Component
from auth import *

class Usertrack(Component):
    
    def __init__(self,api):
        super().__init__(api)


    def profile_card(self,user_id):
        
        """
        profile_card: essential information about user like "tweets_count,likes,# of followers,# of following,user's location and user's profile"
        Parameter: None
        Return: None
        """
        try:
            self.user_id = user_id
            user = self.api.get_user(self.user_id)
        except:
            return 0 #'userName is invalide'
        
        num_followers = user.followers_count
        num_following = user.friends_count
        num_tweets = user.statuses_count
        likes = user.favourites_count
        location = user.location
        profileurl= 'https://twitter.com/{}'.format(user.screen_name)
        name = user.name
        pic= user.profile_image_url_https
        bio = user.description
        profile_banner = user.profile_banner_url
        lists = user.listed_count
        
        user_card = {"name": name
                 ,"screen_name": user_id
                 ,"profile_url": profileurl
                 ,"profile_pic": pic
                 ,"profile_banner": profile_banner 
                 ,"bio": bio
                 ,"lists": lists
                 ,"followers": num_followers
                 ,"following": num_following
                 ,"num_tweets": num_tweets
                 ,"location": location
                 ,"likes": likes}
        return user_card
        
    def user_timeline(self, num_tweets = 100):
        """ 
        user_timeline: collect tweets for specific user
        Parameter: None
        Return:
            json object for tweets
        """
        tweets=[]
        max_id = None
        itter_num = math.ceil(num_tweets/100)
        while itter_num:
            try:
                tweets.extend(self.api.user_timeline(screen_name = self.user_id, count= 100, include_rts = True, exclude_replies=False, tweet_mode = 'extended', max_id= max_id))
                max_id = self.tweets[-1].id
                itter_num -= 1
            except:
#                print('maximum num of tweets reach')
                break
        return tweets
    

    def fol_locate(self,users):
        """
        fol_locate: mapping country into coords
        params: users objects
        return: Dict with users location
        """
        fol_location={}
        for user in users:
            place,l = self.location_distribution(user=user)
            if place:
                country_name = place['name']
                if country_name in fol_location:
                    fol_location[country_name]['population'] += 1
                else:
                    fol_location[country_name] = place
                    fol_location[country_name]['population'] = 1
        return fol_location
    
    
    def following(self):
        """
        following: locate country of following user
        Parameter: None
        return: dict
        """
        users = self.api.friends(id=self.user_id,skip_status=True)
        return users
        
    def follower(self):
        """
        following: locate country of follower user
        Parameter: None
        return: dict
        """
        users = self.api.followers(id=self.user_id,skip_status=True)    
        return users

    def user_likes(self):
        """ 
        user_timeline: collect like`s tweets for specific user,
            do analysis on it.
        Parameter: None.
        Return: likes status.
        """
        likes_tweets = self.api.favorites(screen_name = self.user_id,tweet_mode = 'extended')
        return likes_tweets 


    def analysis(self,tweets):
        """
        analysis: gather all analysis timeline and likes analysis,
            follower and following location and user activites.
        Parameter: None.
        Return: userAnalysis.
        """
        quote = Counter()
        reply = Counter()
        retweet = Counter()
        total_retweet_count=0
        
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
            
            if type_ != 'retweet':
                total_retweet_count += timelineBanalysis['retweet_count']
            
            user_mentions = timelineBanalysis['user_mentions']
            
            for user_mention in user_mentions:
                if type_ == 'reply':
                    reply[user_mention] +=1
                elif type_ == 'quote':
                    quote[user_mention] +=1
                elif type_ == 'retweet':
                    retweet[user_mention] +=1
            
            hours[tweet.created_at.strftime("%I%p")] += 1
            day_of_week[tweet.created_at.strftime("%a")] += 1
            day_of_month[tweet.created_at.strftime("%d %b")] += 1
            
        most_replied_user = dict(reply.most_common(3))
        most_quoted_user = dict(quote.most_common(3))
        most_retweeted_user = dict(retweet.most_common(3))

        hours = {'labels':list( hours.keys()),'values':list( hours.values())}
        day_of_week = {'labels':list( day_of_week.keys()),'values':list( day_of_week.values())}
        day_of_month = {'labels':list( day_of_month.keys()),'values':list( day_of_month.values())}

        
        timeline_analysis['analysis'] = {"freq_tweet_app" : dict(apps)#.most_common(5),
                                ,"freq_tweet_content" : dict(contents)
                                ,"freq_tweet_type" : dict(tweet_typ)
                                ,"freq_tweet_hashtag" : dict(hash_num)
                                ,"most_replied_user" : most_replied_user
                                ,"most_quoted_user" : most_quoted_user
                                ,"most_retweeted_user" : most_retweeted_user
                                ,"hours" : hours
                                ,"day_of_week" : day_of_week
                                ,"day_of_month" : day_of_month
                                }
        
        return timeline_analysis



if __name__ =='__main__':
    
    #user_name =  sys.stdin.readlines()[0].replace('"',"").replace("\n","")
    user_name =  sys.argv[1]
    
    autho = tweepy.OAuthHandler(user[0], user[1])
    autho.set_access_token(user[2], user[3])
    api = tweepy.API(autho)
    
    user = Usertrack(api)
    user_card = user.profile_card(user_name)
    
    if user_card:
        tweets = user.user_timeline()
        user_analysis = user.analysis(tweets)
        
        user_analysis['cards'] = user_card
        
        likes = user.user_likes()
        likes_timeline = list(map(user.basicAnalysis,likes))
        user_analysis['likes_timeline'] = likes_timeline
        
        following = user.following()
        following_place = user.fol_locate(following)
        follow_list=[]
        for value in following_place.values():
            value['type']='following'
            follow_list.append(value)
                
        follower = user.follower()
        follower_place = user.fol_locate(follower)
        for value in follower_place.values():
            value['type']='follower'
            follow_list.append(value)

        user_analysis['map'] = follow_list# list(following_place.values())}
        
        print(json.dumps(user_analysis))
        
    else:
        print(json.dumps('0'))



#users = api.followers(id='khalid__amer',skip_status=True)

#co = Component(api)
#
#
#
#
#
#    def validate (self):
#        if self.exist:
#            return 1
#        else:
#            return 0
#    
#
