# Vercel Deployment Setup Guide

## ⚠️ CRITICAL: Environment Variables Must Be Set

Your deployment is failing because **environment variables are not set in Vercel**.

## Step-by-Step Setup

### 1. Set Environment Variables in Vercel

1. Go to https://vercel.com/dashboard
2. Click on your **Moneydesk-Website** project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New** and add these **4 variables**:

```
Name: DB_HOST
Value: srv636.hstgr.io
Environment: Production, Preview, Development (select all)

Name: DB_USER
Value: u613360648_Website
Environment: Production, Preview, Development (select all)

Name: DB_PASSWORD
Value: [Your actual password from Hostinger]
Environment: Production, Preview, Development (select all)

Name: DB_NAME
Value: u613360648_MDwesite
Environment: Production, Preview, Development (select all)
```

### 2. Enable Remote MySQL in Hostinger

1. Log in to Hostinger hPanel
2. Go to **Databases** → **Remote MySQL**
3. Add access for Vercel IPs:
   - Option 1: Add `%` to allow all IPs (less secure but easier)
   - Option 2: Add specific Vercel IP ranges (more secure)
4. **Save** the changes

### 3. Redeploy Your Application

After setting environment variables:

1. Go to Vercel Dashboard → Your Project
2. Click **Deployments** tab
3. Click the **⋯** (three dots) on the latest deployment
4. Click **Redeploy**
5. Wait for deployment to complete

### 4. Test the Deployment

1. Visit: `https://your-domain.com/api/health/db`
2. Should return: `{"status":"success","connected":true}`
3. If it fails, check the error message

## Common Issues

### Issue: "Database connection failed"
**Solution**: 
- Verify environment variables are set correctly
- Check Remote MySQL is enabled in Hostinger
- Ensure database credentials are correct

### Issue: "ER_ACCESS_DENIED_ERROR"
**Solution**:
- The database user doesn't have remote access
- Go to Hostinger → Remote MySQL → Add your IP or `%`

### Issue: "ECONNREFUSED"
**Solution**:
- Check DB_HOST is correct: `srv636.hstgr.io`
- Verify Remote MySQL is enabled
- Check if Hostinger allows connections from Vercel IPs

### Issue: Forms not submitting
**Solution**:
- Check browser console (F12) for errors
- Check Vercel function logs: Deployments → Functions tab
- Verify API routes are accessible

## How to Check Vercel Logs

1. Go to Vercel Dashboard → Your Project
2. Click **Deployments** tab
3. Click on a deployment
4. Click **Functions** tab
5. Click on any API route (e.g., `/api/feedback`)
6. Check the **Logs** section for errors

## Quick Test Commands

After deployment, test these URLs:

```
https://your-domain.com/api/health/db
https://your-domain.com/api/blogs
https://your-domain.com/api/feedback
```

All should return JSON responses, not errors.

## Still Having Issues?

1. Check Vercel function logs (see above)
2. Verify all 4 environment variables are set
3. Ensure Remote MySQL is enabled in Hostinger
4. Try redeploying after making changes

