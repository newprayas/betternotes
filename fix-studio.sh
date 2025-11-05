#!/bin/bash

# Fix Sanity Studio Issues Script
echo "🔧 Fixing Sanity Studio Issues..."
echo "================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the betternotes directory"
    exit 1
fi

echo "🧹 Cleaning up..."

# Clear Next.js cache
rm -rf .next

echo "📝 Checking environment variables..."

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local file not found. Creating from example..."
    cp .env.local.example .env.local
    echo ""
    echo "⚠️  IMPORTANT: You need to edit .env.local and add your actual Sanity tokens!"
    echo "   Visit: https://www.sanity.io/manage/personal/project/t1y8nndf/api/tokens"
    echo ""
    read -p "Press Enter after you've updated .env.local with real tokens..."
fi

# Check if tokens are still placeholders
if grep -q "your_read_token_here" .env.local; then
    echo ""
    echo "❌ ISSUE FOUND: You still have placeholder tokens in .env.local"
    echo ""
    echo "To fix this:"
    echo "1. Go to: https://www.sanity.io/manage/personal/project/t1y8nndf/api/tokens"
    echo "2. Create or copy your API tokens"
    echo "3. Edit .env.local and replace:"
    echo "   SANITY_API_READ_TOKEN=your_read_token_here"
    echo "   SANITY_API_WRITE_TOKEN=your_write_token_here"
    echo "   With your actual tokens"
    echo ""
    echo "4. Then run this script again"
    echo ""
    read -p "Press Enter after you've added real tokens..."
fi

echo ""
echo "🚀 Starting development server..."
echo "   Next.js App: http://localhost:3000"
echo "   Sanity Studio: http://localhost:3000/studio"
echo ""
echo "If Studio still doesn't work, check TROUBLESHOOTING_SANITY_STUDIO.md"
echo ""

npm run dev