#!/bin/bash

# Setup script for deploying BetterNotes to a new repository
# This script helps you migrate from the current repo to a new "betternotes" repository

echo "🚀 BetterNotes Repository Setup Script"
echo "======================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the betternotes directory"
    exit 1
fi

# Get GitHub username
echo "Please enter your GitHub username:"
read username

if [ -z "$username" ]; then
    echo "❌ Error: GitHub username is required"
    exit 1
fi

echo ""
echo "⚠️  IMPORTANT: Make sure you've already created a new repository named 'betternotes' on GitHub"
echo "   Repository URL: https://github.com/$username/betternotes"
echo ""
read -p "Have you created the repository? (y/n): " confirm

if [ "$confirm" != "y" ]; then
    echo "❌ Please create the repository first and then run this script again"
    exit 1
fi

echo ""
echo "🔄 Updating Git remote configuration..."

# Remove old remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/$username/betternotes.git

echo "✅ Git remote updated to: https://github.com/$username/betternotes.git"

# Stage and commit changes
echo ""
echo "📝 Staging and committing changes..."

git add vercel.json DEPLOYMENT_GUIDE.md scripts/setup-new-repo.sh

git commit -m "Update configuration for new repository deployment

- Updated vercel.json for direct deployment
- Added deployment guide
- Added repository setup script"

echo "✅ Changes committed"

# Push to new repository
echo ""
echo "📤 Pushing to new repository..."

git push -u origin main

echo ""
echo "🎉 Success! Your code is now in the new repository"
echo ""
echo "Next steps:"
echo "1. Go to https://vercel.com/dashboard"
echo "2. Click 'Add New...' → 'Project'"
echo "3. Import the 'betternotes' repository"
echo "4. Configure environment variables (see DEPLOYMENT_GUIDE.md)"
echo "5. Deploy!"
echo ""