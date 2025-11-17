# Hostinger Database Connection Guide

## Common Issue: ECONNREFUSED Error

If you're getting `ECONNREFUSED`, it usually means the database host is incorrect.

## Finding Your Hostinger MySQL Host

1. **Log into Hostinger hPanel**
2. Go to **Databases** → **MySQL Databases**
3. Find your database in the list
4. Look for the **"Host"** column - it might show:
   - `localhost` (for local connections)
   - `mysql.hostinger.com` (common Hostinger MySQL host)
   - `your-domain.com` (if using custom domain)
   - A specific IP address

## Common Hostinger MySQL Hosts

- **For local development**: Usually `localhost` or `127.0.0.1`
- **For remote connections**: Often `mysql.hostinger.com` or a specific hostname
- **Port**: Usually `3306` (default MySQL port)

## Update Your .env.local

If `localhost` doesn't work, try these alternatives:

### Option 1: Try the Hostinger MySQL hostname
```env
DB_HOST=mysql.hostinger.com
DB_USER=u613360648_Website
DB_PASSWORD=your_password
DB_NAME=u613360648_MDwesite
```

### Option 2: Try with port explicitly
```env
DB_HOST=localhost:3306
DB_USER=u613360648_Website
DB_PASSWORD=your_password
DB_NAME=u613360648_MDwesite
```

### Option 3: Check Hostinger hPanel for exact host
1. In hPanel → Databases → MySQL Databases
2. Click on your database
3. Look for "Host" or "Server" field
4. Use that exact value in `DB_HOST`

## Testing Connection

After updating `.env.local`:
1. Restart your server: `npm run dev`
2. Test: `http://localhost:3001/api/health/db`

## Alternative: Use Hostinger's Remote MySQL

If localhost doesn't work, Hostinger might require:
- Remote MySQL access enabled
- Specific hostname from hPanel
- Different port (check hPanel)

## Still Not Working?

1. Check Hostinger hPanel → Databases → MySQL Databases
2. Verify the exact hostname shown there
3. Make sure remote MySQL access is enabled (if needed)
4. Try connecting via phpMyAdmin first to verify credentials work

