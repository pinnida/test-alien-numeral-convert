@echo off
REM Alien Numerals Converter - Development Script for Windows
echo 🚀 Starting Alien Numerals Converter...
echo ==================================

REM ตรวจสอบ Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed!
    echo 📥 Please download and install Node.js from: https://nodejs.org/
    echo 💡 Required version: Node.js 16 or higher
    pause
    exit /b 1
)

REM ตรวจสอบ npm
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is not installed!
    echo 📥 npm should come with Node.js installation
    pause
    exit /b 1
)

echo ✅ Node.js version:
node --version
echo ✅ npm version:
npm --version
echo.

REM ตรวจสอบ Angular CLI
ng version >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Angular CLI is not installed globally
    echo 🔧 Installing Angular CLI locally for this project...
    npm install --save-dev @angular/cli@^17.0.0
    if errorlevel 1 (
        echo ❌ Failed to install Angular CLI
        pause
        exit /b 1
    )
    echo ✅ Angular CLI installed successfully!
) else (
    echo ✅ Angular CLI is already installed
)

echo.

REM ติดตั้ง dependencies
if not exist "node_modules" (
    echo 📦 Installing project dependencies...
    npm install
    if errorlevel 1 (
        echo ❌ Failed to install dependencies
        echo 💡 Try running: npm install --legacy-peer-deps
        pause
        exit /b 1
    )
    echo ✅ Dependencies installed successfully!
) else (
    echo ✅ Dependencies already installed
)

echo.

REM เริ่มต้น development server
echo 🌐 Starting development server...
echo 📱 Open your browser to: http://localhost:4200/alien
echo 🔄 The app will automatically reload when you make changes
echo ⏹️  Press Ctrl+C to stop the server
echo.
echo ==================================

REM รัน Angular development server
if exist "node_modules\.bin\ng.cmd" (
    node_modules\.bin\ng serve --open
) else (
    npx ng serve --open
)

pause