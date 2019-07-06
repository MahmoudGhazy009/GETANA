# -*- coding: utf-8 -*-
"""
Created on Fri Dec 14 03:58:46 2018
@author: khalid
"""
import warnings
import sentimental_pickle  as model
from components import Component
import urllib.parse
import json
from modules import *

warnings.filterwarnings("ignore")


def urlencode(str):
    return urllib.parse.quote(str)

def urldecode(str):
    return urllib.parse.unquote(str)

if __name__=='__main__':

    lines = sys.argv[0]
    lines = urldecode(lines)
    lines = lines.encode('utf-8').decode()
    
    tweets = Component.search(lines)
    an = Component.analysis(tweets)
    print(json.dumps(an))

