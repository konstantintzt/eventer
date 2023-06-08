from pymongo_getdb import get_database

import time, json

def load_event_db(db):
    sample_event = open("sample_event.json", "r")
    events = json.load(sample_event)
    db["events"].insert_many(events)
    sample_event.close()

if __name__ == "__main__":
	db = get_database()
	load_event_db(db)