from datetime import datetime
from bson import ObjectId
import bcrypt

class User:
    def __init__(self, email, password, role, name=None, phone=None, specialization=None):
        self.email = email
        self.password = self.hash_password(password)
        self.role = role  # 'doctor' or 'patient'
        self.name = name
        self.phone = phone
        self.specialization = specialization  # For doctors only
        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()

    @staticmethod
    def hash_password(password):
        return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    def verify_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password)

    def to_dict(self):
        return {
            'email': self.email,
            'role': self.role,
            'name': self.name,
            'phone': self.phone,
            'specialization': self.specialization,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    @staticmethod
    def from_dict(data):
        user = User(
            email=data['email'],
            password=data['password'],
            role=data['role'],
            name=data.get('name'),
            phone=data.get('phone'),
            specialization=data.get('specialization')
        )
        if '_id' in data:
            user._id = data['_id']
        return user 