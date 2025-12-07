#!/usr/bin/env python3
"""
Script to disable Vercel Deployment Protection for frontend and backend projects
Run this script to disable protection on both projects
"""

import requests
import os

# You need to provide your Vercel token
VERCEL_TOKEN = os.environ.get('VERCEL_TOKEN')

if not VERCEL_TOKEN:
    print("❌ Error: VERCEL_TOKEN environment variable not set")
    print("\nTo get your token:")
    print("1. Go to https://vercel.com/account/tokens")
    print("2. Create a new token")
    print("3. Set it: $env:VERCEL_TOKEN='your-token-here'")
    print("\nThen run this script again")
    exit(1)

# Project IDs from your Vercel dashboard
TEAM_ID = "tm344556-gmailcoms-projects"
FRONTEND_PROJECT = "frontend"
BACKEND_PROJECT = "backend"

VERCEL_API = "https://api.vercel.com"
HEADERS = {
    "Authorization": f"Bearer {VERCEL_TOKEN}",
    "Content-Type": "application/json"
}

def disable_deployment_protection(team_id, project_name):
    """Disable deployment protection for a project"""
    
    url = f"{VERCEL_API}/v1/projects/{project_name}/protection"
    
    payload = {
        "deploymentProtection": {
            "preview": False,
            "production": False
        }
    }
    
    try:
        response = requests.patch(
            url,
            json=payload,
            headers=HEADERS,
            params={"teamId": team_id}
        )
        
        if response.status_code in [200, 204]:
            print(f"✅ Successfully disabled protection for {project_name}")
            return True
        else:
            print(f"❌ Failed for {project_name}: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error disabling protection for {project_name}: {e}")
        return False

def main():
    print("🔧 Disabling Vercel Deployment Protection...\n")
    
    # Disable protection for both projects
    frontend_ok = disable_deployment_protection(TEAM_ID, FRONTEND_PROJECT)
    backend_ok = disable_deployment_protection(TEAM_ID, BACKEND_PROJECT)
    
    print("\n" + "="*50)
    if frontend_ok and backend_ok:
        print("✅ All projects updated successfully!")
        print("\n✅ Projects should now be publicly accessible:")
        print("   Frontend: https://frontend-9w1cbact3-tm344556-gmailcoms-projects.vercel.app")
        print("   Backend: https://backend-lflo310wy-tm344556-gmailcoms-projects.vercel.app")
    else:
        print("⚠️  Some projects failed. Check the errors above.")

if __name__ == "__main__":
    main()
