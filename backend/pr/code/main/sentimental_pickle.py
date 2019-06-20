# -*- coding: utf-8 -*-
"""
Created on Thu Feb 28 13:29:51 2019

@author: khalid
"""

import pre_processing as pre
import pandas as pd
import numpy as np
import pickle
from sklearn.svm import LinearSVC
from sklearn.feature_extraction.text import TfidfVectorizer

import warnings
warnings.filterwarnings("ignore")

path = 'K:\final pro\GETANA\backend\pr'
with open(r"K:\final pro\GETANA\backend\pr\datasets\sentiment\ar_vect.pkl", 'rb') as pickle_in:
    ar_vect = pickle.load(pickle_in)

with open(r"K:\final pro\GETANA\backend\pr\datasets\sentiment\ar_model.pkl", 'rb') as pickle_in:
    ar_sv = pickle.load(pickle_in)

with open(r"K:\final pro\GETANA\backend\pr\datasets\sentiment\tfidf.pickle", 'rb') as pickle_in:
    en_vect = pickle.load(pickle_in)

with open(r"K:\final pro\GETANA\backend\pr\datasets\sentiment\svm.pickle", 'rb') as pickle_in:
    en_sv = pickle.load(pickle_in)


def predict(text, lang='en'):

    series = pre.noise_reduce(text, lang=lang)
    if lang == 'ar':
        series_dtm = ar_vect.transform([series])
        out = ar_sv.predict(series_dtm)

    else:
        series_dtm = en_vect.transform([series])
        out = en_sv.predict(series_dtm)

    return out[0]
