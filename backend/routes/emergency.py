from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.emergency import EmergencyRequest
from config.database import mongo
from datetime import datetime

emergency_bp = Blueprint('emergency', __name__)

@emergency_bp.route('/', methods=['POST'])
@jwt_required()
def create_emergency():
    current_user = get_jwt_identity()
    data = request.get_json()
    
    # Create new emergency request
    emergency = EmergencyRequest(
        patient_id=current_user['email'],
        description=data['description'],
        location=data['location'],
        priority=data.get('priority', 'medium')
    )
    
    # Insert emergency request into database
    mongo.db.emergencies.insert_one(emergency.to_dict())
    
    return jsonify({'message': 'Emergency request created successfully'}), 201

@emergency_bp.route('/', methods=['GET'])
@jwt_required()
def get_emergencies():
    current_user = get_jwt_identity()
    
    # Get emergencies based on user role
    if current_user['role'] == 'doctor':
        emergencies = list(mongo.db.emergencies.find().sort('priority', -1))
    else:
        emergencies = list(mongo.db.emergencies.find(
            {'patient_id': current_user['email']}
        ).sort('created_at', -1))
    
    return jsonify([EmergencyRequest.from_dict(emergency).to_dict() for emergency in emergencies]), 200

@emergency_bp.route('/<emergency_id>', methods=['PUT'])
@jwt_required()
def update_emergency(emergency_id):
    current_user = get_jwt_identity()
    data = request.get_json()
    
    # Find emergency request
    emergency = mongo.db.emergencies.find_one({'_id': emergency_id})
    if not emergency:
        return jsonify({'message': 'Emergency request not found'}), 404
    
    # Check if user has permission to update
    if current_user['role'] == 'patient' and emergency['patient_id'] != current_user['email']:
        return jsonify({'message': 'Unauthorized'}), 403
    
    # Update emergency request
    mongo.db.emergencies.update_one(
        {'_id': emergency_id},
        {'$set': {
            'status': data.get('status', emergency['status']),
            'updated_at': datetime.utcnow()
        }}
    )
    
    return jsonify({'message': 'Emergency request updated successfully'}), 200 