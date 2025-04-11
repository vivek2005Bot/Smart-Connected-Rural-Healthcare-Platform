from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models.user import User
from app import mongo

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Check if user already exists
    if mongo.db.users.find_one({'email': data['email']}):
        return jsonify({'message': 'User already exists'}), 400
    
    # Create new user
    user = User(
        email=data['email'],
        password=data['password'],
        role=data['role'],
        name=data.get('name'),
        phone=data.get('phone'),
        specialization=data.get('specialization')
    )
    
    # Insert user into database
    mongo.db.users.insert_one(user.to_dict())
    
    return jsonify({'message': 'User registered successfully'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    # Find user
    user_data = mongo.db.users.find_one({'email': data['email']})
    if not user_data:
        return jsonify({'message': 'User not found'}), 404
    
    user = User.from_dict(user_data)
    
    # Verify password
    if not user.verify_password(data['password']):
        return jsonify({'message': 'Invalid password'}), 401
    
    # Create access token
    access_token = create_access_token(identity={
        'email': user.email,
        'role': user.role
    })
    
    return jsonify({
        'access_token': access_token,
        'user': {
            'email': user.email,
            'role': user.role,
            'name': user.name
        }
    }), 200

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    current_user = get_jwt_identity()
    user_data = mongo.db.users.find_one({'email': current_user['email']})
    
    if not user_data:
        return jsonify({'message': 'User not found'}), 404
    
    user = User.from_dict(user_data)
    return jsonify(user.to_dict()), 200 