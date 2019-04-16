
import pandas as pd
import numpy as np
import tweepy
import sys
import json
consumer_key = "uQjxZTBtwpKJlJUjBTkKzZoOB"
consumer_secret = "DrHlZhHbylLUg25q7Inta7VL0TFTWEdufTpi8JIfo9nv3zUlec"
access_token =  "823320430702379009-aZzdJfrM03l7yslxR0h8xXJQKOUyaZC"
access_token_secret = "BYLJ36d7n0xr7VMPvfd9BOAeVQRoylueXbNf4vZ4Z16vT"
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)
def usertrack(user_id,api):
    user_id=user_id

    user = api.get_user(user_id)
    num_followers = user.followers_count
    num_following = user.friends_count
    num_tweets = user.statuses_count
    likes = user.favourites_count
    location = user.location
    profileurl= 'https://twitter.com/{}'.format(user.screen_name)
    tweets=[]
    itter_num = int(num_tweets/100)
    if itter_num<1:
        itter_num=1
    #1000 tweet/user
    elif itter_num>10:
        itter_num=10
    while itter_num:
        try:
            tweets.extend(api.user_timeline(screen_name = user_id, count= 100, include_rts = True, exclude_replies=False, tweet_mode = 'extended',max_id=None))

            max_id = tweets[-1].id
            itter_num -= 1
        except :
            print('maximum num of tweets reach')
            break
    tweet_df = pd.DataFrame()
    engagement=0
    retweet_count=0
    hashtag={}
    for i,tweet in enumerate(tweets):
        retweet_count=0
        tweet_df.loc[i,'tweet'] = tweet.full_text
        tweet_df.loc[i,'application'] = tweet.source
        tweet_df.loc[i,'created_at'] = tweet.created_at
        tweet_df.loc[i,'likes'] = tweet.favorite_count
        entity = tweet.entities            
        url = entity['urls']
        if entity.get('media'):
            media = entity.get('media')[0]
            contentv = media['type'] 
        elif len(url):
            contentv = 'url'
        else:
            contentv = 'text'
        tweet_df.loc[i,'content'] = contentv

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
            
        tweet_df.loc[i,'retweet_count'] = retweet_count     
        tweet_df.loc[i,'type'] = typev 
        tweet_df.loc[i,'most_user'] = user_mentions
        
        
        hasht = entity['hashtags']
        for i in range(len(hasht)):
            h = hasht[i]['text']
            if h in hashtag:
                hashtag[h] += 1
            else:
                hashtag[h] = 1
    retweet_count = tweet_df['retweet_count'].sum()
    num_tweets = sum(tweet_df.type!='reply')
    num_tweets = len(tweet_df)
    likes = tweet_df['likes'].sum()
    
#        need add num of replies
    engagement = (likes + retweet_count)*100/(num_followers + num_tweets)
    most_freq_app = tweet_df['application'].value_counts()
    most_quoted_user = tweet_df[tweet_df['type']=='quote']['most_user'].value_counts()[:10]
    most_reply_user = tweet_df[tweet_df['type']=='reply']['most_user'].value_counts()[:10]
    most_retweet_user = tweet_df[tweet_df['type']=='retweet']['most_user'].value_counts()[:10]
    content = tweet_df['content'].value_counts()
    tweet_type = tweet_df['type'].value_counts()
    #day_of_week = tweet_df['created_at'].dt.day_name()
    return json.dumps(
        {"followers":num_followers,
        "following":num_following,
        "total number of tweets":num_tweets,
        "location":location,
        "profile pic":profileurl,
        "engagement":engagement,
        "retweet_count":retweet_count,
        "hashtag":hashtag,
        "num_tweets":num_tweets,
        "likes":likes,
        "most_freq_app":dict(zip(most_freq_app.keys().tolist(),most_freq_app.tolist())),
        "most_quoted_user":dict(zip(most_quoted_user.keys().tolist(),most_quoted_user.tolist())),
        "most_reply_user":dict(zip(most_reply_user.keys().tolist(),most_reply_user.tolist())),
        "most_retweet_user":dict(zip(most_retweet_user.keys().tolist(),most_retweet_user.tolist())),
        "content":dict(zip(content.keys().tolist(),content.tolist())),
        "tweet_type":dict(zip(tweet_type.keys().tolist(),tweet_type.tolist()))})
lines = sys.stdin.readlines()[0].replace('"',"").replace("\n","")
print(usertrack('@'+lines,api))    
