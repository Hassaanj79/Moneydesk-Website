# Database Connection Troubleshooting Guide

## Common Issues and Solutions

### 1. Environment Variables Not Loaded
**Problem**: Next.js needs to be restarted after adding/changing `.env.local`

**Solution**: 
- Stop the server (Ctrl+C)
- Restart: `npm run dev`
- Try the health check again

### 2. Wrong Database Host
**Problem**: Hostinger might use a different host than `localhost`

**Solution**: Check your Hostinger database details:
- In hPanel → Databases → MySQL Databases
- Look for "Host" - it might be something like:
  - `localhost` (most common)
  - `mysql.hostinger.com`
  - `your-domain.com` (if using a custom domain)

### 3. Database Credentials
**Problem**: Incorrect username, password, or database name

**Solution**: Double-check in Hostinger hPanel:
- Database name format: Usually `u123456789_moneydesk`
- Username format: Usually matches database name or `u123456789_dbuser`
- Password: Copy exactly as shown (case-sensitive)

### 4. Database Port
**Problem**: Hostinger might use a non-standard port

**Solution**: Add port to `.env.local`:
```env
DB_HOST=localhost:3306
# OR if Hostinger uses a different port
DB_HOST=your-host:3307
```

### 5. Connection Timeout
**Problem**: Database server not accessible

**Solution**: 
- Verify database is active in Hostinger
- Check if your hosting plan allows MySQL connections
- Try connecting via phpMyAdmin to verify credentials work

## Check Your .env.local File

Make sure your `.env.local` looks like this:

```env
DB_HOST=localhost
DB_USER=your_hostinger_username
DB_PASSWORD=your_hostinger_password
DB_NAME=your_hostinger_database_name
```

**Important**: 
- No quotes around values
- No spaces around `=`
- Use exact values from Hostinger

## Test Connection Steps

1. **Check environment variables are loaded:**
   Visit: `http://localhost:3001/api/health/db`
   Look at the `envCheck` field in the error response

2. **Check server logs:**
   Look at your terminal where `npm run dev` is running
   You should see detailed error messages

3. **Verify credentials:**
   Try logging into phpMyAdmin with the same credentials
   If phpMyAdmin works but the app doesn't, it's likely a connection string issue

## Common Error Codes

- **ER_ACCESS_DENIED_ERROR**: Wrong username or password
- **ER_BAD_DB_ERROR**: Database doesn't exist
- **ECONNREFUSED**: Can't connect to host (wrong host or port)
- **ETIMEDOUT**: Connection timeout (host might be wrong)

## Still Having Issues?

1. Check the detailed error response from `/api/health/db`
2. Look at the `code` field for MySQL error codes
3. Check the `envCheck` to see which variables are missing
4. Verify credentials in Hostinger hPanel
5. Try connecting via phpMyAdmin first to confirm credentials work

