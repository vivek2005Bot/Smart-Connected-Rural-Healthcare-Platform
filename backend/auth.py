from flask import jsonify
import jwt
from functools import wraps
from pymongo import MongoClient
from datetime import datetime, timedelta
from flask import request

# MongoDB setup
client = MongoClient('mongodb://localhost:27017/')
db = client.healthcare_db

# JWT Configuration
SECRET_KEY = 'your-secret-key'  # Change this to a secure secret key in production
TOKEN_EXPIRATION = 24  # hours

def create_token(user_id):
    try:
        payload = {
            'exp': datetime.utcnow() + timedelta(hours=TOKEN_EXPIRATION),
            'iat': datetime.utcnow(),
            'sub': user_id
        }
        return jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    except Exception as e:
        return str(e)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(' ')[1]
        
        if not token:
            return jsonify({'error': 'Token is missing'}), 401
            
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            current_user = db.users.find_one({'_id': data['sub']})
            if not current_user:
                return jsonify({'error': 'Invalid token'}), 401
        except:
            return jsonify({'error': 'Invalid token'}), 401

        return f(current_user, *args, **kwargs)
    return decorated 