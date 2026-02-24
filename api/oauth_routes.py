from flask import Blueprint, redirect, url_for, request, jsonify
from authlib.integrations.flask_client import OAuth
from models import db, User
from auth import create_jwt_token
from config import Config
from datetime import datetime

oauth_bp = Blueprint('oauth', __name__)
oauth = OAuth()

def init_oauth(app):
    """Initialize OAuth providers"""
    oauth.init_app(app)
    
    # Google OAuth configuration
    oauth.register(
        name='google',
        client_id=Config.GOOGLE_CLIENT_ID,
        client_secret=Config.GOOGLE_CLIENT_SECRET,
        server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
        client_kwargs={'scope': 'openid email profile'}
    )
    
    # GitHub OAuth configuration
    oauth.register(
        name='github',
        client_id=Config.GITHUB_CLIENT_ID,
        client_secret=Config.GITHUB_CLIENT_SECRET,
        access_token_url='https://github.com/login/oauth/access_token',
        access_token_params=None,
        authorize_url='https://github.com/login/oauth/authorize',
        authorize_params=None,
        api_base_url='https://api.github.com/',
        client_kwargs={'scope': 'user:email'}
    )

# Google OAuth routes
@oauth_bp.route('/api/auth/google')
def google_login():
    """Initiate Google OAuth flow"""
    redirect_uri = f"{Config.OAUTH_CALLBACK_BASE}/api/auth/google/callback"
    return oauth.google.authorize_redirect(redirect_uri)

@oauth_bp.route('/api/auth/google/callback')
def google_callback():
    """Google OAuth callback"""
    try:
        token = oauth.google.authorize_access_token()
        user_info = token.get('userinfo')
        
        if not user_info:
            return redirect(f"{Config.FRONTEND_URL}/login?error=google_auth_failed")
        
        # Create or update user
        user = User.query.filter_by(email=user_info['email']).first()
        
        if not user:
            # New user - create account
            user = User(
                email=user_info['email'],
                name=user_info.get('name'),
                avatar=user_info.get('picture'),
                provider='google',
                provider_id=user_info['sub']
            )
            db.session.add(user)
        else:
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
            # Update user info
            user.last_login = datetime.utcnow()
            user.avatar = user_info.get('picture')
            user.name = user_info.get('name')
        
        db.session.commit()
        
        # Create JWT token
        jwt_token = create_jwt_token(user.id, user.email)
        
        # Redirect to frontend with token
        return redirect(f"{Config.FRONTEND_URL}/auth/callback?token={jwt_token}")
        
    except Exception as e:
        print(f"Google auth error: {str(e)}")
        return redirect(f"{Config.FRONTEND_URL}/login?error=auth_failed")

# GitHub OAuth routes
@oauth_bp.route('/api/auth/github')
def github_login():
    """Initiate GitHub OAuth flow"""
    redirect_uri = f"{Config.OAUTH_CALLBACK_BASE}/api/auth/github/callback"
    return oauth.github.authorize_redirect(redirect_uri)

@oauth_bp.route('/api/auth/github/callback')
def github_callback():
    """GitHub OAuth callback"""
    try:
        token = oauth.github.authorize_access_token()
        
        # Get user info from GitHub
        resp = oauth.github.get('user', token=token)
        user_info = resp.json()
        
        # Get user email (might be private)
        email = user_info.get('email')
        if not email:
            email_resp = oauth.github.get('user/emails', token=token)
            emails = email_resp.json()
            # Get primary email
            email = next((e['email'] for e in emails if e['primary']), None)
        
        if not email:
            return redirect(f"{Config.FRONTEND_URL}/login?error=no_email")
        
        # Create or update user
        user = User.query.filter_by(email=email).first()
        
        if not user:
            # New user - create account
            user = User(
                email=email,
                name=user_info.get('name') or user_info.get('login'),
                avatar=user_info.get('avatar_url'),
                provider='github',
                provider_id=str(user_info['id'])
            )
            db.session.add(user)
        else:
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
            # Update user info
            user.last_login = datetime.utcnow()
            user.avatar = user_info.get('avatar_url')
            user.name = user_info.get('name') or user_info.get('login')
        
        db.session.commit()
        
        # Create JWT token
        jwt_token = create_jwt_token(user.id, user.email)
        
        # Redirect to frontend with token
        return redirect(f"{Config.FRONTEND_URL}/auth/callback?token={jwt_token}")
        
    except Exception as e:
        print(f"GitHub auth error: {str(e)}")
        return redirect(f"{Config.FRONTEND_URL}/login?error=auth_failed")
