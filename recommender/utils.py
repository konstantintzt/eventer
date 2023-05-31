from typing import Union, Optional, TypedDict, List
import torch as t
from sentence_transformers import SentenceTransformer, util
import numpy as np

class eventType(TypedDict):
    date: Optional[int]
    organizer: str
    zip_code: str
    uuid: str
    description: str
    title: str
    type: int
eventList = List[eventType]

from collections import defaultdict
import pgeocode, copy

def get_location(zip_code: str):
    query = pgeocode.Nominatim('us').query_postal_code(str(zip_code))
    location = query['place_name'] + ', ' + query['county_name']
    return location

def compare(model, item1: str, item2: str):
    return t.diagonal(util.pytorch_cos_sim(model.encode(item1, convert_to_tensor=True), 
                                model.encode(item2, convert_to_tensor=True)))
def get_scores(model, history: eventList, available: eventList):
    scores = defaultdict(lambda: 0)
    weights = {"title": 1,
            "organizer": 1,
            "zip_code": 0.5,
            "description": 3,
            "type": 0.5}
    event_types = ["Concert", "Play", "Movie Screening", 'Sports game', "Party"]
    batch_1, batch_2 = [], []

    for available_event in available:
        available_event["type"], available_event["zip_code"] = event_types[available_event["type"]-1], get_location(available_event["zip_code"])
    for history_event in history:
        history_event["type"], history_event["zip_code"] = event_types[history_event["type"]-1], get_location(history_event["zip_code"])

    for available_event in available:
        for history_event in history:
            batch_1.extend([available_event[key] for key in weights])
            batch_2.extend([history_event[key] for key in weights])
    #   a1h1, a1h2, a1h3... a2h1
    raw = compare(model, batch_1, batch_2)
    scores = defaultdict(lambda: 0)

    for i in range(len(available)):
        uuid = available[i]["uuid"]
        for j in range(len(history)):
            for k in range(len(weights)):
                scores[uuid] += raw[i*len(history)*len(weights) + j*len(weights) + k].item() * list(weights.values())[k]
    return scores
