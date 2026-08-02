# Portfolio Contact API

A Flask-based backend API for handling contact form submissions with Gmail SMTP.

## Features

- Send contact form emails to your Gmail inbox
- Input validation and sanitization
- Rate limiting (5 requests per minute per IP)
- CORS enabled for frontend integration
- Environment variable configuration
- Comprehensive error handling

## Prerequisites

- Python 3.8+
- Gmail account with 2-Factor Authentication enabled
- Gmail App Password

## Setup Instructions

### 1. Enable Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification** (enable if not already)
3. Scroll down to **App passwords**
4. Select **Mail** as the app and **Other (Custom name)** as the device
5. Name it "Portfolio Contact" and click **Generate**
6. Copy the 16-character app password (e.g., `abcd efgh ijkl mnop`)
7. Remove spaces: `abcdefghijklmnop`

### 2. Clone and Setup Backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
```

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
EMAIL_ADDRESS=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
FLASK_DEBUG=False
PORT=5000
```

### 4. Run the Server

```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoint

### POST /contact

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hello, I'd like to discuss a project..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Message sent successfully!"
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Error description"
}
```

## Frontend Integration

Update your React contact form to POST to this API:

```javascript
const response = await fetch('http://localhost:5000/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, subject, message })
});
const data = await response.json();
```

## Deployment

### Deploy to Render

1. Push your code to GitHub
2. Create a new **Web Service** on Render
3. Connect your repository
4. Set the build command: `pip install -r requirements.txt`
5. Set the start command: `gunicorn app:app`
6. Add environment variables:
   - `EMAIL_ADDRESS`
   - `EMAIL_PASSWORD`
7. Deploy

### Deploy to Railway

1. Push your code to GitHub
2. Create a new project on Railway
3. Connect your repository
4. Railway will auto-detect Python and install dependencies
5. Add environment variables in the Railway dashboard
6. Deploy

### Deploy to PythonAnywhere

1. Sign up at https://www.pythonanywhere.com/
2. Upload your `backend` folder
3. Open a Bash console and run:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a new **Web** app
5. Set the WSGI configuration to point to your Flask app
6. Add environment variables in the **Web** tab
7. Reload the app

## Security Notes

- Never commit `.env` file to version control
- Use Gmail App Passwords, not your main password
- All inputs are sanitized to prevent injection attacks
- Rate limiting prevents abuse
- CORS is configured to allow only specific origins

## Project Structure

```
backend/
├── app.py              # Flask application
├── requirements.txt    # Python dependencies
├── .env.example        # Environment variables template
└── README.md          # This file
```

## Troubleshooting

**SMTP Authentication Error:**
- Make sure 2-Factor Authentication is enabled on your Gmail account
- Use an App Password, not your regular Gmail password
- Check that EMAIL_ADDRESS and EMAIL_PASSWORD are correct in .env

**CORS Errors:**
- Add your frontend URL to the `CORS` origins list in `app.py`

**Rate Limit Errors:**
- The API allows 5 requests per minute per IP address
- Adjust `RATE_LIMIT` and `RATE_WINDOW` in `app.py` if needed
