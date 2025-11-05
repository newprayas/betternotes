# Deployment Guide for @Better Notes V2

This guide will help you deploy your @Better Notes V2 website to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. A GitHub, GitLab, or Bitbucket account with your code pushed to a repository
3. A Sanity.io project set up with your content

## Step 1: Set Up Sanity.io

1. Create a new project at [sanity.io](https://sanity.io)
2. Run the following command in your project directory:
   ```bash
   npx @sanity/cli init
   ```
3. Follow the prompts to connect to your Sanity project
4. Deploy the Sanity Studio:
   ```bash
   npm run sanity deploy
   ```
5. Note your Project ID and Dataset from the Sanity dashboard

## Step 2: Configure Environment Variables

1. Create a `.env.local` file in your project root:
   ```bash
   cp .env.local.example .env.local
   ```
2. Fill in your Sanity project details:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

## Step 3: Push to Git Repository

1. Initialize git if you haven't already:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. Create a repository on GitHub/GitLab/Bitbucket
3. Push your code:
   ```bash
   git remote add origin <your-repository-url>
   git push -u origin main
   ```

## Step 4: Deploy to Vercel

1. Log in to your Vercel dashboard
2. Click "Add New..." and select "Project"
3. Import your Git repository
4. Vercel will automatically detect that it's a Next.js project
5. Configure your environment variables in Vercel:
   - Go to Settings → Environment Variables
   - Add your Sanity project ID and dataset
6. Click "Deploy"

## Step 5: Post-Deployment Setup

1. Once deployed, test your website to ensure everything works
2. Set up a custom domain (optional):
   - Go to Project Settings → Domains
   - Add your custom domain
   - Configure DNS records as instructed
3. Set up analytics (optional):
   - Add Google Analytics or Vercel Analytics
   - Update the environment variables if needed

## Environment Variables

Make sure these are set in both your local environment and Vercel:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

Optional variables:
```
SANITY_API_READ_TOKEN=your_read_token_here
SANITY_API_WRITE_TOKEN=your_write_token_here
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## Custom Domain Setup (Optional)

1. Purchase a domain from your preferred registrar
2. In Vercel, go to Project Settings → Domains
3. Add your domain name
4. Configure DNS records:
   - For root domain: Add A record to Vercel's IP
   - For www: Add CNAME record to cname.vercel-dns.com
5. Wait for DNS propagation (can take up to 48 hours)

## Performance Optimization

The application is already optimized for performance with:

- Image optimization with Next.js Image component
- Automatic WebP/AVIF format selection
- Responsive image sizing
- Code splitting and lazy loading
- Static generation where possible

## Monitoring and Maintenance

1. Monitor your Vercel dashboard for:
   - Build errors
   - Performance metrics
   - Usage statistics
2. Regularly update:
   - Dependencies (`npm update`)
   - Sanity content
   - Security patches
3. Set up alerts for:
   - Build failures
   - High error rates
   - Performance degradation

## Troubleshooting

### Build Errors
- Check environment variables are correctly set
- Verify all dependencies are installed
- Review build logs in Vercel dashboard

### Images Not Loading
- Ensure Sanity project ID is correct
- Check image URLs in Sanity Studio
- Verify remotePatterns in next.config.js

### Sanity Content Not Appearing
- Check dataset name matches
- Verify API permissions
- Ensure content is published (not just draft)

## Support

For deployment issues:
1. Check Vercel's documentation
2. Review Sanity's deployment guides
3. Contact support through respective platforms

For application issues:
1. Check the README.md file
2. Review the implementation documentation
3. Contact us on Telegram at @betternotes