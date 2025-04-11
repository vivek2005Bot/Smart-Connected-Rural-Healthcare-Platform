from flask import Flask, request, jsonify
from flask_cors import CORS
from functools import wraps
import jwt
import datetime

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'your-secret-key'  # Change this in production

# Mock user database
users = {}

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(' ')[1]
        
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = users.get(data['email'])
            if not current_user:
                raise Exception('User not found')
        except:
            return jsonify({'message': 'Token is invalid'}), 401
        
        return f(current_user, *args, **kwargs)
    return decorated

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if not all(k in data for k in ('name', 'email', 'password', 'role')):
        return jsonify({'message': 'Missing required fields'}), 400
    
    if data['email'] in users:
        return jsonify({'message': 'User already exists'}), 400
    
    users[data['email']] = {
        'id': str(len(users) + 1),
        'name': data['name'],
        'email': data['email'],
        'password': data['password'],  # In production, hash this!
        'role': data['role']
    }
    
    token = jwt.encode({
        'email': data['email'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)
    }, app.config['SECRET_KEY'])
    
    return jsonify({
        'token': token,
        'user': {
            'id': users[data['email']]['id'],
            'name': data['name'],
            'email': data['email'],
            'role': data['role']
        }
    })

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not all(k in data for k in ('email', 'password')):
        return jsonify({'message': 'Missing required fields'}), 400
    
    user = users.get(data['email'])
    if not user or user['password'] != data['password']:  # In production, verify hash!
        return jsonify({'message': 'Invalid credentials'}), 401
    
    token = jwt.encode({
        'email': data['email'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)
    }, app.config['SECRET_KEY'])
    
    return jsonify({
        'token': token,
        'user': {
            'id': user['id'],
            'name': user['name'],
            'email': user['email'],
            'role': user['role']
        }
    })

@app.route('/api/auth/verify', methods=['GET'])
@token_required
def verify(current_user):
    return jsonify({
        'user': {
            'id': current_user['id'],
            'name': current_user['name'],
            'email': current_user['email'],
            'role': current_user['role']
        }
    })

if __name__ == '__main__':
    app.run(port=5000, debug=True) 