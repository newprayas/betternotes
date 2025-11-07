#!/bin/bash

# Script to add all subjects to Sanity Studio
echo "🚀 Adding subjects to Sanity Studio..."

# Check if SANITY_API_TOKEN is set
if [ -z "$SANITY_API_TOKEN" ]; then
  echo "❌ Error: SANITY_API_TOKEN environment variable is not set."
  echo "Please set your Sanity API token:"
  echo "export SANITY_API_TOKEN=your_token_here"
  echo ""
  echo "You can get your token from: https://www.sanity.io/manage"
  exit 1
fi

# Run the script
node scripts/add-all-subjects.js

echo ""
echo "✅ Script completed!"