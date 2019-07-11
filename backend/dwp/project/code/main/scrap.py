
import modules
from scraper import controllersu, models
#sys.path.append('../')

path= modules.path

def main(*args,**kwargs):
    
    if len(kwargs) == 0:
        print('No arguments/parameters passed. For more information on how to'\
         'use OldTweetsScraper, you may pass "-help" as a parameter.')
        return

#    try:
    opts = kwargs
    r = args[0]
    last_id = args[1]
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
    
    miner = controllersu.Scraper()
    r,status,result,last_id = miner.get_tweets(tweet_criteria,r,last_id)
    print(last_id,'from scrap')
    print('Finished scraping data')
    return r,status,result,last_id



