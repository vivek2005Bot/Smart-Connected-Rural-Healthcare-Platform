from flask import Blueprint
from flask_cors import CORS

# Create blueprint
user_bp = Blueprint('user', __name__)

# Enable CORS
CORS(user_bp, resources={r"/*": {"origins": "*"}})

# Import routes after blueprint creation to avoid circular imports
from . import routes, models
