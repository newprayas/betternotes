# Environment Variables for BetterNotes

This document lists all the environment variables needed for deploying BetterNotes to Vercel.

## Required Environment Variables

These variables must be configured in Vercel for the application to work properly:

### 1. Sanity CMS Configuration
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

**How to get these values:**
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Found in your Sanity dashboard at [sanity.io/manage](https://sanity.io/manage)
- `NEXT_PUBLIC_SANITY_DATASET`: Usually "production" unless you created a different dataset

## Optional Environment Variables

These variables enhance functionality but aren't required for basic operation:

### 2. Vercel Environment Detection
```
NEXT_PUBLIC_VERCEL_ENV=preview
```
- Set this to "preview" for preview deployments to enable Sanity Studio's live preview mode
- Can be left unset for production

### 3. Custom Domain (if applicable)
```
NEXT_PUBLIC_SITE_URL=https://your-custom-domain.com
```
- Use this if you have a custom domain configured
- Helps with absolute URL generation

## How to Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Click on the **Settings** tab
3. Select **Environment Variables** from the sidebar
4. Click **Add New** for each variable
5. Enter the variable name and value
6. Choose the environment(s) where it should apply:
   - **Production**: For your live site
   - **Preview**: For pull request previews
   - **Development**: For local development

## Security Notes

- Variables with `NEXT_PUBLIC_` prefix are exposed to the browser
- Never include secret keys or sensitive data in `NEXT_PUBLIC_` variables
- Sanity project IDs are safe to expose as they're not secret

## Testing Your Configuration

After setting up environment variables:

1. Trigger a new deployment
2. Check that Sanity content loads on your pages
3. Verify images from Sanity CDN display correctly
4. Test the Sanity Studio at `/studio` if enabled

## Troubleshooting

### Content Not Loading
- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- Check that the dataset exists in your Sanity project
- Ensure your Sanity project is not blocked by CORS settings

### Images Not Displaying
- Confirm the Sanity project ID matches your image source
- Check that images are properly uploaded in Sanity Studio

### Studio Not Working
- Ensure `NEXT_PUBLIC_VERCEL_ENV=preview` is set for preview deployments
- Verify the studio route is configured in your app