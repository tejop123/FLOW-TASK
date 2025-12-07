#!/usr/bin/env python3
"""
Disable Vercel Deployment Protection using Vercel API
Requires VERCEL_TOKEN environment variable
"""

import subprocess
import json
import sys

def get_vercel_token():
    """Get Vercel token from CLI"""
    try:
        result = subprocess.run(
            ['vercel', 'whoami', '--token'],
            capture_output=True,
            text=True
        )
        if result.returncode == 0:
            return result.stdout.strip()
    except:
        pass
    return None

def main():
    print("🔧 Disabling Vercel Deployment Protection\n")
    
    # Project IDs
    frontend_id = "prj_qeZYeZElFh4ckKTNJYlVM7MNFRrH"
    backend_id = "prj_yadxxYcVvFYT9nKfjYEi8v2E"  # You'll need to add this
    org_id = "team_8KyRobnOeOQ4Ty7zGnCn4VyE"
    
    print("Frontend Project ID:", frontend_id)
    print("Organization ID:", org_id)
    print("\n⚠️  To disable protection, you need to:")
    print("1. Visit Vercel Dashboard")
    print("2. Go to each project Settings → Deployment Protection")
    print("3. Toggle 'Require Authentication' to OFF")
    print("\nOr use the Vercel CLI:")
    print("   vercel project inspect <project-id> --token <your-token>")

if __name__ == "__main__":
    main()
