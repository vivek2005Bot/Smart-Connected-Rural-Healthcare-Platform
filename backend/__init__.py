from flask import Flask
from flask_cors import CORS
from config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    CORS(app)

    # Initialize extensions
    from auth import db
    
    # Register blueprints
    from user.routes import user_bp
    app.register_blueprint(user_bp, url_prefix='/user')

    @app.route('/')
    def index():
        return {'status': 'API is running'}

    return app 