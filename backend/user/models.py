from flask import Flask, jsonify, request, session, redirect
from passlib.hash import pbkdf2_sha256
from auth import db, create_token
import uuid
import datetime

class User:

  def start_session(self, user):
    del user['password']
    session['logged_in'] = True
    session['user'] = user
    return jsonify(user), 200

  def signup(self):
    try:
      data = request.get_json()
      
      # Validate input
      if not all(key in data for key in ['name', 'email', 'password']):
        return jsonify({'error': 'Missing required fields'}), 400

      # Create the user object
      user = {
        "_id": uuid.uuid4().hex,
        "name": data['name'],
        "email": data['email'],
        "password": pbkdf2_sha256.encrypt(data['password'])
      }

      # Check for existing email address
      if db.users.find_one({"email": user['email']}):
        return jsonify({'error': 'Email address already in use'}), 400

      # Insert the user
      if db.users.insert_one(user):
        # Create access token
        token = create_token(user['_id'])
        return jsonify({
          'token': token,
          'user': {
            'id': user['_id'],
            'name': user['name'],
            'email': user['email']
          }
        }), 200

      return jsonify({'error': 'Signup failed'}), 400
    
    except Exception as e:
      return jsonify({'error': str(e)}), 500
  
  def signout(self):
    session.clear()
    return redirect('/')
  
  def login(self):
    try:
      data = request.get_json()

      # Validate input
      if not all(key in data for key in ['email', 'password']):
        return jsonify({'error': 'Missing required fields'}), 400

      user = db.users.find_one({"email": data['email']})

      if user and pbkdf2_sha256.verify(data['password'], user['password']):
        token = create_token(user['_id'])
        return jsonify({
          'token': token,
          'user': {
            'id': user['_id'],
            'name': user['name'],
            'email': user['email']
          }
        }), 200

      return jsonify({'error': 'Invalid login credentials'}), 401

    except Exception as e:
      return jsonify({'error': str(e)}), 500

  def get_profile(self, user_id):
    try:
      user = db.users.find_one({"_id": user_id})
      if user:
        return jsonify({
          'user': {
            'id': user['_id'],
            'name': user['name'],
            'email': user['email']
          }
        }), 200
      return jsonify({'error': 'User not found'}), 404
    
    except Exception as e:
      return jsonify({'error': str(e)}), 500

class Prediction:
    def __init__(self):
        self.diseases = {
            'Common Cold': {
                'description': 'A viral infection of the upper respiratory tract causing inflammation of the nose and throat.',
                'medications': [
                    'Acetaminophen (Tylenol) for fever and pain',
                    'Decongestants for nasal congestion',
                    'Antihistamines for runny nose',
                    'Cough suppressants for persistent cough'
                ],
                'diet': [
                    'Drink plenty of warm fluids',
                    'Consume vitamin C rich foods like citrus fruits',
                    'Have chicken soup or clear broths',
                    'Honey with warm water or tea',
                    'Ginger tea for immunity'
                ],
                'precautions': [
                    'Get adequate rest',
                    'Stay hydrated',
                    'Use a humidifier',
                    'Gargle with warm salt water',
                    'Avoid cold beverages'
                ]
            }
            # Add more diseases here
        }

    def predict_disease(self, symptoms, additional_info=''):
        try:
            # Log the prediction request
            print(f"Processing prediction for symptoms: {symptoms}")
            print(f"Additional info: {additional_info}")

            # For now, return Common Cold as a mock prediction
            # In a real implementation, this would use ML model
            prediction = {
                'predicted_disease': 'Common Cold',
                **self.diseases['Common Cold']
            }

            # Save prediction to database
            prediction_record = {
                "_id": uuid.uuid4().hex,
                "symptoms": symptoms,
                "additional_info": additional_info,
                "prediction": prediction,
                "timestamp": datetime.datetime.now()
            }
            db.predictions.insert_one(prediction_record)

            return prediction

        except Exception as e:
            print(f"Error in predict_disease: {str(e)}")
            raise e

    def get_prediction_history(self, limit=10):
        try:
            predictions = list(db.predictions.find().sort("timestamp", -1).limit(limit))
            for p in predictions:
                p['_id'] = str(p['_id'])
                p['timestamp'] = p['timestamp'].isoformat()
            return predictions
        except Exception as e:
            print(f"Error in get_prediction_history: {str(e)}")
            raise e