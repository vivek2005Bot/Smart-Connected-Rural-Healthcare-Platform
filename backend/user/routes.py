from flask import Blueprint, jsonify, request, current_app
from flask_cors import CORS, cross_origin
from .models import User, Prediction
from auth import token_required
import joblib
import numpy as np

user_bp = Blueprint('user', __name__)
CORS(user_bp)

@user_bp.route('/api/auth/signup', methods=['POST'])
def signup():
    return User().signup()

@user_bp.route('/user/signout')
def signout():
  return User().signout()

@user_bp.route('/api/auth/login', methods=['POST'])
def login():
    return User().login()

@user_bp.route('/api/user/profile', methods=['GET'])
@token_required
def get_profile(current_user):
    return User().get_profile(current_user['_id'])

@user_bp.route('/api/auth/verify-token', methods=['GET'])
@token_required
def verify_token(current_user):
    return jsonify({
        'user': {
            'id': current_user['_id'],
            'name': current_user['name'],
            'email': current_user['email']
        }
    }), 200

@user_bp.route('/user/predict', methods=['POST', 'OPTIONS'])
def predict():
    if request.method == 'OPTIONS':
        response = current_app.make_default_options_response()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response

    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data received'}), 400

        symptoms = data.get('symptoms', '')
        additional_info = data.get('additional_info', '')

        print(f"Processing prediction request - Symptoms: {symptoms}")
        print(f"Additional Info: {additional_info}")

        # Mock response with structured data
        response_data = {
            'predicted_disease': 'Common Cold',
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

        response = jsonify(response_data)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    except Exception as e:
        print(f"Error in predict route: {str(e)}")
        return jsonify({'error': str(e)}), 500