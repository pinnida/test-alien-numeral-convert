#!/bin/bash

# Alien Numerals Converter - Development Script
echo "🚀 Starting Alien Numerals Converter..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the development server
echo "🌐 Starting development server..."
echo "📱 Open your browser to: http://localhost:4200/alien"
echo "⏹️  Press Ctrl+C to stop the server"
echo ""

npm start
