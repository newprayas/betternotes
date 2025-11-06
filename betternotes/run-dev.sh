#!/bin/bash

# Development runner for Better Notes
# This script helps you run both Next.js and Sanity Studio

echo "🚀 Starting Better Notes Development Environment..."
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  Warning: .env.local file not found!"
    echo "   Please create it with your Sanity credentials:"
    echo "   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id"
    echo "   NEXT_PUBLIC_SANITY_DATASET=production"
    echo ""
    read -p "Press Enter to continue anyway..."
fi

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Check if ports are available
if check_port 3000; then
    echo "⚠️  Port 3000 is already in use. Please stop the other process."
    exit 1
fi

if check_port 3333; then
    echo "⚠️  Port 3333 is already in use. Please stop the other process."
    exit 1
fi

echo "✅ Ports 3000 and 3333 are available"
echo ""

# Create a new terminal for Next.js (macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
    osascript -e 'tell app "Terminal" to do script "cd '"$(pwd)"' && npm run dev"'
    echo "✅ Started Next.js in new terminal (http://localhost:3000)"
    
    # Wait a moment for Next.js to start
    sleep 3
    
    # Start Sanity Studio in current terminal
    echo "🎯 Starting Sanity Studio in this terminal..."
    npm run studio
else
    # For Linux/Windows, provide manual instructions
    echo "Please open two terminals and run:"
    echo ""
    echo "Terminal 1: npm run dev"
    echo "Terminal 2: npm run studio"
    echo ""
    echo "Starting Sanity Studio in this terminal..."
    npm run studio
fi