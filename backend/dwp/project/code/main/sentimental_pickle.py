# -*- coding: utf-8 -*-
"""
Created on Thu Feb 28 13:29:51 2019

@author: khalid
"""

import pre_processing2 as pre
import pickle
from sklearn.svm import LinearSVC
from sklearn.feature_extraction.text import TfidfVectorizer
import modules


def train():

    path = modules.path
    with open(r"{}/project/datasets/sentiment/ar_vect.pkl".format(path), 'rb') as pickle_in:
        ar_vect = pickle.load(pickle_in)

    with open(r"{}/project/datasets/sentiment/ar_model.pkl".format(path), 'rb') as pickle_in:
        ar_sv = pickle.load(pickle_in)

    with open(r"{}/project/datasets/sentiment/tfidf.pickle".format(path), 'rb') as pickle_in:
        en_vect = pickle.load(pickle_in)

    with open(r"{}/project/datasets/sentiment/svm.pickle".format(path), 'rb') as pickle_in:
        en_sv = pickle.load(pickle_in)
    return ar_vect, ar_sv, en_vect, en_sv


_ = train()


def predict(*args, **kwargs):
    """
    text=text,lang=lang,
    ar_vect,ar_sv,en_vect,en_sv = train()
    """
    ar_vect, ar_sv, en_vect, en_sv = _
    series = pre.noise_reduce(kwargs['text'], lang=kwargs['lang'])
    if kwargs['lang'] == 'ar':
        series_dtm = ar_vect.transform([series])
        out = ar_sv.predict(series_dtm)

    else:
        series_dtm = en_vect.transform([series])
        out = en_sv.predict(series_dtm)
    
    return out[0]

