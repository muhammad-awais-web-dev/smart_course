"""
Test script to verify the backend setup
Run this after setting up OAuth credentials
"""

import requests
import sys

BASE_URL = "http://localhost:5000"

def test_health_check():
    """Test if the server is running"""
    try:
        response = requests.get(f"{BASE_URL}/")
        print("✅ Health check:", response.json())
        return True
    except Exception as e:
        print(f"❌ Health check failed: {e}")
        print("Make sure the server is running: python app.py")
        return False

def test_oauth_routes():
    """Test if OAuth routes are accessible"""
    routes = [
        "/auth/google",
        "/auth/github"
    ]
    
    for route in routes:
        try:
            response = requests.get(f"{BASE_URL}{route}", allow_redirects=False)
            if response.status_code in [302, 307]:  # Redirect expected
                print(f"✅ OAuth route {route} is configured")
            else:
                print(f"⚠️  OAuth route {route} returned {response.status_code}")
        except Exception as e:
            print(f"❌ OAuth route {route} failed: {e}")

def test_protected_route_without_token():
    """Test that protected routes require authentication"""
    try:
        response = requests.get(f"{BASE_URL}/api/me")
        if response.status_code == 401:
            print("✅ Protected routes require authentication")
        else:
            print(f"⚠️  Protected route returned unexpected status: {response.status_code}")
    except Exception as e:
        print(f"❌ Protected route test failed: {e}")

def main():
    print("🧪 Testing Smart Course Backend...\n")
    
    print("1. Testing server health...")
    if not test_health_check():
        sys.exit(1)
    
    print("\n2. Testing OAuth routes...")
    test_oauth_routes()
    
    print("\n3. Testing protected routes...")
    test_protected_route_without_token()
    
    print("\n" + "="*50)
    print("✨ Backend tests completed!")
    print("="*50)
    print("\nNext steps:")
    print("1. Update .env with your OAuth credentials")
    print("2. Test login by visiting http://localhost:5000/auth/google")
    print("3. Build your React frontend using REACT_INTEGRATION.md")

if __name__ == "__main__":
    main()
