from datetime import datetime
from bson import ObjectId

class ChatMessage:
    def __init__(self, user_id, message, is_bot=False, timestamp=None, session_id=None):
        self.user_id = user_id
        self.message = message
        self.is_bot = is_bot
        self.timestamp = timestamp or datetime.utcnow()
        self.session_id = session_id

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'message': self.message,
            'is_bot': self.is_bot,
            'timestamp': self.timestamp,
            'session_id': self.session_id
        }

    @staticmethod
    def from_dict(data):
        chat = ChatMessage(
            user_id=data['user_id'],
            message=data['message'],
            is_bot=data.get('is_bot', False),
            timestamp=data.get('timestamp'),
            session_id=data.get('session_id')
        )
        if '_id' in data:
            chat._id = data['_id']
        return chat

class ChatSession:
    def __init__(self, user_id, status='active', created_at=None, current_step=None, appointment_data=None):
        self.user_id = user_id
        self.status = status
        self.created_at = created_at or datetime.utcnow()
        self.current_step = current_step or 'welcome'
        self.appointment_data = appointment_data or {}

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'status': self.status,
            'created_at': self.created_at,
            'current_step': self.current_step,
            'appointment_data': self.appointment_data
        }

    @staticmethod
    def from_dict(data):
        session = ChatSession(
            user_id=data['user_id'],
            status=data.get('status', 'active'),
            created_at=data.get('created_at'),
            current_step=data.get('current_step', 'welcome'),
            appointment_data=data.get('appointment_data', {})
        )
        if '_id' in data:
            session._id = data['_id']
        return session 