from bson import ObjectId
from datetime import datetime
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash

class User:
    def __init__(self, email, password, name, role, phone=None, specialization=None):
        self.email = email
        self.password = password
        self.name = name
        self.role = role
        self.phone = phone
        self.specialization = specialization
        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()
    
    @staticmethod
    def find_by_email(email):
        client = MongoClient('mongodb://localhost:27017/')
        db = client['smart_healthcare']
        user_data = db.users.find_one({'email': email})
        if user_data:
            user = User(
                email=user_data['email'],
                password=user_data['password'],
                name=user_data['name'],
                role=user_data['role'],
                phone=user_data.get('phone'),
                specialization=user_data.get('specialization')
            )
            user.id = str(user_data['_id'])
            return user
        return None
    
    def save(self):
        client = MongoClient('mongodb://localhost:27017/')
        db = client['smart_healthcare']
        user_data = {
            'email': self.email,
            'password': self.password,
            'name': self.name,
            'role': self.role,
            'phone': self.phone,
            'specialization': self.specialization,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
        result = db.users.insert_one(user_data)
        self.id = str(result.inserted_id)
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'role': self.role,
            'phone': self.phone,
            'specialization': self.specialization,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

    @staticmethod
    def find_by_id(user_id):
        try:
            client = MongoClient('mongodb://localhost:27017/')
            db = client['smart_healthcare']
            user_data = db.users.find_one({'_id': ObjectId(user_id)})
            if user_data:
                user = User(
                    email=user_data['email'],
                    password=user_data['password'],
                    name=user_data['name'],
                    role=user_data['role'],
                    phone=user_data.get('phone'),
                    specialization=user_data.get('specialization')
                )
                user.id = str(user_data['_id'])
                return user
        except:
            return None
        return None

    @staticmethod
    def from_dict(data):
        user = User(
            email=data['email'],
            password=data['password'],
            name=data['name'],
            role=data['role'],
            phone=data.get('phone'),
            specialization=data.get('specialization')
        )
        if 'id' in data:
            user.id = data['id']
        return user 