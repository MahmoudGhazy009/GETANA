import urllib.parse

import requests as req
from pyquery import PyQuery as pq

from .models import TweetCriteria
import statuslookup as sl


    
class Scraper():

    def __init__(self):
        pass

    def set_headers(self,data, language, refresh_cursor):
        url = 'https://twitter.com/i/search/timeline?f=realtime&q=%s&src=typd'\
                + '&%smax_position=%s'
        url = url % (urllib.parse.quote(data), language, refresh_cursor)
        headers = {
            'Host': 'twitter.com',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64)',#'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36',
            'Accept': 'application/json, text/javascript, */*;q=0.01',
            'Accept-Language': 'de,en-US;q=0.7,en;q=0.3',
            'X-Requested-With': 'XMLHttpRequest',
            'Referer': url,
            'Connection': 'keep-alive'
        }

        return url, headers


    def get_tweets(self,*args):
#        tweet_criteria,refresh_cursor = '', last_id
        active = True
        results = []
        status = 200
        tweet_criteria = args[0]
        refresh_cursor = args[1]
        
        if tweet_criteria.max_tweets <= 0:
            return '',status,results,last_id

        while active:
            json_,status = self.get_json_response(tweet_criteria, refresh_cursor)
            print('status: {}'.format(status))
            try:
                if not json_ or len(json_['items_html'].strip()) == 0:
                    if status==405:
                        print('Twitter weird response.')
                    else:
                        print('empty json')
                    break
            except:
                if status==400:
                    print('bad Request')
                    break

            refresh_cursor = json_['min_position']
            tweets = pq(json_['items_html'])('div .js-stream-tweet')
        
            if len(tweets) == 0:
                print('tweets empty')
                break

            for i,tweetHTML in enumerate(tweets):
                _ = pq(tweetHTML)
                tweet_id = _.attr('data-tweet-id')
                results.append(tweet_id)
            
                if len(results) >= tweet_criteria.max_tweets:
                        active = False
                        break
            
        return refresh_cursor,status,results

    def get_json_response(self,tweet_criteria, refresh_cursor):
        data = ''

        if hasattr(tweet_criteria, 'username'):
            data += ' from:' + tweet_criteria.username
            
        if hasattr(tweet_criteria, 'since'):
            data += ' since:' + tweet_criteria.since

        if hasattr(tweet_criteria, 'until'):
            data += ' until:' + tweet_criteria.until

        if hasattr(tweet_criteria, 'query'):
            data += ' ' + tweet_criteria.query
        else:
            
            print('No query placed.')
#            return

        if hasattr(tweet_criteria, 'language'):
            language = 'lang=' + tweet_criteria.language + '&'
        else:
            language = 'lang=en-US&'

        url, headers = self.set_headers(data, language, refresh_cursor)

  
        try:
            r = req.get(url, headers=headers,timeout=20)
            #time.sleep(60)
        except:
            status = 405
            return {},status

        return r.json(),r.status_code 

