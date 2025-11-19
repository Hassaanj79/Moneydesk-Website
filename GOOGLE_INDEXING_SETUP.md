# Google Indexing Setup Guide

This guide will help you set up your website for Google Search Console and ensure proper indexing.

## ✅ What Has Been Configured

1. **robots.txt** - Created at `/app/robots.ts` (automatically generates `/robots.txt`)
2. **sitemap.xml** - Created at `/app/sitemap.ts` (automatically generates `/sitemap.xml`)
3. **Structured Data (JSON-LD)** - Added Organization, Website, and SoftwareApplication schemas
4. **Enhanced Metadata** - Improved meta tags, Open Graph, and Twitter cards
5. **Canonical URLs** - Added to prevent duplicate content issues
6. **Web Manifest** - Created for PWA support and better mobile experience

## 🔧 Setup Steps

### 1. Set Environment Variable

Add your website URL to your environment variables:

**In Vercel:**
- Go to your project settings → Environment Variables
- Add: `NEXT_PUBLIC_SITE_URL` = `https://moneydesk.co` (or your actual domain)

**Locally (.env.local):**
```
NEXT_PUBLIC_SITE_URL=https://moneydesk.co
```

### 2. Verify Your Website in Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add Property"
3. Enter your website URL (e.g., `https://moneydesk.co`)
4. Choose a verification method:
   - **HTML tag method** (Recommended):
     - Copy the verification code provided
     - Add it to `app/layout.tsx` in the `verification` object:
     ```typescript
     verification: {
       google: 'your-verification-code-here',
     },
     ```
   - **HTML file method**:
     - Download the HTML file
     - Place it in `/public/` directory
   - **DNS method**:
     - Add the TXT record to your domain's DNS settings

### 3. Submit Your Sitemap

1. After verification, go to "Sitemaps" in Google Search Console
2. Enter: `sitemap.xml`
3. Click "Submit"

### 4. Request Indexing

1. Go to "URL Inspection" tool
2. Enter your homepage URL
3. Click "Request Indexing"
4. Repeat for important pages:
   - `/about`
   - `/features`
   - `/pricing`
   - `/contact`

### 5. Check for Errors

1. Go to "Coverage" report
2. Check for any errors or warnings
3. Fix any issues found

## 📋 Common Issues & Solutions

### Issue: "Sitemap could not be read"
**Solution:** 
- Ensure `NEXT_PUBLIC_SITE_URL` is set correctly
- Wait a few minutes after deployment
- Check that `/sitemap.xml` is accessible (visit `https://yourdomain.com/sitemap.xml`)

### Issue: "robots.txt not found"
**Solution:**
- Ensure `app/robots.ts` exists
- Visit `https://yourdomain.com/robots.txt` to verify it's generated
- Wait a few minutes after deployment

### Issue: "Page not indexed"
**Solution:**
- Use "URL Inspection" tool to request indexing
- Check that the page has proper meta tags
- Ensure the page is linked from other pages on your site
- Check robots.txt isn't blocking the page

### Issue: "Structured data errors"
**Solution:**
- Use [Google's Rich Results Test](https://search.google.com/test/rich-results)
- Fix any schema markup errors
- Ensure JSON-LD is valid

## 🔍 Testing Your Setup

### Test Your Sitemap
Visit: `https://yourdomain.com/sitemap.xml`

### Test Your Robots.txt
Visit: `https://yourdomain.com/robots.txt`

### Test Structured Data
1. Go to [Rich Results Test](https://search.google.com/test/rich-results)
2. Enter your URL
3. Check for any errors

### Test Mobile-Friendliness
1. Go to [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
2. Enter your URL
3. Fix any issues found

## 📊 Monitoring

After setup, regularly check:
- **Coverage Report** - For indexing issues
- **Performance Report** - For search analytics
- **Enhancements** - For structured data issues
- **Mobile Usability** - For mobile issues

## 🚀 Next Steps

1. ✅ Set `NEXT_PUBLIC_SITE_URL` environment variable
2. ✅ Verify your website in Google Search Console
3. ✅ Submit your sitemap
4. ✅ Request indexing for important pages
5. ✅ Monitor for errors and fix them
6. ✅ Wait 1-2 weeks for Google to crawl and index your site

## 📝 Notes

- It can take 1-2 weeks for Google to fully index your website
- New pages may take a few days to appear in search results
- Regularly update your sitemap when adding new pages
- Keep your content fresh and updated
- Build quality backlinks to improve search rankings

## 🔗 Useful Links

- [Google Search Console](https://search.google.com/search-console)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Schema.org Documentation](https://schema.org/)

