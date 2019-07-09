# -*- coding: utf-8 -*-
"""
Created on Thu Feb 28 13:31:17 2019

@author: khalid
"""
import time
import pickle
import pre_processing2 as pre
import pandas as pd
import numpy as np
from sklearn.svm import LinearSVC
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import confusion_matrix as confm,f1_score,precision_score
from sklearn.model_selection import cross_val_score,GridSearchCV,train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import PolynomialFeatures,StandardScaler
from sklearn.feature_selection import SelectPercentile

path = "E:"

data = pd.read_csv(r"{}\project\datasets\sentiment\ar_tweets\arabic_tweets_sen.csv".format(path))

data['Sentiment'] = data['Sentiment'].astype('category')
language = 'ar'
X = data['SentimentText']
y= data['Sentiment']

#data = pd.read_csv(r"E:\project\datasets\sentiment\ar_tweets\arabic_tweets.csv")
#data = pd.read_csv(r"C:\Users\khalid\Desktop\Sentiment Analysis Dataset.csv",error_bad_lines=False)
#i = [253,260,278,357]
#
#data.iloc[i,1]=0
#for i in range(5):    
#    data[17101*(i):17101*(i+1)].to_csv(r"E:\project\datasets\sentiment\ar_tweets\arabic_tweets_sen{}.csv".format(i))


xtrain,xtest,ytrain,ytest = train_test_split(X,y,test_size=.3,random_state=42)
start = time.time()
print('preprocessing start')
xtrain = xtrain.apply(pre.noise_reduce,lang=language)
xtest = xtest.apply(pre.noise_reduce,lang=language)
print('preprocessing done')
print(time.time()-start)
start = time.time()
pipe = Pipeline([( "tfidf", TfidfVectorizer(use_idf=True) )
               # ,("poly",PolynomialFeatures())
                #,("std",StandardScaler(with_mean=False))
                ,("per",SelectPercentile())
                , ("svm",LinearSVC()) ])
param_grid = {"svm__C": [ 0.1, 1]
            #,"poly__degree":[2,3]
            ,"per__percentile":[50,60,70,80]
            ,"tfidf__ngram_range":[(1,3)]
            ,"tfidf__norm":['l1','l2']
            ,"tfidf__sublinear_tf":[True,False]
            ,"tfidf__min_df":[5,10,15]}
grid = GridSearchCV(pipe, param_grid, cv=5,n_jobs=-1)
grid.fit(xtrain,ytrain)
print("Best cross-validation score: {:.2f}".format(grid.best_score_))
print("Best parameters:\n{}".format(grid.best_params_))
print("Test set score: {:.2f}".format(grid.score(xtest, ytest)))
print(time.time()-start)

"""
Best cross-validation score: 0.84
Best parameters:
{'per__percentile': 50, 'svm__C': 0.1, 'tfidf__ngram_range': (1, 3)}
Test set score: 0.83
392.40955114364624

preprocessing start
preprocessing done
18.190748929977417
Best cross-validation score: 0.84
Best parameters:
{'per__percentile': 50, 'svm__C': 0.1, 'tfidf__min_df': 5, 'tfidf__ngram_range': (1, 3), 'tfidf__norm': 'l2', 'tfidf__sublinear_tf': True}
Test set score: 0.83
1824.1919996738434


"""


"""

X_train = data['SentimentText']
y_train = data['Sentiment']
vector = TfidfVectorizer(min_df = 9e-06
                         ,ngram_range = (1, 3)
                         ,sublinear_tf = False
                         ,use_idf = True




#                        ,max_features=200000
                        ,smooth_idf = True
                        ,norm ='l2') 

X_train_vec = vector.fit_transform(X_train)

model = LinearSVC(C=1)

model.fit(X_train_vec, y_train)

print("Test set score: {:.2f}".format(model.score(X_train_vec,y_train)))
"""
"""
with open("ar_model.pkl",'wb') as f:
    pickle.dump(model,f)

with open("ar_vect.pkl",'wb') as f:
    pickle.dump(vector,f)
"""

# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""






"""
vect = TfidfVectorizer(sublinear_tf =True,use_idf=True,min_df=5,ngram_range=(1,2))
vect.fit(d_train['SentimentText'])
X = vect.transform(d_train['SentimentText'])
y = d_train['Sentiment']

"""
"""

# Setup the hyperparameter grid
c_space = np.logspace(-2, 2, 10)
param_grid = {'C': c_space,'kernel':['rbf','linear']}

#svm = LinearSVC(random_state=42)
svm = SVC(random_state=1)

# Instantiate the GridSearchCV object: logreg_cv
svm_cv = GridSearchCV(svm, param_grid, cv=5)

# Fit it to the data
svm_cv.fit(X,y)

# Print the tuned parameters and score
print("Tuned svm Parameters: {}".format(svm_cv.best_params_)) 
print("Best score is {}".format(svm_cv.best_score_))

"""



#d_test = data.tail(100000).copy()
#
#
#
#start = time.time()
#d_test.loc[:,'SentimentText'] = d_test.loc[:,'SentimentText'].apply(pre.noise_reduce)
#cost = time.time()-start
#print('cost pre: {}'.format(cost))
#
#
#
#dd=[5,25,50,75,100]
#for d in dd:
#    #vect = CountVectorizer(min_df=d,ngram_range=(1,2))
#    
#    X_test_vect=vect.transform(d_test['SentimentText'])
#     
#
#    from sklearn.model_selection import GridSearchCV
#    param_grid = {'C': [0.001, 0.02, 0.1, 1, 10]}
#    grid = GridSearchCV(LinearSVC(random_state=1), param_grid, cv=5,n_jobs=-1)
#    grid.fit(X_vect, d_train['Sentiment'])
#    print("Best cross-validation score: {:.2f} {}".format(grid.best_score_,d))
#    print("Best parameters: ", grid.best_params_)
#    best = grid.best_score_


# =============================================================================
# vect = TfidfVectorizer(sublinear_tf =True,use_idf=True,min_df=5,ngram_range=(1,2)) # c=0.1 all words lemma
# vect = TfidfVectorizer(sublinear_tf =True,use_idf=True,min_df=5,ngram_range=(1,2)) # c=0.1 all words stem
# start = time.time()
# vect.fit(d_train['SentimentText'])
# X_vect=vect.transform(d_train['SentimentText'])
# X_test_vect=vect.transform(d_test['SentimentText'])
# cost = time.time()-start
# print('costvect: {}'.format(cost))
# 
# 
# sv=LinearSVC(C=0.1)
# sv.fit(X_vect,d_train['Sentiment'])
# out=sv.predict(X_test_vect)
# print('accuarce: {}'.format(mt.accuracy_score(d_test['Sentiment'],out)))
# cost = time.time()-start
# print('f1score: {}'.format(mt.f1_score(d_test['Sentiment'],out)))
#  
# 
# 
# =============================================================================

