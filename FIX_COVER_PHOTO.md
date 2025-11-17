# Fix for Broken Thumbnail Images

## Problem
Cover photos (thumbnails) were appearing broken after upload because the database column `cover_photo` was defined as `TEXT`, which has a maximum size of 65,535 bytes. Base64-encoded images easily exceed this limit.

## Solution

### Step 1: Update Database Schema
Run the SQL script to change the `cover_photo` column from `TEXT` to `LONGTEXT`:

**File:** `database/fix_cover_photo.sql`

```sql
ALTER TABLE blogs MODIFY COLUMN cover_photo LONGTEXT;
```

**How to run:**
1. Log into your Hostinger hPanel
2. Open phpMyAdmin
3. Select your database
4. Click on the "SQL" tab
5. Copy and paste the SQL command above
6. Click "Go" to execute

### Step 2: Code Changes (Already Applied)
The following improvements have been made:

1. **Image size limit reduced** from 5MB to 2MB to prevent database issues
2. **Better error handling** for image uploads
3. **File type validation** for image formats
4. **Base64 size checking** before saving
5. **Improved error messages** in the API route

### Step 3: Test
After running the SQL script:

1. Go to `/admin/blog`
2. Create or edit a blog post
3. Upload a cover photo (max 2MB)
4. Save the blog
5. Check that the thumbnail displays correctly on the blog listing page

## Notes
- The `LONGTEXT` column type can store up to 4GB of data, which is more than sufficient for base64-encoded images
- Images are stored as base64 data URLs (e.g., `data:image/jpeg;base64,...`)
- The 2MB file size limit ensures reasonable performance and database size

