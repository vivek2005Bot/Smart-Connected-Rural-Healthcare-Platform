# This file is intentionally empty to make the directory a Python package 

import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key'
    MONGODB_URI = os.environ.get('MONGODB_URI') or 'mongodb://localhost:27017/healthcare_db'
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'jwt-secret-key'
    DEBUG = True 