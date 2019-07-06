import os
import sys, codecs, urllib.parse

import requests as req
from pyquery import PyQuery as pq

from .models import Tweet, TweetCriteria

class Exporter(object):

    def __init__(self, criteria = None, filename = 'tweets_gathered.csv',new=1):
        file_extension = filename.split('.')[-1]

        if not file_extension == 'csv':
            self.filename = 'tweets_gathered.csv'
        else:
            self.filename = filename
        
        self.output = codecs.open(self.filename, 'a+', 'utf-8')
        
        if new:
            if not criteria:
                criteria ='tweet_id'    
            criteria_string = criteria
            self.output.write(criteria_string)
        

    def output_to_file(self, tweets):
        for tweet in tweets:
            format = '\n%s'
            self.output.write((format %(tweet.id)))
        self.output.flush();
        print ('%d tweets added to file' % len(tweets))

    def close(self):
        self.output.close()

class Scraper(object):

    def __init__(self):
        pass

    @staticmethod
    def set_headers(data, language, refresh_cursor):
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

    @staticmethod
    def get_tweets(tweet_criteria, buffer = None, buffer_length = 100,refresh_cursor = ''):
        active = True
        results = []
        results_to_append = []

        if tweet_criteria.max_tweets <= 0:
            return '',200,0
        
        while active:
            json_,status = Scraper.get_json_response(tweet_criteria, refresh_cursor)
            print('status: {}'.format(status))
            try:
                if not json_ or len(json_['items_html'].strip()) == 0:
                    if status==405:
                        print('error!!')
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
                break

            for i,tweetHTML in enumerate(tweets):

                _ = pq(tweetHTML)

                tweet_id = _.attr('data-tweet-id')

                tweet = Tweet()
                tweet.id = tweet_id
                results.append(tweet)
                results_to_append.append(tweet)
                
                if buffer and len(results_to_append) >= buffer_length:
                    buffer(results_to_append)
                    results_to_append = []

                if len(results) >= tweet_criteria.max_tweets:
                    active = False
                    break

            print('remain: {}'.format(tweet_criteria.max_tweets - len(results)))
            print('-'*5)
        if buffer and len(results_to_append) > 0:
            buffer(results_to_append)
        
        return refresh_cursor,status,len(results)

    @staticmethod
    def get_json_response(tweet_criteria, refresh_cursor):
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

        url, headers = Scraper.set_headers(data, language, refresh_cursor)

  

        try:
            r = req.get(url, headers=headers,timeout=20)
            #time.sleep(60)
        except:
            status = 405
#            text = 'Twitter weird response. Try to see on browser:https://twitter.com/search?q=%s&src=typd'
#            print(text % urllib.parse.quote(url))
#            print('Unexpected error:', sys.exc_info()[0])
#            sys.exit()
            return {},status

        return r.json(),r.status_code 

