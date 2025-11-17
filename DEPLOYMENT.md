# Deployment Guide for MoneyDesk Website

## Environment Variables Required

You **MUST** set these environment variables in your Vercel project settings:

### Database Configuration
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

```
DB_HOST=srv636.hstgr.io
DB_USER=u613360648_Website
DB_PASSWORD=your_password_here
DB_NAME=u613360648_MDwesite
```

### Email Configuration (Optional but Recommended)
```
RESEND_API_KEY=your_resend_api_key
# OR
SENDGRID_API_KEY=your_sendgrid_api_key
```

## Steps to Deploy

1. **Set Environment Variables in Vercel**
   - Go to https://vercel.com/dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add all the variables listed above
   - Make sure to set them for **Production**, **Preview**, and **Development** environments

2. **Enable Remote MySQL Access in Hostinger**
   - Log in to Hostinger hPanel
   - Go to **Databases** → **Remote MySQL**
   - Add Vercel's IP addresses (or use `%` to allow all IPs for testing)
   - **Important**: Vercel uses dynamic IPs, so you may need to allow all IPs (`%`) or use Hostinger's IP whitelist feature

3. **Redeploy After Setting Variables**
   - After adding environment variables, trigger a new deployment
   - Go to **Deployments** tab
   - Click **Redeploy** on the latest deployment
   - Or push a new commit to trigger automatic deployment

## Troubleshooting

### Database Connection Fails
- Check that environment variables are set correctly in Vercel
- Verify Remote MySQL is enabled in Hostinger for the deployment IP
- Check Vercel function logs: **Deployments** → Click on deployment → **Functions** tab

### API Routes Return 500 Errors
- Check Vercel function logs for detailed error messages
- Verify database credentials are correct
- Ensure database tables exist (run `database/schema.sql`)

### Forms Not Submitting
- Check browser console for errors
- Verify API routes are accessible: `https://your-domain.com/api/health/db`
- Check network tab in browser DevTools

## Testing Deployment

1. **Test Database Connection**
   ```
   https://your-domain.com/api/health/db
   ```
   Should return: `{"status":"success","connected":true}`

2. **Test Feedback Submission**
   - Go to `/feedback` page
   - Submit a test feedback
   - Check if it appears in the database

3. **Check Vercel Logs**
   - Go to Vercel Dashboard → Your Project → **Logs**
   - Look for any errors related to database or API routes

## Important Notes

- Environment variables are **NOT** committed to Git (they're in `.env.local` which is gitignored)
- You must manually add them in Vercel dashboard
- After adding variables, you need to redeploy for them to take effect
- Database connection uses connection pooling for better performance

