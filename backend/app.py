from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
import os
import re
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from dotenv import load_dotenv
from functools import wraps
import time
from collections import defaultdict

load_dotenv()

app = Flask(__name__)

CORS(app, origins=["http://localhost:5173", "http://localhost:3000", "http://localhost:8080", "http://127.0.0.1:5173"])

request_counts = defaultdict(list)
RATE_LIMIT = 5
RATE_WINDOW = 60

def rate_limit(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        client_ip = request.remote_addr
        current_time = time.time()
        
        request_counts[client_ip] = [
            timestamp for timestamp in request_counts[client_ip]
            if current_time - timestamp < RATE_WINDOW
        ]
        
        if len(request_counts[client_ip]) >= RATE_LIMIT:
            return jsonify({
                "success": False,
                "message": "Too many requests. Please try again later."
            }), 429
        
        request_counts[client_ip].append(current_time)
        return f(*args, **kwargs)
    return decorated_function

def validate_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def sanitize_input(text):
    if not text:
        return ""
    text = str(text).strip()
    text = re.sub(r'[\r\n]', ' ', text)
    text = re.sub(r'[{}<>]', '', text)
    return text[:1000]

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy"}), 200

@app.route('/contact', methods=['POST'])
@rate_limit
def contact():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                "success": False,
                "message": "Invalid request format."
            }), 400
        
        name = sanitize_input(data.get('name', ''))
        email = sanitize_input(data.get('email', ''))
        subject = sanitize_input(data.get('subject', ''))
        message = sanitize_input(data.get('message', ''))
        
        if not name or not email or not subject or not message:
            return jsonify({
                "success": False,
                "message": "All fields are required."
            }), 400
        
        if not validate_email(email):
            return jsonify({
                "success": False,
                "message": "Please provide a valid email address."
            }), 400
        
        if len(message) < 10:
            return jsonify({
                "success": False,
                "message": "Message must be at least 10 characters long."
            }), 400
        
        email_address = os.getenv('EMAIL_ADDRESS')
        email_password = os.getenv('EMAIL_PASSWORD')
        
        if not email_address or not email_password:
            return jsonify({
                "success": False,
                "message": "Email configuration is missing."
            }), 500
        
        msg = MIMEMultipart()
        msg['From'] = email_address
        msg['To'] = email_address
        msg['Subject'] = f"Portfolio Contact | {subject}"
        
        current_time = datetime.now()
        email_body = f"""New Portfolio Contact

Name: {name}
Email: {email}
Subject: {subject}

Message:
{message}

---
Date: {current_time.strftime('%Y-%m-%d')}
Time: {current_time.strftime('%H:%M:%S')}
IP Address: {request.remote_addr}
"""
        
        msg.attach(MIMEText(email_body, 'plain'))
        
        try:
            server = smtplib.SMTP('smtp.gmail.com', 587)
            server.starttls()
            server.login(email_address, email_password)
            server.sendmail(email_address, email_address, msg.as_string())
            server.quit()
        except smtplib.SMTPAuthenticationError:
            return jsonify({
                "success": False,
                "message": "Email authentication failed. Please check credentials."
            }), 500
        except smtplib.SMTPException as e:
            return jsonify({
                "success": False,
                "message": f"Failed to send email: {str(e)}"
            }), 500
        
        return jsonify({
            "success": True,
            "message": "Message sent successfully!"
        }), 200
        
    except Exception as e:
        return jsonify({
            "success": False,
            "message": "An error occurred. Please try again later."
        }), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(debug=os.getenv('FLASK_DEBUG', 'False').lower() == 'true', host='0.0.0.0', port=port)
