# -*- coding: utf-8 -*-
"""
Created on Fri Dec 14 11:10:29 2018

@author: khalid
"""


from wordtrack_modify import Wordtrack
import json
import sys
# import sentimental_pickle as sent
import urllib.parse


def urlencode(str):
    return urllib.parse.quote(str)


def urldecode(str):
    return urllib.parse.unquote(str)

#str = '{"name": "Kinkin"}'
#encoded = urlencode(str)
# print(encoded)  # '%7B%22name%22%3A%20%22Kinkin%22%7D'


lines = sys.stdin.readlines()[0].replace('"', "").replace("\n", "")
lines = urldecode(lines)
#lines = lines.encode('utf-8').decode()
word = Wordtrack(lines)
json_object = word.analysis()
print(json.dumps(json_object))
