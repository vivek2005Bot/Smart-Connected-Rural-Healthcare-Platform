from datetime import datetime
from bson import ObjectId

class Appointment:
    def __init__(self, patient_id, doctor_id, date, time, status='pending', reason=None):
        self.patient_id = patient_id
        self.doctor_id = doctor_id
        self.date = date
        self.time = time
        self.status = status  # pending, confirmed, cancelled, completed
        self.reason = reason
        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()

    def to_dict(self):
        return {
            'patient_id': self.patient_id,
            'doctor_id': self.doctor_id,
            'date': self.date,
            'time': self.time,
            'status': self.status,
            'reason': self.reason,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    @staticmethod
    def from_dict(data):
        appointment = Appointment(
            patient_id=data['patient_id'],
            doctor_id=data['doctor_id'],
            date=data['date'],
            time=data['time'],
            status=data.get('status', 'pending'),
            reason=data.get('reason')
        )
        if '_id' in data:
            appointment._id = data['_id']
        return appointment 