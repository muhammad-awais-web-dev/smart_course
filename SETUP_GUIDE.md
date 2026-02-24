# Step-by-Step Guide: Setting Up Password Authentication

## Overview
This guide will walk you through adding password-based authentication to your Flask API that already has OAuth (Google/GitHub) support.

---

## ✅ Prerequisites (Already Done)

You've already completed:
- ✅ User model has `password_hash` field
- ✅ User model has helper methods: `set_password()`, `check_password()`, `has_password()`
- ✅ Werkzeug is installed (comes with Flask)

---

## Step 1: Create the Password Routes Blueprint

### File: `api/password_routes.py`

Create this file with the following structure:

```python
from flask import Blueprint, request, jsonify
from models import db, User
from auth import create_jwt_token, token_required
from datetime import datetime
import re

password_bp = Blueprint('password_auth', __name__)
```

**What this does:**
- Creates a Flask Blueprint named `password_auth`
- Imports necessary dependencies for authentication
- Uses `re` module for email/password validation

---

## Step 2: Add Validation Helper Functions

Add these validation functions to `password_routes.py`:

```python
def is_valid_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def is_valid_password(password):
    """Validate password strength (min 8 chars, at least 1 letter and 1 number)"""
    if len(password) < 8:
        return False, "Password must be at least 8 characters long"
    if not re.search(r'[A-Za-z]', password):
        return False, "Password must contain at least one letter"
    if not re.search(r'\d', password):
        return False, "Password must contain at least one number"
    return True, None
```

**What this does:**
- `is_valid_email()`: Checks if email format is correct
- `is_valid_password()`: Enforces password requirements (8+ chars, 1 letter, 1 number)
- Returns tuple: `(is_valid, error_message)`

---

## Step 3: Add Registration Endpoint

Add this route to `password_routes.py`:

```python
@password_bp.route('/api/auth/register', methods=['POST'])
def register():
    """Register a new user with email and password"""
    try:
        data = request.get_json()
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        name = data.get('name', '').strip()
        
        # Validate inputs
        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400
        
        if not is_valid_email(email):
            return jsonify({'error': 'Invalid email format'}), 400
        
        is_valid, error_msg = is_valid_password(password)
        if not is_valid:
            return jsonify({'error': error_msg}), 400
        
        # Check if user already exists
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({'error': 'Email already registered'}), 409
        
        # Create new user
        user = User(
            email=email,
            name=name or email.split('@')[0],
            provider='password',
            avatar=f"https://ui-avatars.com/api/?name={name or email.split('@')[0]}&background=random"
        )
        user.set_password(password)
        
        db.session.add(user)
        db.session.commit()
        
        # Create JWT token
        token = create_jwt_token(user.id, user.email)
        
        return jsonify({
            'message': 'User registered successfully',
            'token': token,
            'user': user.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        print(f"Registration error: {str(e)}")
        return jsonify({'error': 'Registration failed'}), 500
```

**What this does:**
- Accepts POST request with `email`, `password`, and optional `name`
- Validates email format and password strength
- Checks if email is already registered
- Creates new user with hashed password
- Sets provider to `'password'`
- Generates default avatar using ui-avatars.com
- Returns JWT token for immediate login

**Test with:**
```bash
curl -X POST http://localhost:5328/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test1234","name":"Test User"}'
```

---

## Step 4: Add Login Endpoint

Add this route to `password_routes.py`:

```python
@password_bp.route('/api/auth/login', methods=['POST'])
def login():
    """Login with email and password"""
    try:
        data = request.get_json()
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        
        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400
        
        # Find user by email
        user = User.query.filter_by(email=email).first()
        
        if not user:
            return jsonify({'error': 'Invalid email or password'}), 401
        
        # Check if user has a password set
        if not user.has_password():
            return jsonify({
                'error': f'This account is linked with {user.provider}. Please login using {user.provider} or add a password first.'
            }), 401
        
        # Verify password
        if not user.check_password(password):
            return jsonify({'error': 'Invalid email or password'}), 401
        
        # Update last login
        user.last_login = datetime.utcnow()
        db.session.commit()
        
        # Create JWT token
        token = create_jwt_token(user.id, user.email)
        
        return jsonify({
            'message': 'Login successful',
            'token': token,
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        print(f"Login error: {str(e)}")
        return jsonify({'error': 'Login failed'}), 500
```

**What this does:**
- Accepts POST request with `email` and `password`
- Finds user by email
- Checks if user has a password (handles OAuth-only accounts)
- Verifies password using `check_password()` method
- Updates last login timestamp
- Returns JWT token

**Test with:**
```bash
curl -X POST http://localhost:5328/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test1234"}'
```

---

## Step 5: Add "Add Password" Endpoint (For OAuth Users)

This allows users who signed up with Google/GitHub to add password login:

```python
@password_bp.route('/api/auth/add-password', methods=['POST'])
@token_required
def add_password():
    """Add password to existing OAuth account (only if no password exists)"""
    try:
        data = request.get_json()
        password = data.get('password', '')
        
        is_valid, error_msg = is_valid_password(password)
        if not is_valid:
            return jsonify({'error': error_msg}), 400
        
        # Get current user
        user = User.query.get(request.user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Check if user already has a password
        if user.has_password():
            return jsonify({'error': 'Password already set. Use change password endpoint instead.'}), 400
        
        # Add password
        user.set_password(password)
        db.session.commit()
        
        return jsonify({
            'message': 'Password added successfully',
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        print(f"Add password error: {str(e)}")
        return jsonify({'error': 'Failed to add password'}), 500
```

**What this does:**
- Requires authentication (JWT token)
- Only works if user doesn't have a password yet
- Adds password to OAuth account
- User can now login with either OAuth OR password

**Test with:**
```bash
curl -X POST http://localhost:5328/api/auth/add-password \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"password":"NewPass123"}'
```

---

## Step 6: Add "Change Password" Endpoint

For users who already have a password:

```python
@password_bp.route('/api/auth/change-password', methods=['POST'])
@token_required
def change_password():
    """Change existing password"""
    try:
        data = request.get_json()
        current_password = data.get('current_password', '')
        new_password = data.get('new_password', '')
        
        if not current_password or not new_password:
            return jsonify({'error': 'Current and new password are required'}), 400
        
        is_valid, error_msg = is_valid_password(new_password)
        if not is_valid:
            return jsonify({'error': error_msg}), 400
        
        # Get current user
        user = User.query.get(request.user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Verify current password
        if not user.check_password(current_password):
            return jsonify({'error': 'Current password is incorrect'}), 401
        
        # Set new password
        user.set_password(new_password)
        db.session.commit()
        
        return jsonify({'message': 'Password changed successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        print(f"Change password error: {str(e)}")
        return jsonify({'error': 'Failed to change password'}), 500
```

**What this does:**
- Requires authentication
- Verifies current password before allowing change
- Updates to new password
- Good for security/profile settings

---

## Step 7: Add Account Info Endpoint

Check what authentication methods are available:

```python
@password_bp.route('/api/auth/account-info', methods=['GET'])
@token_required
def account_info():
    """Get account authentication info"""
    try:
        user = User.query.get(request.user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'email': user.email,
            'provider': user.provider,
            'has_password': user.has_password(),
            'can_add_password': not user.has_password()
        }), 200
        
    except Exception as e:
        print(f"Account info error: {str(e)}")
        return jsonify({'error': 'Failed to get account info'}), 500
```

**What this does:**
- Shows current provider (password/google/github)
- Shows if password is set
- Shows if password can be added
- Useful for UI to show correct options

---

## Step 8: Register the Blueprint

### File: `api/index.py`

Add the import at the top:

```python
from password_routes import password_bp
```

Then register the blueprint after the OAuth blueprint:

```python
# Register blueprints
app.register_blueprint(oauth_bp)
app.register_blueprint(password_bp)  # Add this line
```

**Complete example:**
```python
from flask import Flask, jsonify, request
from flask_cors import CORS
from config import Config
from models import db, User
from oauth_routes import oauth_bp, init_oauth
from password_routes import password_bp  # ADD THIS
from auth import token_required
# ... rest of imports

app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
CORS(app, supports_credentials=True, origins=[Config.FRONTEND_URL])
db.init_app(app)
init_oauth(app)

# Register blueprints
app.register_blueprint(oauth_bp)
app.register_blueprint(password_bp)  # ADD THIS

# ... rest of code
```

---

## Step 9: Update OAuth Routes (Optional but Recommended)

### File: `api/oauth_routes.py`

Update the Google callback to support linking:

**Find this section in Google callback:**
```python
        # User exists - check if they're trying to use a different provider
        if user.provider != 'google':
            return redirect(
                f"{Config.FRONTEND_URL}/login?error=email_exists_with_{user.provider}"
            )
```

**Replace with:**
```python
        # User exists - update provider info and keep password if exists
        if user.provider == 'password':
            # User created with password, now linking Google
            user.provider = 'google'
            user.provider_id = user_info['sub']
        elif user.provider != 'google':
            # User has different OAuth provider
            return redirect(
                f"{Config.FRONTEND_URL}/login?error=email_exists_with_{user.provider}"
            )
```

**Do the same for GitHub callback:**

Replace the similar section with:
```python
        # User exists - update provider info and keep password if exists
        if user.provider == 'password':
            # User created with password, now linking GitHub
            user.provider = 'github'
            user.provider_id = str(user_info['id'])
        elif user.provider != 'github':
            # User has different OAuth provider
            return redirect(
                f"{Config.FRONTEND_URL}/login?error=email_exists_with_{user.provider}"
            )
```

**What this does:**
- Allows password users to link OAuth
- Provider switches to OAuth but password is kept
- Users can login with both methods

---

## Step 10: Update Database

If you already have users in your database, run this to add the new column:

```bash
cd api
python
```

```python
from index import app
from models import db

with app.app_context():
    db.create_all()
exit()
```

Or just restart your Flask server - it will auto-create the column.

---

## Step 11: Test Everything

### Test 1: Register New User
```bash
curl -X POST http://localhost:5328/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test1234","name":"Test User"}'
```

Expected: Token and user object returned

### Test 2: Login
```bash
curl -X POST http://localhost:5328/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test1234"}'
```

Expected: Token and user object returned

### Test 3: Access Protected Route
```bash
# Save token from login
TOKEN="<your_token_here>"

curl -X GET http://localhost:5328/api/auth/account-info \
  -H "Authorization: Bearer $TOKEN"
```

Expected: Account info with `has_password: true`

---

## Complete API Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/register` | POST | No | Register with email/password |
| `/api/auth/login` | POST | No | Login with email/password |
| `/api/auth/add-password` | POST | Yes | Add password to OAuth account |
| `/api/auth/change-password` | POST | Yes | Change existing password |
| `/api/auth/account-info` | GET | Yes | Get account info |
| `/api/auth/google` | GET | No | OAuth Google login |
| `/api/auth/github` | GET | No | OAuth GitHub login |

---

## User Flow Diagrams

### Flow 1: New User with Password
```
1. POST /api/auth/register
   └─ User created with provider='password'
   
2. POST /api/auth/login
   └─ Returns JWT token
   
3. (Optional) GET /api/auth/google
   └─ Provider changes to 'google', password kept
   └─ Can now use both methods!
```

### Flow 2: OAuth User Adds Password
```
1. GET /api/auth/google (new user)
   └─ User created with provider='google', no password
   
2. POST /api/auth/add-password (with token)
   └─ Password added, provider stays 'google'
   └─ Can now use both methods!
```

---

## Error Codes Reference

- **200**: Success
- **201**: Created (registration successful)
- **400**: Bad request (validation failed)
- **401**: Unauthorized (wrong password/no token)
- **404**: Not found (user doesn't exist)
- **409**: Conflict (email already exists)
- **500**: Server error

---

## Security Features

✅ **Password Hashing**: Werkzeug's `generate_password_hash` with salt  
✅ **Password Requirements**: 8+ chars, 1 letter, 1 number  
✅ **Email Validation**: Regex pattern matching  
✅ **JWT Authentication**: Secure token-based auth  
✅ **Provider Conflict Handling**: Prevents email conflicts  

---

## Next Steps

1. ✅ Create `password_routes.py` with all endpoints
2. ✅ Register blueprint in `index.py`
3. ✅ Update OAuth routes for linking support
4. ✅ Test all endpoints
5. 🎯 Update frontend login/register pages
6. 🎯 Add profile settings for password management
7. 🎯 Add "forgot password" flow (optional)

---

## Troubleshooting

**Error: "Module not found: password_routes"**
- Make sure `password_routes.py` is in the `api` folder
- Check the import statement in `index.py`

**Error: "column password_hash does not exist"**
- Run database migration (Step 10)
- Or restart Flask server

**Login returns "This account is linked with google"**
- User signed up with OAuth and has no password
- They need to use OAuth login OR add password first

**Registration returns 409 "Email already registered"**
- Email exists in database
- User should login instead or use password reset

---

## Complete File Structure

```
api/
├── index.py (updated - register blueprint)
├── models.py (already updated - has password fields)
├── auth.py (existing - JWT functions)
├── oauth_routes.py (updated - support linking)
├── password_routes.py (NEW - all password endpoints)
└── config.py (existing)
```

---

Need help with any step? Just ask! 🚀
