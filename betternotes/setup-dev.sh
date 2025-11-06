#!/bin/bash

# Better Notes - Quick Development Setup Script
# This script sets up your development environment automatically

echo "🚀 Setting up Better Notes Development Environment..."
echo "=================================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the betternotes directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "📝 Creating environment file..."
    cp .env.local.example .env.local
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env.local and add your Sanity project details:"
    echo "   - NEXT_PUBLIC_SANITY_PROJECT_ID=t1y8nndf"
    echo "   - NEXT_PUBLIC_SANITY_DATASET=production"
    echo ""
    read -p "Press Enter after you've updated .env.local..."
else
    echo "✅ Environment file already exists"
fi

# Start the development server
echo ""
echo "🎉 Starting development server..."
echo "   Next.js App: http://localhost:3000"
echo "   Sanity Studio: http://localhost:3000/studio"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev