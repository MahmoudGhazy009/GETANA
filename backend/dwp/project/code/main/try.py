# -*- coding: utf-8 -*-
"""
Created on Fri Dec 14 11:10:29 2018

@author: khalid
"""


from wordtrack_modify import wordtrack
import json
import sys
# import sentimental_pickle as sent
import urllib.parse
import pickle


def urlencode(str):
    return urllib.parse.quote(str)


def urldecode(str):
    return urllib.parse.unquote(str)

# str = '{"name": "Kinkin"}'
# encoded = urlencode(str)
# print(encoded)  # '%7B%22name%22%3A%20%22Kinkin%22%7D'


lines = sys.argv[0]
lines = urldecode(lines)
lines = lines.encode('utf-8').decode()
word = Wordtrack(lines)
# with open('apple_analysis.pkl', 'rb') as f:
# json_object = pickle.load(f)
# json_object = json_object['timeline'][:3]
json_object = word.analysis()
print(json.dumps(json_object))
