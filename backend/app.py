from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from datetime import timedelta
import os
from dotenv import load_dotenv
from config.database import mongo

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure CORS
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000", "http://localhost:5173"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# JWT Configuration
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'your-secret-key')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
jwt = JWTManager(app)

# Import routes
from routes.auth import auth_bp
from routes.appointments import appointments_bp
from routes.chat import chat_bp
from routes.emergency import emergency_bp

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(appointments_bp, url_prefix='/api/appointments')
app.register_blueprint(chat_bp, url_prefix='/api/chat')
app.register_blueprint(emergency_bp, url_prefix='/api/emergency')

if __name__ == '__main__':
    app.run(debug=True) 