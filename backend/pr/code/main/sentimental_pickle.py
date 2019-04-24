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


def predict(text, lang='en'):

    if lang == 'ar':
        with open(r"K:\final pro\GETANA\backend\pr\datasets\sentiment\ar_vect.pkl", 'rb') as pickle_in:
            vect = pickle.load(pickle_in)

        with open(r"K:\final pro\GETANA\backend\pr\datasets\sentiment\ar_model.pkl", 'rb') as pickle_in:
            sv = pickle.load(pickle_in)

    else:
        with open(r"K:\final pro\GETANA\backend\pr\datasets\sentiment\tfidf.pickle", 'rb') as pickle_in:
            vect = pickle.load(pickle_in)

        with open(r"K:\final pro\GETANA\backend\pr\datasets\sentiment\svm.pickle", 'rb') as pickle_in:
            sv = pickle.load(pickle_in)

    series = pre.noise_reduce(text, lang=lang)
    series = [series]
    series_dtm = vect.transform(series)

    out = sv.predict(series_dtm)

    return out[0]
