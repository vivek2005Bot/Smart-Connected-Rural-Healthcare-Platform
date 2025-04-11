from datetime import datetime
from bson import ObjectId

class ChatMessage:
    def __init__(self, user_id, message, is_bot=False, timestamp=None):
        self.user_id = user_id
        self.message = message
        self.is_bot = is_bot
        self.timestamp = timestamp or datetime.utcnow()

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'message': self.message,
            'is_bot': self.is_bot,
            'timestamp': self.timestamp
        }

    @staticmethod
    def from_dict(data):
        chat = ChatMessage(
            user_id=data['user_id'],
            message=data['message'],
            is_bot=data.get('is_bot', False),
            timestamp=data.get('timestamp')
        )
        if '_id' in data:
            chat._id = data['_id']
        return chat 