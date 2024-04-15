from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

import pandas as pd
import numpy as np
import json
import re
import csv
from tqdm import tqdm

data = []

with open("../booksummaries.txt", 'r',encoding='utf-8') as f:
    reader = csv.reader(f, dialect='excel-tab')
    for row in tqdm(reader):
        data.append(row)

book_id = []
book_name = []
genre = []
summary=[]

for i in tqdm(data):
    book_id.append(i[0])
    book_name.append(i[2])
    genre.append(i[5])
    summary.append(i[6][:200])


books = pd.DataFrame({'book_id': book_id, 'book_name': book_name,
                       'genre': genre, 'summary':summary})

books.drop(books[books['genre']==''].index, inplace=True)
genres = []
for i in books['genre']:
    genres.append(list(json.loads(i).values()))
books['genre_new'] = genres
def filter_books(books, genre):
    filtered = []
    for index, book in books.iterrows():
        if genre in book['genre_new']:
            filtered.append({'book_name': book['book_name'], 'summary': book['summary'], 'genre':book['genre_new']})
    return filtered



suggested_books = []

@app.route('/suggested-books', methods=['POST'])
def calculate_suggested_books():
    genre_counts = {}
    userbooks = request.get_json()
    for book in userbooks:
        for genre in book['genre']:
            genre_counts[genre] = genre_counts.get(genre, 0) + 1
    most_common_genre = max(genre_counts, key=genre_counts.get)
    suggested_books = filter_books(userbooks, most_common_genre)
    return jsonify({'message': 'Suggested books calculated'})

@app.route('/suggested-books', methods=['GET'])
def get_suggested_books():
    return jsonify(suggested_books)

if __name__ == '__main__':
    app.run(debug=True)
