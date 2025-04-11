from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.appointment import Appointment
from config.database import mongo
from datetime import datetime, timedelta

appointments_bp = Blueprint('appointments', __name__)

@appointments_bp.route('/', methods=['POST'])
@jwt_required()
def create_appointment():
    current_user = get_jwt_identity()
    data = request.get_json()
    
    # Create new appointment
    appointment = Appointment(
        patient_id=current_user['email'],
        doctor_id=data['doctor_id'],
        date=data['date'],
        time=data['time'],
        reason=data.get('reason')
    )
    
    # Insert appointment into database
    mongo.db.appointments.insert_one(appointment.to_dict())
    
    return jsonify({'message': 'Appointment created successfully'}), 201

@appointments_bp.route('/', methods=['GET'])
@jwt_required()
def get_appointments():
    current_user = get_jwt_identity()
    
    # Get appointments based on user role
    if current_user['role'] == 'doctor':
        appointments = list(mongo.db.appointments.find({'doctor_id': current_user['email']}))
    else:
        appointments = list(mongo.db.appointments.find({'patient_id': current_user['email']}))
    
    return jsonify([Appointment.from_dict(app).to_dict() for app in appointments]), 200

@appointments_bp.route('/<appointment_id>', methods=['PUT'])
@jwt_required()
def update_appointment(appointment_id):
    current_user = get_jwt_identity()
    data = request.get_json()
    
    # Find appointment
    appointment = mongo.db.appointments.find_one({'_id': appointment_id})
    if not appointment:
        return jsonify({'message': 'Appointment not found'}), 404
    
    # Check if user has permission to update
    if current_user['role'] == 'patient' and appointment['patient_id'] != current_user['email']:
        return jsonify({'message': 'Unauthorized'}), 403
    
    # Update appointment
    mongo.db.appointments.update_one(
        {'_id': appointment_id},
        {'$set': {
            'status': data.get('status', appointment['status']),
            'updated_at': datetime.utcnow()
        }}
    )
    
    return jsonify({'message': 'Appointment updated successfully'}), 200

@appointments_bp.route('/doctor', methods=['GET'])
@jwt_required()
def get_doctor_appointments():
    current_user = get_jwt_identity()
    
    # Get query parameters for filtering
    status = request.args.get('status', 'all')
    date = request.args.get('date')
    
    # Build query
    query = {'doctor_id': current_user['email']}
    if status != 'all':
        query['status'] = status
    if date:
        query['appointment_time'] = {
            '$gte': datetime.strptime(date, '%Y-%m-%d'),
            '$lt': datetime.strptime(date, '%Y-%m-%d') + timedelta(days=1)
        }
    
    # Get appointments
    appointments = list(mongo.db.appointments.find(query).sort('appointment_time', 1))
    
    return jsonify([Appointment.from_dict(appt).to_dict() for appt in appointments]), 200

@appointments_bp.route('/<appointment_id>/status', methods=['PUT'])
@jwt_required()
def update_appointment_status(appointment_id):
    current_user = get_jwt_identity()
    data = request.get_json()
    
    # Validate status
    valid_statuses = ['pending', 'confirmed', 'cancelled', 'completed']
    if data['status'] not in valid_statuses:
        return jsonify({'error': 'Invalid status'}), 400
    
    # Update appointment
    result = mongo.db.appointments.update_one(
        {'_id': appointment_id, 'doctor_id': current_user['email']},
        {
            '$set': {
                'status': data['status'],
                'updated_at': datetime.utcnow()
            }
        }
    )
    
    if result.modified_count == 0:
        return jsonify({'error': 'Appointment not found or unauthorized'}), 404
    
    return jsonify({'message': 'Appointment status updated successfully'}), 200

@appointments_bp.route('/stats', methods=['GET'])
@jwt_required()
def get_appointment_stats():
    current_user = get_jwt_identity()
    
    # Get total appointments
    total = mongo.db.appointments.count_documents({'doctor_id': current_user['email']})
    
    # Get pending appointments
    pending = mongo.db.appointments.count_documents({
        'doctor_id': current_user['email'],
        'status': 'pending'
    })
    
    # Get confirmed appointments
    confirmed = mongo.db.appointments.count_documents({
        'doctor_id': current_user['email'],
        'status': 'confirmed'
    })
    
    # Get today's appointments
    today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
    today_appointments = mongo.db.appointments.count_documents({
        'doctor_id': current_user['email'],
        'appointment_time': {
            '$gte': today,
            '$lt': today + timedelta(days=1)
        }
    })
    
    return jsonify({
        'total': total,
        'pending': pending,
        'confirmed': confirmed,
        'today': today_appointments
    }), 200 