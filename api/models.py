from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(100))
    avatar = db.Column(db.String(500))
    
    # Password authentication
    password_hash = db.Column(db.String(256))  # For password-based auth
    
    # OAuth provider info
    provider = db.Column(db.String(20))  # 'google', 'github', or 'password'
    provider_id = db.Column(db.String(100))  # ID from OAuth provider
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime, default=datetime.utcnow)
    
    def set_password(self, password):
        """Hash and set user password"""
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        """Verify password against hash"""
        if not self.password_hash:
            return False
        return check_password_hash(self.password_hash, password)
    
    def has_password(self):
        """Check if user has a password set"""
        return self.password_hash is not None
    
    def __repr__(self):
        return f'<User {self.email}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'avatar': self.avatar,
            'provider': self.provider,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'last_login': self.last_login.isoformat() if self.last_login else None
        }

class SearchHistory(db.Model):
    """Track user search queries and which model was used"""
    __tablename__ = 'search_history'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    query = db.Column(db.String(500), nullable=False)
    model_type = db.Column(db.String(20), nullable=False)  # 'tfidf' or 'neural'
    result_count = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationship to User
    user = db.relationship('User', backref=db.backref('search_histories', lazy=True, cascade='all, delete-orphan'))
    
    def __repr__(self):
        return f'<SearchHistory {self.id}: {self.query[:30]}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'query': self.query,
            'model_type': self.model_type,
            'result_count': self.result_count,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class SavedCourse(db.Model):
    """Store user's saved/bookmarked courses"""
    __tablename__ = 'saved_courses'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    search_id = db.Column(db.Integer, db.ForeignKey('search_history.id'), nullable=True)
    
    # Course denormalized data (snapshot when saved)
    course_id = db.Column(db.Integer, nullable=False)  # Original course ID from dataset
    course_title = db.Column(db.String(500), nullable=False)
    course_instructor_name = db.Column(db.String(200))
    course_levels = db.Column(db.String(100))
    ratings = db.Column(db.Float)
    similarity_score = db.Column(db.Float)  # Score from the recommendation model
    course_links = db.Column(db.String(500))  # Course URL
    
    saved_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    user = db.relationship('User', backref=db.backref('saved_courses', lazy=True, cascade='all, delete-orphan'))
    search = db.relationship('SearchHistory', backref=db.backref('saved_courses', lazy=True))
    
    def __repr__(self):
        return f'<SavedCourse {self.course_id}: {self.course_title[:30]}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'search_id': self.search_id,
            'course_id': self.course_id,
            'course_title': self.course_title,
            'course_instructor_name': self.course_instructor_name,
            'course_levels': self.course_levels,
            'ratings': self.ratings,
            'similarity_score': self.similarity_score,
            'course_links': self.course_links,
            'saved_at': self.saved_at.isoformat() if self.saved_at else None
        }