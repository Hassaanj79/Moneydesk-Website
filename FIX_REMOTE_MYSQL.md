# 🔧 Fix: Remote MySQL Access Denied

## The Problem
Your environment variables are set correctly ✅, but Hostinger is blocking Vercel's IP address.

**Error:** `Access denied for user 'u613360648_Website'@'98.92.94.151'`

This means Vercel's server (`98.92.94.151`) is not allowed to connect to your Hostinger database.

## The Solution: Enable Remote MySQL in Hostinger

### Step 1: Log in to Hostinger
1. Go to https://hpanel.hostinger.com
2. Log in with your Hostinger account

### Step 2: Enable Remote MySQL Access
1. In hPanel, go to **Databases** → **Remote MySQL**
2. You'll see a section to add allowed IP addresses

### Step 3: Add Vercel's IP Address

**Option A: Allow All IPs (Easiest - Recommended for Testing)**
- In the "Access Hosts" field, enter: `%`
- Click **Add** or **Save**
- This allows connections from any IP address

**Option B: Add Specific Vercel IPs (More Secure)**
- Add the current Vercel IP: `98.92.94.151`
- Click **Add**
- **Note:** Vercel uses dynamic IPs, so you may need to add multiple IPs over time

**Option C: Add Vercel IP Ranges (Best for Production)**
Vercel uses multiple IP ranges. You can add:
- `76.76.21.0/24`
- `76.223.126.0/24`
- Or contact Vercel support for their current IP ranges

### Step 4: Verify the Change
1. After adding the IP, wait 1-2 minutes for changes to propagate
2. Go back to your Vercel deployment
3. Visit: `https://your-domain.com/api/health/db`
4. Should now show: `{"status":"success","connected":true}`

## Visual Guide

```
Hostinger hPanel
  └── Databases
      └── Remote MySQL
          └── Access Hosts
              └── Enter: %
              └── Click: Add
```

## Important Notes

- **`%` means "allow all IPs"** - Use this for testing/development
- Changes may take 1-2 minutes to take effect
- If using specific IPs, you may need to update them if Vercel changes IPs
- For production, consider using IP ranges or contacting Hostinger support

## Still Not Working?

1. **Double-check** the Remote MySQL setting is saved in Hostinger
2. **Wait** 2-3 minutes for DNS/propagation
3. **Try redeploying** in Vercel after adding the IP
4. **Check** if your Hostinger plan allows Remote MySQL (some plans don't)
5. **Contact Hostinger support** if Remote MySQL option is not available

## Alternative Solution

If Remote MySQL is not available in your Hostinger plan, you may need to:
1. Upgrade your Hostinger plan, OR
2. Use a different database provider (like PlanetScale, Supabase, or Railway), OR
3. Use Vercel's serverless database options

