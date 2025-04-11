from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.chat import ChatMessage, ChatSession
from models.appointment import Appointment
from config.database import mongo
import uuid
import requests
import os
from datetime import datetime, timedelta
from dateutil import parser

chat_bp = Blueprint('chat', __name__)

def validate_appointment_data(data):
    required_fields = ['name', 'age', 'email', 'contact', 'address', 'time']
    for field in required_fields:
        if field not in data or not data[field]:
            return False, f"Missing or empty {field}"
    
    try:
        # Validate age
        age = int(data['age'])
        if age <= 0 or age > 120:
            return False, "Invalid age"
        
        # Validate email format (basic check)
        if '@' not in data['email'] or '.' not in data['email']:
            return False, "Invalid email format"
        
        # Validate contact number (basic check)
        if not data['contact'].isdigit() or len(data['contact']) < 10:
            return False, "Invalid contact number"
        
        # Validate appointment time
        try:
            appointment_time = parser.parse(data['time'])
            if appointment_time < datetime.now():
                return False, "Appointment time cannot be in the past"
        except:
            return False, "Invalid appointment time format. Please use YYYY-MM-DD HH:MM"
        
    except Exception as e:
        return False, str(e)
    
    return True, None

def generate_zoom_meeting_link():
    # This is a placeholder. In a real implementation, you would use the Zoom API
    meeting_id = "".join([str(uuid.uuid4().int)[:3] for _ in range(3)])
    return f"https://zoom.us/j/{meeting_id}"

def handle_appointment_booking(session, user_input):
    steps = {
        'name': 'Please enter your name:',
        'age': 'Please enter your age:',
        'email': 'Please enter your email address:',
        'contact': 'Please enter your contact number:',
        'address': 'Please enter your address:',
        'time': 'Please enter your preferred appointment time (YYYY-MM-DD HH:MM):',
        'complete': 'Thank you! Your appointment has been scheduled. We will send a confirmation email shortly.'
    }
    
    current_step = session.current_step
    if current_step not in steps:
        return "Invalid step in appointment booking process."
    
    if current_step != 'complete':
        # Store the user's input for the current step
        session.appointment_data[current_step] = user_input
        
        # Move to the next step
        next_step = list(steps.keys())[list(steps.keys()).index(current_step) + 1]
        session.current_step = next_step
        
        # Update session in database
        mongo.db.chat_sessions.update_one(
            {'_id': session._id},
            {'$set': {'current_step': next_step, 'appointment_data': session.appointment_data}}
        )
        
        # Return the prompt for the next step
        return steps[next_step]
    else:
        # Create and save the appointment
        try:
            appointment_time = parser.parse(session.appointment_data['time'])
            appointment = Appointment(
                patient_name=session.appointment_data['name'],
                patient_age=int(session.appointment_data['age']),
                patient_email=session.appointment_data['email'],
                patient_contact=session.appointment_data['contact'],
                address=session.appointment_data['address'],
                appointment_time=appointment_time,
                status='pending'
            )
            mongo.db.appointments.insert_one(appointment.to_dict())
            return steps['complete']
        except Exception as e:
            return f"Error scheduling appointment: {str(e)}"

@chat_bp.route('/start', methods=['POST'])
@jwt_required()
def start_chat():
    current_user = get_jwt_identity()
    
    # Create a new chat session
    session = ChatSession(user_id=current_user['email'])
    session_id = str(uuid.uuid4())
    session._id = session_id
    
    # Save session to database
    mongo.db.chat_sessions.insert_one(session.to_dict())
    
    # Send welcome message
    welcome_message = ChatMessage(
        user_id=current_user['email'],
        message="👋 Welcome to Smart Healthcare! I'm your virtual assistant.\n\nPlease select an option:\nFor online consultation, press 1\nFor appointment booking, press 2",
        is_bot=True,
        session_id=session_id
    )
    
    mongo.db.chat_messages.insert_one(welcome_message.to_dict())
    
    return jsonify(welcome_message.to_dict()), 200

@chat_bp.route('/messages', methods=['POST'])
@jwt_required()
def send_message():
    current_user = get_jwt_identity()
    data = request.get_json()
    
    if not data or 'message' not in data:
        return jsonify({'error': 'Message is required'}), 400
    
    # Get or create chat session
    session = mongo.db.chat_sessions.find_one({'user_id': current_user['email'], 'status': 'active'})
    if not session:
        return jsonify({'error': 'No active chat session. Please start a new chat.'}), 400
    
    session = ChatSession.from_dict(session)
    
    # Create user message
    user_message = ChatMessage(
        user_id=current_user['email'],
        message=data['message'],
        session_id=str(session._id)
    )
    
    # Insert user message
    mongo.db.chat_messages.insert_one(user_message.to_dict())
    
    # Process user input and generate bot response
    bot_response = None
    if session.current_step == 'welcome':
        if data['message'] == '1':
            # Generate Zoom meeting link for online consultation
            zoom_link = generate_zoom_meeting_link()
            bot_response = f"✅ Your online consultation has been scheduled!\n\nHere's your Zoom meeting link:\n{zoom_link}\n\nThe meeting will start in 5 minutes. Please click the link to join."
            session.status = 'completed'
        elif data['message'] == '2':
            session.current_step = 'name'
            bot_response = "Please enter your name:"
        else:
            bot_response = "❌ Invalid option. Please press:\n1 for online consultation\n2 for appointment booking"
    else:
        bot_response = handle_appointment_booking(session, data['message'])
    
    # Update session status if completed
    if session.status == 'completed' or session.current_step == 'complete':
        mongo.db.chat_sessions.update_one(
            {'_id': session._id},
            {'$set': {'status': 'completed'}}
        )
    
    # Create and save bot response
    bot_message = ChatMessage(
        user_id=current_user['email'],
        message=bot_response,
        is_bot=True,
        session_id=str(session._id)
    )
    
    mongo.db.chat_messages.insert_one(bot_message.to_dict())
    
    return jsonify(bot_message.to_dict()), 200

@chat_bp.route('/messages', methods=['GET'])
@jwt_required()
def get_messages():
    current_user = get_jwt_identity()
    
    # Get chat history for the user
    messages = list(mongo.db.chat_messages.find(
        {'user_id': current_user['email']}
    ).sort('timestamp', -1).limit(50))
    
    return jsonify([ChatMessage.from_dict(msg).to_dict() for msg in messages]), 200 