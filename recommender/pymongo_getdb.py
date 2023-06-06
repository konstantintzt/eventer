from pymongo import MongoClient
def get_database():
    MONGO_URI="mongodb+srv://devteam:GxEiUVjchKjGLQUL@eventer-dev.kxbnt1x.mongodb.net/?retryWrites=true&w=majority"
    client = MongoClient(MONGO_URI)
    return client['eventer-dev']
  
if __name__ == "__main__":   
   dbname = get_database()