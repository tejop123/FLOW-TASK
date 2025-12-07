@echo off
REM Manual steps to disable Vercel Deployment Protection

echo.
echo ========================================
echo Vercel Deployment Protection Fix
echo ========================================
echo.
echo Your projects are currently blocked by Vercel's deployment protection.
echo.
echo Follow these steps to fix:
echo.
echo 1. FRONTEND PROJECT:
echo    - Open: https://vercel.com/tm344556-gmailcoms-projects/frontend/settings
echo    - Go to: "Deployment Protection" 
echo    - Find: "Require Authentication"
echo    - Toggle it: OFF
echo    - Save changes
echo.
echo 2. BACKEND PROJECT:
echo    - Open: https://vercel.com/tm344556-gmailcoms-projects/backend/settings
echo    - Go to: "Deployment Protection"
echo    - Check current setting for Production/Preview
echo    - Set to: "Public" or toggle "Require Authentication" OFF
echo    - Save changes
echo.
echo 3. Wait 1-2 minutes for changes to propagate
echo.
echo 4. Verify connection:
echo    - Frontend: https://frontend-9w1cbact3-tm344556-gmailcoms-projects.vercel.app
echo    - Backend: https://backend-lflo310wy-tm344556-gmailcoms-projects.vercel.app
echo.
echo ========================================
echo.
pause
