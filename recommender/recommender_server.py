from sentence_transformers import SentenceTransformer
from flask import Flask, redirect, url_for, request
import numpy as np
from utils import get_scores, get_location, compare
model = SentenceTransformer('all-MiniLM-L6-v2')
app = Flask(__name__)
print("Model initialized.")

import os
from dotenv import load_dotenv
load_dotenv()
PORT = os.getenv('PORT')

@app.route('/recommend',methods = ['POST'])
def recommend():
   if request.method == 'POST':
        history = request.json["history"]
        available = request.json["available"]
        scores = get_scores(model, history, available)
        return scores

app.run(port=PORT)