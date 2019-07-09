
# -*- coding: utf-8 -*-
import warnings
warnings.filterwarnings("ignore")

from components import Component
import urllib.parse
import json
from auth import *
from modules import *

"""
Created on Fri Dec 14 03:58:46 2018
@author: khalid
"""


def urlencode(str):
    return urllib.parse.quote(str)


def urldecode(str):
    return urllib.parse.unquote(str)


if __name__ == '__main__':

    autho = tweepy.OAuthHandler(user[0], user[1])
    autho.set_access_token(user[2], user[3])
    api = tweepy.API(autho)
    co = Component(api)

    #lines = sys.stdin.readlines()[0].replace('"', "").replace("\n", "")
    lines = sys.argv[1]
    lines = urldecode(lines)
    lines = lines.encode('utf-8').decode()

    tweets = co.search(query=lines, count=10)
    an = co.analysis(tweets)

    print(json.dumps(an))
