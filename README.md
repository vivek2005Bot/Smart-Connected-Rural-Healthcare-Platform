# Smart Healthcare Backend

A Flask-based backend for a smart healthcare application with features for patients and doctors.

## Features

- User Authentication (Login/Register)
- Role-based access (Doctor/Patient)
- Appointment Booking System
- Chatbot Support
- Emergency Request System

## Setup

1. Install MongoDB on your system
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the root directory with the following variables:
   ```
   MONGO_URI=mongodb://localhost:27017/healthcare_db
   JWT_SECRET_KEY=your-secret-key
   ```

5. Run the application:
   ```bash
   python backend/app.py
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Appointments
- `POST /api/appointments` - Create a new appointment
- `GET /api/appointments` - Get all appointments
- `PUT /api/appointments/<id>` - Update appointment status

### Chat
- `POST /api/chat/messages` - Send a message to chatbot
- `GET /api/chat/messages` - Get chat history

### Emergency
- `POST /api/emergency` - Create emergency request
- `GET /api/emergency` - Get emergency requests
- `PUT /api/emergency/<id>` - Update emergency request status

## Database Schema

### Users
```json
{
  "email": "string",
  "password": "string",
  "role": "string",
  "name": "string",
  "phone": "string",
  "specialization": "string",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### Appointments
```json
{
  "patient_id": "string",
  "doctor_id": "string",
  "date": "date",
  "time": "string",
  "status": "string",
  "reason": "string",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### Chat Messages
```json
{
  "user_id": "string",
  "message": "string",
  "is_bot": "boolean",
  "timestamp": "datetime"
}
```

### Emergency Requests
```json
{
  "patient_id": "string",
  "description": "string",
  "location": "string",
  "status": "string",
  "priority": "string",
  "created_at": "datetime",
  "updated_at": "datetime"
}
``` 