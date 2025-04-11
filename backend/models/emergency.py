from datetime import datetime
from bson import ObjectId

class EmergencyRequest:
    def __init__(self, patient_id, description, location, status='pending', priority='medium'):
        self.patient_id = patient_id
        self.description = description
        self.location = location
        self.status = status  # pending, in_progress, resolved
        self.priority = priority  # low, medium, high
        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()

    def to_dict(self):
        return {
            'patient_id': self.patient_id,
            'description': self.description,
            'location': self.location,
            'status': self.status,
            'priority': self.priority,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    @staticmethod
    def from_dict(data):
        emergency = EmergencyRequest(
            patient_id=data['patient_id'],
            description=data['description'],
            location=data['location'],
            status=data.get('status', 'pending'),
            priority=data.get('priority', 'medium')
        )
        if '_id' in data:
            emergency._id = data['_id']
        return emergency 