import os
import time
import sys
import json

sys.path.append('../')
import statuslookup as sl
from scraper import controllersq, models

def main(*args,**kwargs):

    if len(kwargs) == 0:
        print('No arguments/parameters passed. For more information on how to'\
         'use OldTweetsScraper, you may pass "-help" as a parameter.')
        return

#    try:
        
    opts = kwargs
    r = args[0]
    tweet_criteria = models.TweetCriteria()
    for opt, value in opts.items():
        if opt == 'username':
            tweet_criteria.username = value
        elif opt == 'since':
            tweet_criteria.since = value
        elif opt == 'until':
            tweet_criteria.until = value
        elif opt == 'query':
            tweet_criteria.query = value
        elif opt == 'max_tweets':
            tweet_criteria.max_tweets = value
        elif opt == 'language':
            tweet_criteria.language = value
    
    exporter = controllersq.Exporter(filename= args[2], new=args[1])

    miner = controllersq.Scraper()
    
    r,status,d = miner.get_tweets(tweet_criteria=tweet_criteria, buffer = exporter.output_to_file,refresh_cursor=args[0])
#    print(r)
    exporter.close()
    text = 'Finished scraping data. Output file generated'\
        +'"{}{}".csv'.format(args[3],opts.get('since'))
    print(text);
    return r,status,d



if __name__ == '__main__':
    s=['nike']
    for search in s:
#    search = 'Samsung' #'apple''
        userName= 0 
        query = 1
        language= 'ar'
        start= '2019-{}-{}'
        system = 'windows'
        
        if system == 'windows':
            path = "E:"
        else:
            path = "/media/khalid/learninig"
        
        folder = '{}/project/datasets/Twitter-Get-Old-Tweets-Scraper-master/csv/{}/'.format(path,search)
    
        
        try:
            os.mkdir(folder)
        except:
            print('folder exists')
        
        days = [(start.format(f'{i%12:02}','01'),start.format(f'{(i+1)%12:02}','01'))for i in range(1,8)]
    
        for tupl in days:
            maxTweets= 10000
            since= tupl[0]
            until= tupl[1]
            r=''
            new=1
            i=0
            status=200
            
            filename = folder + '{}{}.csv'.format(search,since)
                    
            while 1:
                if userName:
                    r,status,download = main(r, new, filename,search, username=search, max_tweets= maxTweets,since=since,until=until)
                elif query:
                    r,status,download = main(r, new, filename,search, query=search, max_tweets= maxTweets,since=since,until=until)
                else:
                    print('choose what u want to scrapp: user or word')
                    break
                i+=1
                maxTweets = maxTweets-download
                if status == 200:
                    break
                else:
                    print('wait and try again')
                    new= 0
                    time.sleep((i*10)%300)
        
        sl.main(search)