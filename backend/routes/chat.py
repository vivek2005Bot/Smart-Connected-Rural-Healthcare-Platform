from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.chat import ChatMessage
from config.database import mongo

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/messages', methods=['POST'])
@jwt_required()
def send_message():
    current_user = get_jwt_identity()
    data = request.get_json()
    
    # Create user message
    user_message = ChatMessage(
        user_id=current_user['email'],
        message=data['message']
    )
    
    # Insert user message
    mongo.db.chat_messages.insert_one(user_message.to_dict())
    
    # TODO: Implement chatbot response logic here
    # For now, we'll just return a simple response
    bot_response = ChatMessage(
        user_id=current_user['email'],
        message="I'm a simple chatbot. More advanced features will be implemented later.",
        is_bot=True
    )
    
    # Insert bot response
    mongo.db.chat_messages.insert_one(bot_response.to_dict())
    
    return jsonify(bot_response.to_dict()), 200

@chat_bp.route('/messages', methods=['GET'])
@jwt_required()
def get_messages():
    current_user = get_jwt_identity()
    
    # Get chat history for the user
    messages = list(mongo.db.chat_messages.find(
        {'user_id': current_user['email']}
    ).sort('timestamp', -1).limit(50))
    
    return jsonify([ChatMessage.from_dict(msg).to_dict() for msg in messages]), 200 