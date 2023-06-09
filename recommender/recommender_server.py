print("Booting up recommendation engine...")
from sentence_transformers import SentenceTransformer
from flask import Flask, redirect, url_for, request
import numpy as np
from utils import get_scores, get_location, compare

model = SentenceTransformer('average_word_embeddings_glove.6B.300d')
app = Flask(__name__)
print("Model initialized.")

import os, operator, math, random
from dotenv import load_dotenv
load_dotenv("../server/.env")
PORT = os.getenv('ENGINE_PORT')

from pymongo_getdb import get_database

import time, json
def get_attended_and_available(db, uuid:str):
	past_event_ids = []
	for event in db["attendances"].find({'user':uuid}):
		past_event_ids.append(event["uuid"])
	past_events = []
	for past_event_id in past_event_ids:
		for event in db["events"].find({"uuid": past_event_id}):
			past_events.append(dict(event))
	available_events = [event for event in db["events"].find({"date": {'$gt': time.time() * 1000}})]
	return past_events, available_events

def replace_id(event):
	event["_id"] = str(event["_id"])
	event["likes"] = 0 if math.isnan(event["likes"]) else event["likes"]
	return event

def rename_property(events, old_name: str, new_name: str):
	for event in events:
		event[new_name] = event[old_name]
		del event[old_name]
	return events

def retrieve_likes(db, events, uuid:str):
	for like in db["likes"].find({"user": uuid}):
		for event in events:
			if event["uuid"] == like["uuid"]:
				event["liked"] = 1
	return events

@app.route('/recommend',methods = ['POST'])
def recommend():
	# Fixed bug with server always returning status 400
	if request.method == 'POST':
		uuid = json.loads(request.data.decode())["uuid"]
		db = get_database()
		# four collections available: events, users, likes, attendances	
		attended, available = get_attended_and_available(db, uuid)

		attended = rename_property(attended, "zip", "zip_code")
		available = rename_property(available, "zip", "zip_code")	
		if len(attended) == 0:
			return {"ordered_events": [replace_id(i) for i in random.sample(available, len(available))]}
		else:
			available = retrieve_likes(db, available, uuid)

			scores = get_scores(model, attended, available)
			sorted_idxs = sorted(scores, key=scores.get, reverse=True)
			sorted_events = []
			for event_id in sorted_idxs:
				sorted_events.append([replace_id(i) for i in available if i["uuid"] == event_id][0])
			# print(sorted_events)
			return {"ordered_events": sorted_events}

app.run(port=PORT)