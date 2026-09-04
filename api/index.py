from flask import Flask, jsonify, request
from flask_cors import CORS
from config import Config
from models import db, User, SearchHistory, SavedCourse
from oauth_routes import oauth_bp, init_oauth
from password_routes import password_bp
from auth import token_required
import pandas as pd
import pickle
from sklearn.metrics.pairwise import linear_kernel
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
from datetime import datetime

app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
CORS(app, supports_credentials=True, origins=[Config.FRONTEND_URL])
db.init_app(app)
init_oauth(app)

# Register blueprints
app.register_blueprint(oauth_bp)
app.register_blueprint(password_bp)

# Health check endpoint (no auth required)
@app.route("/api/health", methods=['GET'])
def health_check():
    """Health check endpoint for monitoring backend status"""
    try:
        return jsonify({
            "status": "healthy",
            "timestamp": datetime.utcnow().isoformat()
        }), 200
    except Exception as e:
        return jsonify({
            "status": "unhealthy",
            "error": str(e),
            "timestamp": datetime.utcnow().isoformat()
        }), 500

# Create database tables
with app.app_context():
    db.create_all()

# Load the pre-trained models and data
print("Loading models...")
import os
base_dir = os.path.dirname(os.path.abspath(__file__))
df = pickle.load(open(os.path.join(base_dir, 'course_list.pkl'),'rb'))
tfidf_matrix = pickle.load(open(os.path.join(base_dir, 'tfidf_matrix.pkl'),'rb'))
tfidf = pickle.load(open(os.path.join(base_dir, 'vectorizer.pkl'),'rb')) # Load the new file
print("Models loaded successfully!")

model = SentenceTransformer('all-MiniLM-L6-v2')

print("Loading Neural Models (This takes a few seconds)...")
# Load the pre-calculated embeddings
nn_embeddings = pickle.load(open(os.path.join(base_dir, 'nn_embeddings.pkl'), 'rb'))
# Load the BERT model (Requirements say: all-MiniLM-L6-v2)
bert_model = SentenceTransformer('all-MiniLM-L6-v2')

# Function to get course recommendations based on content similarity
def get_recommendations_tfidf(query, df=df):
    query_vec = tfidf.transform([query])

    cosine_similarities = linear_kernel(query_vec, tfidf_matrix).flatten()

    # Sort indices descending using fast numpy sorting
    sorted_indices = np.argsort(cosine_similarities)[::-1]
    
    # Fetch course links as a numpy array for O(1) index lookup
    links = df['course_links'].values
    
    # Filter duplicates based on course_links
    unique_indices = []
    seen_links = set()
    similarity_values = []
    
    for idx in sorted_indices:
        score = cosine_similarities[idx]
        if score == 0:
            break
        link = links[idx]
        if link not in seen_links:
            seen_links.add(link)
            unique_indices.append(idx)
            similarity_values.append(score)
            if len(unique_indices) == 10:
                break
                
    if not unique_indices:
        return "No similar courses found. Please try a different query."

    recommended_courses = df.iloc[unique_indices].copy()
    recommended_courses['similarity_score'] = similarity_values
    
    return recommended_courses.to_dict('records')

def get_recommendations_neural(query):
    # 1. Convert query to "Meaning Vector" using BERT
    query_embedding = bert_model.encode([query])
    
    # 2. Calculate Similarity against all courses
    sim_scores = cosine_similarity(query_embedding, nn_embeddings).flatten()
    
    # 3. Sort indices descending
    sorted_indices = np.argsort(sim_scores)[::-1]
    
    # Fetch course links as a numpy array for O(1) index lookup
    links = df['course_links'].values
    
    # Filter duplicates based on course_links
    unique_indices = []
    seen_links = set()
    similarity_values = []
    
    for idx in sorted_indices:
        link = links[idx]
        if link not in seen_links:
            seen_links.add(link)
            unique_indices.append(idx)
            similarity_values.append(sim_scores[idx])
            if len(unique_indices) == 10:
                break
                
    recommended_courses = df.iloc[unique_indices].copy()
    recommended_courses['similarity_score'] = similarity_values
    return recommended_courses.to_dict('records')

# API Routes
@app.route("/api/")
def index():
    return jsonify({"message": "Smart Course Flask Backend API", "status": "running"})

@app.route("/api/me")
@token_required
def get_current_user():
    """Get current authenticated user info"""
    user = db.session.query(User).get(request.user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user.to_dict())

@app.route("/api/protected")
@token_required
def protected_route():
    """Example protected route"""
    return jsonify({
        "message": "This is a protected route",
        "user_id": request.user_id,
        "user_email": request.user_email
    })

@app.route("/api/recommend_tfidf", methods=['GET'])
@token_required
def recommend_tfidf():
    """Get course recommendations - protected route"""
    query = request.args.get('query', '')
    if not query:
        return jsonify({"error": "Query parameter is required"}), 400
    
    recommendations = get_recommendations_tfidf(query)
    
    # Save to search history
    try:
        search_history = SearchHistory(
            user_id=request.user_id,
            query=query,
            model_type='tfidf',
            result_count=len(recommendations) if isinstance(recommendations, list) else 0
        )
        db.session.add(search_history)
        db.session.commit()
    except Exception as e:
        print(f"Error saving search history: {str(e)}")
        # Don't fail the request if history saving fails
        pass
    
    return jsonify({
        "query": query,
        "recommendations": recommendations
    })

@app.route("/api/recommend_neural", methods=['GET'])
@token_required
def recommend_neural():
    """Get course recommendations - protected route"""
    query = request.args.get('query', '')
    if not query:
        return jsonify({"error": "Query parameter is required"}), 400
    
    recommendations = get_recommendations_neural(query)
    
    # Save to search history
    try:
        search_history = SearchHistory(
            user_id=request.user_id,
            query=query,
            model_type='neural',
            result_count=len(recommendations) if isinstance(recommendations, list) else 0
        )
        db.session.add(search_history)
        db.session.commit()
    except Exception as e:
        print(f"Error saving search history: {str(e)}")
        # Don't fail the request if history saving fails
        pass
    
    return jsonify({
        "query": query,
        "recommendations": recommendations
    })

@app.route("/api/history", methods=['GET'])
@token_required
def get_search_history():
    """Get user's search history"""
    try:
        print(f"Fetching search history for user_id: {request.user_id}")
        
        # Get all search history for the current user, ordered by date descending
        searches = db.session.query(SearchHistory).filter_by(user_id=request.user_id).order_by(
            SearchHistory.created_at.desc()
        ).all()
        
        print(f"Found {len(searches)} search history items")
        
        result = []
        for search in searches:
            search_dict = search.to_dict()
            # Include saved courses for this search
            saved_courses = db.session.query(SavedCourse).filter_by(search_id=search.id).all()
            search_dict['saved_courses'] = [course.to_dict() for course in saved_courses]
            result.append(search_dict)
        
        print(f"Returning {len(result)} history items")
        
        return jsonify({
            "history": result,
            "total": len(result)
        })
    except Exception as e:
        import traceback
        print(f"Error fetching search history: {str(e)}")
        print(f"Full traceback: {traceback.format_exc()}")
        return jsonify({"error": f"Failed to fetch search history: {str(e)}"}), 500


@app.route("/api/save", methods=['POST'])
@token_required
def save_course():
    """Save a course to user's saved list"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['course_id', 'course_title']
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields: course_id, course_title"}), 400
        
        # Check if already saved
        existing = db.session.query(SavedCourse).filter_by(
            user_id=request.user_id,
            course_id=data['course_id']
        ).first()
        
        if existing:
            return jsonify({
                "message": "Course already saved",
                "course": existing.to_dict()
            }), 200
        
        # Create new saved course
        saved_course = SavedCourse(
            user_id=request.user_id,
            course_id=data['course_id'],
            course_title=data['course_title'],
            course_instructor_name=data.get('course_instructor_name'),
            course_levels=data.get('course_levels'),
            ratings=data.get('ratings'),
            similarity_score=data.get('similarity_score'),
            course_links=data.get('course_links'),
            search_id=data.get('search_id')
        )
        
        db.session.add(saved_course)
        db.session.commit()
        
        return jsonify({
            "message": "Course saved successfully",
            "course": saved_course.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        print(f"Error saving course: {str(e)}")
        return jsonify({"error": "Failed to save course"}), 500


@app.route("/api/save/<int:course_id>", methods=['DELETE'])
@token_required
def delete_saved_course(course_id):
    """Delete a saved course from user's list"""
    try:
        saved_course = db.session.query(SavedCourse).filter_by(
            user_id=request.user_id,
            course_id=course_id
        ).first()
        
        if not saved_course:
            return jsonify({"error": "Saved course not found"}), 404
        
        db.session.delete(saved_course)
        db.session.commit()
        
        return jsonify({"message": "Course removed from saved list"}), 200
        
    except Exception as e:
        db.session.rollback()
        print(f"Error deleting saved course: {str(e)}")
        return jsonify({"error": "Failed to delete saved course"}), 500


@app.route("/api/saved", methods=['GET'])
@token_required
def get_saved_courses():
    """Get all saved courses for the current user"""
    try:
        saved_courses = db.session.query(SavedCourse).filter_by(user_id=request.user_id).order_by(
            SavedCourse.saved_at.desc()
        ).all()
        
        return jsonify({
            "saved_courses": [course.to_dict() for course in saved_courses],
            "total": len(saved_courses)
        })
    except Exception as e:
        print(f"Error fetching saved courses: {str(e)}")
        return jsonify({"error": "Failed to fetch saved courses"}), 500


@app.route("/api/recommend", methods=['POST'])
@token_required
def get_recommendations():
    """
    Get course recommendations based on user's saved courses (last 5)
    Supports both TFIDF and Neural models
    """
    try:
        print(f"Recommend endpoint called by user_id: {request.user_id}")
        
        data = request.get_json()
        if not data:
            print("No JSON body provided")
            return jsonify({"error": "No JSON body provided"}), 400
        
        query = data.get('query', '')
        model_type = data.get('model_type', 'both').lower()
        
        if not query:
            print("No query provided")
            return jsonify({"error": "Query is required"}), 400
        
        # Ensure query is a string (handle list input from frontend)
        if isinstance(query, list):
            query = ' '.join(query)
        
        print(f"Getting recommendations for query: {query}, model_type: {model_type}")
        
        recommendations = []
        
        # Get TFIDF recommendations if requested
        if model_type in ['both', 'tfidf']:
            try:
                print("Calling get_recommendations_tfidf...")
                tfidf_recs = get_recommendations_tfidf(query)
                print(f"TFIDF returned: {type(tfidf_recs)}, count: {len(tfidf_recs) if isinstance(tfidf_recs, list) else 'N/A'}")
                if isinstance(tfidf_recs, list):
                    recommendations.extend(tfidf_recs)
            except Exception as e:
                import traceback
                print(f"Error getting TFIDF recommendations: {str(e)}")
                print(f"Traceback: {traceback.format_exc()}")
        
        # Get Neural recommendations if requested
        if model_type in ['both', 'neural']:
            try:
                print("Calling get_recommendations_neural...")
                neural_recs = get_recommendations_neural(query)
                print(f"Neural returned: {type(neural_recs)}, count: {len(neural_recs) if isinstance(neural_recs, list) else 'N/A'}")
                if isinstance(neural_recs, list):
                    # Filter out duplicates (by course_id)
                    existing_ids = set(r.get('course_id') for r in recommendations)
                    for rec in neural_recs:
                        if rec.get('course_id') not in existing_ids:
                            recommendations.append(rec)
                            existing_ids.add(rec.get('course_id'))
            except Exception as e:
                import traceback
                print(f"Error getting Neural recommendations: {str(e)}")
                print(f"Traceback: {traceback.format_exc()}")
        
        # Remove duplicates while preserving order
        seen_ids = set()
        unique_recommendations = []
        for rec in recommendations:
            course_id = rec.get('course_id')
            if course_id not in seen_ids:
                seen_ids.add(course_id)
                unique_recommendations.append(rec)
        
        print(f"Total unique recommendations: {len(unique_recommendations)}")
        
        # Save to search history
        try:
            search_history = SearchHistory(
                user_id=request.user_id,
                query=query,
                model_type=model_type,
                result_count=len(unique_recommendations)
            )
            db.session.add(search_history)
            db.session.commit()
            print(f"✓ Search history saved: {query} ({len(unique_recommendations)} results)")
        except Exception as e:
            import traceback
            print(f"✗ Error saving search history: {str(e)}")
            print(f"Traceback: {traceback.format_exc()}")
            db.session.rollback()
        
        return jsonify({
            "recommendations": unique_recommendations[:20],  # Return top 20
            "total": len(unique_recommendations),
            "model_type": model_type
        })
    except Exception as e:
        import traceback
        print(f"Error fetching recommendations: {str(e)}")
        print(f"Full traceback: {traceback.format_exc()}")
        return jsonify({"error": f"Failed to fetch recommendations: {str(e)}"}), 500


@app.route("/recommend/<query>", methods=['GET'])
def home(query):
    """Public recommendations endpoint (consider making this protected too)"""
    return jsonify(get_recommendations_tfidf(query))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5328, debug=True)