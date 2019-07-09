# -*- coding: utf-8 -*-
"""
Created on Mon Feb 11 14:07:23 2019

@author: khalid
"""

import modules
import re
import pickle
import string
from nltk.stem import PorterStemmer
from nltk.stem import WordNetLemmatizer
from nltk.stem.isri import ISRIStemmer
from nltk.tokenize import  word_tokenize
#from nltk import pos_tag
import emoji as emojis


table = str.maketrans({key: None for key in string.punctuation})

porter = PorterStemmer()
wordnet_lemmatizer = WordNetLemmatizer()
ar_st = ISRIStemmer()


def read():
    
    path = modules.path
    with open(r"{}/project/datasets/preprocessing/emojis.pkl".format(path),'rb') as f:    
        emoji = pickle.load(f)
        
    with open(r"{}/project/datasets/preprocessing/pkl/helper_contractions.pickle".format(path),'rb') as f:    
        shortcuts = pickle.load(f)
    
    
    with open(r"{}/project/datasets/preprocessing/pkl/helper_pictograms_to_emoji.pickle".format(path),'rb') as f:    
        pictograms_to_emoji = pickle.load(f)

    return emoji, shortcuts, pictograms_to_emoji


emoji, shortcuts, pictograms_to_emoji = read()


def noise_reduce(data,lang='en'):

    data = data.lower()
    # replace emoji with words
#    data = emoji_sub(data)  
    if lang == 'ar':
        data = ''.join(list(map(lambda x: emoji[x]['ar'] if x in emoji else x , list(data))))
    else:
        
        data = ' '.join(list(map(lambda word : pictograms_to_emoji[word] if word in pictograms_to_emoji else word,data.split())))

        data = ''.join(list(map(lambda x: re.sub('_|-',' ',emojis.UNICODE_EMOJI.get(x)) if x in emojis.UNICODE_EMOJI else x , list(data))))

        data = ' '.join(list(map(lambda word : shortcuts[word] if word in shortcuts else word,data.split())))


    # Replaces URLs with the word URL
    data = re.sub(r'(https?://[www]?|www)[\S]+',' url',data)    
    # Replace @handle with the word USER_MENTION
    data = re.sub(r'@([\S]+)',r' ',data)    
    # Replace &amp with nothing
    data = re.sub(r'&\w+',r' ',data)    
    # remove digits
    data = re.sub(r'\d+',r'',data)    
    #replace more than same 2 char to two char
    data = re.sub(r'(.)\1+', r'\1\1',data)    
    # Remove RT (retweet)
    data = re.sub(r'\brt\b', '', data)
    

    # stem and remove invalid emoji 
#    data = stemSentence(data)
#    data = ' '.join(list(map(lambda word : porter.stem(re.sub(r'\W+','',word)),data.split())))  # equal to stemSentence()
    # lema    
    if lang == 'ar':
        data = ' '.join(list(map(lambda word : ar_st.stem(re.sub(r'\W+','',word)),data.split())))
    else:
        data = ' '.join(list(map(lambda word : wordnet_lemmatizer.lemmatize(re.sub(r'\W+','',word)),data.split())))
    
    # remove punc
    data = data.translate(table)    
    
    # remove word less than 2 char
    data = ' '.join(list(map(lambda word : word if len(word)>=2 else '', data.split())))  # equal to stemSentence()
#    # pos
#    data = pos_tag(word_tokenize(data),tagset='universal')
#    data = ' '.join(list(map(lambda word: word[0] if word[1] in ['ADJ','ADV','VERB'] else '' , data)))
    return data

#print(noise_reduce("😍 she ̲likes‒–― ‐—━—-▬ me and :( o_O I've love\n\r\t\u200b\x96 her driving",'en'))

# ===================== functions replaced by mapping =================================
  
def stemSentence(sentence):
    token_words=word_tokenize(sentence)
    stem_sentence=[]
         
    for word in token_words:
  #       remove un used emoji
        word = re.sub(r'\W+','',word)
  #       stem words
        stem_sentence.append(porter.stem(word))
          
    return " ".join(stem_sentence)
 
def emoji_sub(data):     
    for i in emoji:
        index = data.find(i)
        if index != -1:
            data = data.replace(data[index],' {} '.format(emoji[i]))
    return data
