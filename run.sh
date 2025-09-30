#!/bin/bash

# Alien Numerals Converter - Development Script
# สคริปต์สำหรับเริ่มต้น Alien Numerals Converter

echo "🚀 Starting Alien Numerals Converter..."
echo "=================================="

# ตรวจสอบ Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "📥 Please download and install Node.js from: https://nodejs.org/"
    echo "💡 Required version: Node.js 16 or higher"
    exit 1
fi

# ตรวจสอบ npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    echo "📥 npm should come with Node.js installation"
    exit 1
fi

# แสดงเวอร์ชัน Node.js และ npm
echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# ตรวจสอบว่ามี Angular CLI หรือไม่
if ! command -v ng &> /dev/null; then
    echo "⚠️  Angular CLI is not installed globally"
    echo "🔧 Installing Angular CLI locally for this project..."
    
    # ติดตั้ง Angular CLI เป็น dev dependency
    npm install --save-dev @angular/cli@^17.0.0
    
    if [ $? -eq 0 ]; then
        echo "✅ Angular CLI installed successfully!"
    else
        echo "❌ Failed to install Angular CLI"
        exit 1
    fi
else
    echo "✅ Angular CLI is already installed: $(ng version --json | grep \"@angular/cli\" | cut -d'\"' -f4)"
fi

echo ""

# ตรวจสอบว่ามี node_modules หรือไม่
if [ ! -d "node_modules" ]; then
    echo "📦 Installing project dependencies..."
    npm install
    
    if [ $? -eq 0 ]; then
        echo "✅ Dependencies installed successfully!"
    else
        echo "❌ Failed to install dependencies"
        echo "💡 Try running: npm install --legacy-peer-deps"
        exit 1
    fi
else
    echo "✅ Dependencies already installed"
fi

echo ""

# ตรวจสอบ Angular CLI path
if command -v ng &> /dev/null; then
    # ใช้ Angular CLI ที่ติดตั้ง globally
    NG_CMD="ng"
elif [ -f "node_modules/.bin/ng" ]; then
    # ใช้ Angular CLI ที่ติดตั้ง locally
    NG_CMD="./node_modules/.bin/ng"
    echo "🔧 Using local Angular CLI"
else
    # ใช้ npx เป็นทางเลือกสุดท้าย
    NG_CMD="npx ng"
    echo "🔧 Using npx to run Angular CLI"
fi

echo ""

# เริ่มต้น development server
echo "🌐 Starting development server..."
echo "📱 Open your browser to: http://localhost:4200/alien"
echo "🔄 The app will automatically reload when you make changes"
echo "⏹️  Press Ctrl+C to stop the server"
echo ""
echo "=================================="

# รัน Angular development server
if [[ "$NG_CMD" == "npx ng" ]]; then
    npx ng serve --open
elif [[ "$NG_CMD" == "./node_modules/.bin/ng" ]]; then
    ./node_modules/.bin/ng serve --open
else
    ng serve --open
fi