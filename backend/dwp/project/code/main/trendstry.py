# -*- coding: utf-8 -*-
"""
Created on Sat Mar  2 19:45:02 2019

@author: khalid
"""

from components import Component
from auth import *
from modules import *

class Explore(Component):
    def __init__(self,api):
        super().__init__(api)
        
        
    def available(self):
        trends_location = self.api.trends_available()
#        country = [(d['country'], d['woeid']) for d in trends_location if d['parentid']==1]
        country = {d['country']: d['woeid'] for d in trends_location if d['parentid']==1}
        return country
    
    def woeid(self,location):
        """
        convert country to woid 
        """
#            i = ('Egypt',262718)
        if location =='world':
            place = 1
        else:
            place= self.country_woid.get(location)
        return place
        
    
    
    def get_trends(self,location='world'):
        place = self.woeid(location)
        trends = self.api.trends_place(id = place)[0]
        trends_name = [{'name':trend['name'],'tweet_volume':trend['tweet_volume']}for trend in trends['trends']]
        return trends_name
        
    
    """Need DataBase"""
    
    def update_all(self,country=None):
        trendsmap=[]
        while True:
            flag = len(country) -70
            if flag > 0:
                for name, woid in list(country.items())[:70]:
                    trends = self.api.trends_place(id = woid)[0]
                    trends_name = [{'name':trend['name'],'tweet_volume':trend['tweet_volume']}for trend in trends['trends']]
                    trendsmap.append({'name':name,'trends':trends_name})
                country = {d[0]:d[1] for d in list(country.items())[70:]}
                time.sleep(900)
                
#            i = ('Egypt',262718)
            else:
                for name, woid in list(country.items()):
                    trends = self.api.trends_place(id = woid)[0]
                    trends_name = [{'name':trend['name'],'tweet_volume':trend['tweet_volume']}for trend in trends['trends']]
                    trendsmap.append({'name':name,'trends':trends_name})

                break
            
        return trendsmap
    

    def get_tweets(self,query,count=50):
        tweets = self.search(query = query, count= count, result= 'recent') 
        tweets_analysis = []
        for tweet in tweets:
            tweets_analysis.append(self.basicAnalysis(tweet))
        return tweets_analysis
    
    
 
if __name__=='__main__':
    
    autho = tweepy.OAuthHandler(app[0], app[1])
    autho.set_access_token(app[2], app[3])
    api = tweepy.API(autho)

    client = Explore(api)
        
    cf = int(sys.argv[1]) #{0 : update_all, 1 : get_trends, 2 : get_tweets}
    
    country = client.available()
    
    if (cf==0):
        result = client.update_all(country)
        
    elif(cf==1):
        country = 'Egypt'#sys.argv[2] 
        result = client.get_trends(country)
    
    elif(cf==2):
        query = sys.argv[2]
        result = client.get_tweets(query,10)
    
    print(json.dumps({'trends':result}))
    
    
    
    
    
