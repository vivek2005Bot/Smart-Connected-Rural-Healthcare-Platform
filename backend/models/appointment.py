from datetime import datetime
from bson import ObjectId

class Appointment:
    def __init__(self, patient_name, patient_age, patient_email, patient_contact, 
                 condition, appointment_time, status='pending', doctor_id=None, 
                 created_at=None, updated_at=None):
        self.patient_name = patient_name
        self.patient_age = patient_age
        self.patient_email = patient_email
        self.patient_contact = patient_contact
        self.condition = condition
        self.appointment_time = appointment_time
        self.status = status
        self.doctor_id = doctor_id
        self.created_at = created_at or datetime.utcnow()
        self.updated_at = updated_at or datetime.utcnow()

    def to_dict(self):
        return {
            'patient_name': self.patient_name,
            'patient_age': self.patient_age,
            'patient_email': self.patient_email,
            'patient_contact': self.patient_contact,
            'condition': self.condition,
            'appointment_time': self.appointment_time,
            'status': self.status,
            'doctor_id': self.doctor_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    @staticmethod
    def from_dict(data):
        appointment = Appointment(
            patient_name=data['patient_name'],
            patient_age=data['patient_age'],
            patient_email=data['patient_email'],
            patient_contact=data['patient_contact'],
            condition=data['condition'],
            appointment_time=data['appointment_time'],
            status=data.get('status', 'pending'),
            doctor_id=data.get('doctor_id'),
            created_at=data.get('created_at'),
            updated_at=data.get('updated_at')
        )
        if '_id' in data:
            appointment._id = data['_id']
        return appointment 