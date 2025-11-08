# Quick Deploy: BetterNotes to Vercel

## 🚀 Fast Track Deployment

### 1. Create New GitHub Repository
- Go to [GitHub](https://github.com) → New repository
- Name: `betternotes`
- Don't initialize with README

### 2. Run Setup Script
```bash
cd betternotes
./scripts/setup-new-repo.sh
```
Follow the prompts to push to your new repository.

### 3. Deploy to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import `betternotes` repository
4. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID
   - `NEXT_PUBLIC_SANITY_DATASET`: `production`
5. Click "Deploy"

### ✅ Done!
Your site will be live at `your-project-name.vercel.app`

## 📚 Detailed Documentation
- [Full Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Environment Variables](./ENVIRONMENT_VARIABLES.md)

## 🔧 What We Changed
- Updated `vercel.json` to correctly build from the betternotes/ subdirectory
- Created deployment scripts and documentation
- No changes to your Sanity configuration or app logic
- The repository structure remains: root/ → betternotes/ (Next.js app)