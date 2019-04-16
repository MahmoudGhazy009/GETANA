# -*- coding: utf-8 -*-
"""
Created on Fri Dec 14 11:10:29 2018

@author: khalid
"""


from wordtrack_modify import Wordtrack
import json
import sys
#import sentimental_pickle as sent

lines = sys.stdin.readlines()[0].replace('"',"").replace("\n","")
word = Wordtrack(lines)
json_object = word.analysis()
print(json.dumps(json_object))
