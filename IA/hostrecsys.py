import pickle
import numpy as np
import json
from flask_cors import CORS
from flask import Flask, request, jsonify, make_response
import numpy as np
import requests
import pandas as pd
from sklearn.neighbors import NearestNeighbors


app = Flask(__name__)
CORS(app) # https 
app.config['CORS_HEADERS'] = 'Content-Type' # xors header verification date time origin 

pfdata = pd.read_csv(r"C:\Users\saida\OneDrive\Bureau\said\IA\data.csv", encoding='latin-1') # read csv




def predres(idclient):
    v = idclient


    rating_books = pd.read_csv(r"C:\Users\saida\OneDrive\Bureau\said\IA\data.csv", encoding='latin-1')

    # Take 1 % data as sample  
    rating_books_sample = rating_books.sample(frac=.07, random_state=1) 

    print(rating_books_sample.head())

    # Shape of the sample data
    rating_books_sample.shape

    rating_books_pivot = rating_books_sample.pivot_table(index='offre', columns='idclient', values='score').fillna(0)

    # Show top-5 records
    print(rating_books_pivot.head())



    # Import NearestNeighbors

    # Build NearestNeighbors Object
    model_nn = NearestNeighbors(metric='cosine', algorithm='brute', n_neighbors=7, n_jobs=-1)

    # Fit the NearestNeighbor
    model_nn.fit(rating_books_pivot)


    # Get top 10 nearest neighbors 
    try:
        indices=model_nn.kneighbors(rating_books_pivot.loc[[v]], 10, return_distance=False)
    except  KeyError:
        indices = 0

    # Print the recommended books
    print("Recommended Offers:")
    print("==================")
    print(rating_books_pivot)
    for index, value in enumerate(rating_books_pivot.index[indices][0]):
        print((index+1),". ",value)
    return rating_books_pivot


@app.route("/hostpredres", methods=["POST", "OPTIONS"])
def hostpredres():
    # output = request.get_json()
    # idclient = output["word"]
    # print(idclient)
    if request.method == "OPTIONS": # CORS preflight
        return _build_cors_prelight_response()
    elif request.method == "POST":
        dicts = {}
        output = request.get_json()
        idclient = output["word"]
        r = predres(idclient)
        print(r)
        r = str(r)

        dicts.update({"res" : r} )
        return _corsify_actual_response(jsonify(dicts))
    else :
        raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))

@app.route("/", methods=["POST", "OPTIONS"])
def api_create_order():
    print("welcome")
    dicts = {}
    dicts.update({"res" : "welcome"} )
    return _corsify_actual_response(jsonify(dicts))

def _build_cors_prelight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


if __name__ == "__main__":
    app.run()
