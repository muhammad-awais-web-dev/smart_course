from flask import Flask, jsonify, request
from flask_cors import CORS
from config import Config
from models import db, User
from oauth_routes import oauth_bp, init_oauth
from auth import token_required
import pandas as pd
import pickle
from sklearn.metrics.pairwise import linear_kernel
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer

app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
CORS(app, supports_credentials=True, origins=[Config.FRONTEND_URL])
db.init_app(app)
init_oauth(app)

# Register blueprints
app.register_blueprint(oauth_bp)

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

    sim_score = list(enumerate(cosine_similarities))

    sim_score = sorted(sim_score, key=lambda x: x[1], reverse=True)
    if sim_score[0][1] == 0:
        return "No similar courses found. Please try a different query."
    
    output = []
    sim_score = sim_score[0:10]  # Get top 10 similar courses
    course_indices = [i[0] for i in sim_score]

    recommended_courses = df.iloc[course_indices].copy()
    recommended_courses['similarity_score'] = [i[1] for i in sim_score]
    
    return recommended_courses.to_dict('records')

def get_recommendations_neural(query):
    # 1. Convert query to "Meaning Vector" using BERT
    query_embedding = bert_model.encode([query])
    
    # 2. Calculate Similarity against all courses
    sim_scores = cosine_similarity(query_embedding, nn_embeddings).flatten()
    
    # 3. Sort and Get Top 10
    top_indices = np.argsort(sim_scores)[::-1][:10]
    
    # Neural nets rarely give exactly 0, so we just return the top results
    recommended_courses = df.iloc[top_indices].copy()
    recommended_courses['similarity_score'] = sim_scores[top_indices]
    return recommended_courses.to_dict('records')

# API Routes
@app.route("/api/")
def index():
    return jsonify({"message": "Smart Course Flask Backend API", "status": "running"})

@app.route("/api/me")
@token_required
def get_current_user():
    """Get current authenticated user info"""
    user = User.query.get(request.user_id)
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
    return jsonify({
        "query": query,
        "recommendations": recommendations
    })

@app.route("/recommend/<query>", methods=['GET'])
def home(query):
    """Public recommendations endpoint (consider making this protected too)"""
    return jsonify(get_recommendations_tfidf(query))

if __name__ == "__main__":
    app.run(debug=True)