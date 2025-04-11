from pymongo import MongoClient
import os

def get_database():
    MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/smart_healthcare')
    try:
        client = MongoClient(MONGO_URI)
        db = client.get_database()
        print("Connected to MongoDB successfully!")
        return db
    except Exception as e:
        print("Failed to connect to MongoDB:", str(e))
        raise e

mongo = get_database() 