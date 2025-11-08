# Deployment Guide: BetterNotes to Vercel

This guide will help you deploy your BetterNotes application to Vercel using a new repository called "betternotes".

## Current Status
- Your project is already initialized with Git
- The current remote repository is: `https://github.com/newprayas/better-notes-v2.git`
- Vercel configuration has been updated for the correct project structure
- The Next.js app is located in the `betternotes/` subdirectory

## Step 1: Create a New GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" button in the top right corner and select "New repository"
3. Name the repository: `betternotes`
4. Choose your preferred visibility (Public or Private)
5. **Do not** initialize with README, .gitignore, or license (since we already have code)
6. Click "Create repository"

## Step 2: Update Git Remote and Push to New Repository

Run these commands in your terminal (from the betternotes directory):

```bash
# Remove the old remote
git remote remove origin

# Add the new repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/betternotes.git

# Add the updated vercel.json file
git add vercel.json

# Commit the changes
git commit -m "Update vercel.json for direct deployment"

# Push to the new repository
git push -u origin main
```

## Step 3: Connect to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import the `betternotes` repository from GitHub
4. Vercel will automatically detect it's a Next.js project
5. Click "Deploy"

## Step 4: Configure Environment Variables

In your Vercel project settings, add these environment variables:

### Required Environment Variables:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID (from sanity.config.ts)
- `NEXT_PUBLIC_SANITY_DATASET`: Your Sanity dataset (usually "production")

### Optional Environment Variables:
- `NEXT_PUBLIC_VERCEL_ENV`: Set to "preview" for preview deployments

To add environment variables:
1. Go to your Vercel project dashboard
2. Click "Settings" tab
3. Click "Environment Variables"
4. Add each variable with its value

## Step 5: Deploy

After configuring environment variables:
1. Go to the "Deployments" tab
2. Click "Redeploy" or push a new commit to trigger deployment

## Architecture Notes

Your application uses:
- **Next.js 16**: Modern React framework with excellent Vercel support
- **Sanity CMS**: Headless CMS for content management
- **Tailwind CSS**: For styling
- **TypeScript**: For type safety

This architecture is perfectly suited for Vercel deployment and requires no changes.

## Troubleshooting

If you encounter issues:
1. Check that all environment variables are correctly set in Vercel
2. Ensure your Sanity project is accessible
3. Check the deployment logs in Vercel for specific error messages
4. Make sure the build command `npm run build` completes successfully

## Success Indicators

Your deployment is successful when:
- Vercel shows a green checkmark for your deployment
- The site loads at the provided Vercel URL
- Sanity content appears correctly on your pages
- All images and assets load properly