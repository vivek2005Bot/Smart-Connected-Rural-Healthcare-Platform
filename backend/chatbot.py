from flask import Flask, render_template, request, jsonify
import sqlite3
from datetime import datetime
import os

app = Flask(__name__, 
    template_folder='../chatbot/templates',
    static_folder='../chatbot/static'
)

def init_db():
    # Ensure the database file exists
    db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'chatbot.db')
    
    # Delete the database file if it exists and is corrupted
    if os.path.exists(db_path):
        try:
            # Try to connect to the database to check if it's corrupted
            conn = sqlite3.connect(db_path)
            conn.close()
            print(f"Database exists and is not corrupted: {db_path}")
        except sqlite3.DatabaseError:
            # If there's an error, the database is corrupted, so delete it
            print(f"Database is corrupted, deleting: {db_path}")
            os.remove(db_path)
    
    # Create a new database file
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    
    # Create the appointments table if it doesn't exist
    c.execute('''
        CREATE TABLE IF NOT EXISTS appointments
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
         name TEXT NOT NULL,
         gender TEXT NOT NULL,
         age TEXT NOT NULL,
         address TEXT NOT NULL,
         email TEXT NOT NULL,
         contact TEXT NOT NULL,
         appointment_number INTEGER NOT NULL,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
    ''')
    
    conn.commit()
    conn.close()
    print(f"Database initialized at: {db_path}")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/disease')
def disease():
    return render_template('disease.html')

@app.route('/book-appointment', methods=['POST'])
def book_appointment():
    try:
        data = request.json
        if not data or 'answers' not in data or 'appointmentNumber' not in data:
            return jsonify({"status": "error", "message": "Invalid request data"}), 400
            
        answers = data['answers']
        appointment_number = data['appointmentNumber']
        
        if len(answers) < 6:  # Updated to check for 6 answers (including gender)
            return jsonify({"status": "error", "message": "Incomplete user information"}), 400
        
        # Use the absolute path for the database
        db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'chatbot.db')
        conn = sqlite3.connect(db_path)
        c = conn.cursor()
        
        c.execute('''
            INSERT INTO appointments 
            (name, gender, age, address, email, contact, appointment_number)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (answers[0], answers[1], answers[2], answers[3], answers[4], answers[5], appointment_number))
        
        conn.commit()
        return jsonify({"status": "success", "message": "Appointment booked successfully"})
    except Exception as e:
        print(f"Error booking appointment: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500
    finally:
        if 'conn' in locals():
            conn.close()

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
