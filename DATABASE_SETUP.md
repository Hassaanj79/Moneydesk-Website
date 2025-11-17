# Database Setup Guide for Hostinger MySQL

This guide will help you set up the MySQL database on Hostinger and connect it to your MoneyDesk website.

## Step 1: Create Database in Hostinger

1. Log in to your **Hostinger hPanel**
2. Go to **Databases** → **MySQL Databases**
3. Create a new database (e.g., `moneydesk`)
4. Create a database user and assign it to the database
5. Note down:
   - Database name (e.g., `u123456789_moneydesk`)
   - Database username (e.g., `u123456789_dbuser`)
   - Database password
   - Database host (usually `localhost`)

## Step 2: Import Database Schema

1. In Hostinger hPanel, go to **Databases** → **phpMyAdmin**
2. Select your database from the left sidebar
3. Click on the **SQL** tab
4. Copy and paste the contents of `database/schema.sql`
5. Click **Go** to execute the SQL script
6. Verify that all tables are created:
   - `blogs`
   - `newsletter_subscribers`
   - `contact_submissions`
   - `job_positions`
   - `job_applications`
   - `feedback_submissions`
   - `feedback_votes`
   - `feedback_comments`

## Step 3: Configure Environment Variables

1. Create a `.env.local` file in the root of your project (if it doesn't exist)
2. Add your database credentials:

```env
# Database Configuration (Hostinger MySQL)
DB_HOST=localhost
DB_USER=your_database_username
DB_PASSWORD=your_database_password
DB_NAME=your_database_name

# Email Configuration (Optional - for notifications)
RESEND_API_KEY=your_resend_api_key
SENDGRID_API_KEY=your_sendgrid_api_key
```

**Example:**
```env
DB_HOST=localhost
DB_USER=u123456789_dbuser
DB_PASSWORD=YourSecurePassword123
DB_NAME=u123456789_moneydesk
```

## Step 4: Test Database Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Check the console for any database connection errors
3. Try accessing the admin panel to verify data is loading from the database

## Step 5: Migrate Existing Data (Optional)

If you have existing data in localStorage, you can:

1. Export data from localStorage using browser DevTools
2. Use the admin panels to manually re-add data, OR
3. Create a migration script to import localStorage data into the database

## Troubleshooting

### Connection Issues

- **Error: "Access denied"**: Check your database username and password
- **Error: "Unknown database"**: Verify the database name is correct
- **Error: "Can't connect to MySQL server"**: 
  - Verify the host is correct (usually `localhost` for Hostinger)
  - Check if your hosting plan allows remote MySQL connections
  - Ensure the database user has proper permissions

### Common Hostinger Database Settings

- **Host**: `localhost` (or your Hostinger MySQL host)
- **Port**: `3306` (default MySQL port)
- **Database name format**: Usually starts with `u` followed by numbers (e.g., `u123456789_moneydesk`)
- **Username format**: Usually matches database name format

## API Endpoints

Once set up, your website will use these API endpoints:

- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create/update blog
- `DELETE /api/blogs?id=xxx` - Delete blog
- `GET /api/blogs/[id]` - Get single blog
- `GET /api/newsletter/subscribers` - Get all subscribers
- `POST /api/newsletter/subscribers` - Add subscriber
- `GET /api/contact/submissions` - Get all contact submissions
- `POST /api/contact/submissions` - Create contact submission
- `GET /api/jobs/positions` - Get all job positions
- `POST /api/jobs/positions` - Create/update job position
- `DELETE /api/jobs/positions?id=xxx` - Delete job position
- `GET /api/jobs/applications` - Get all job applications
- `POST /api/jobs/applications` - Create job application
- `GET /api/feedback` - Get all feedback submissions
- `POST /api/feedback` - Create feedback submission
- `PUT /api/feedback` - Update feedback status
- `DELETE /api/feedback?id=xxx` - Delete feedback submission
- `POST /api/feedback/vote` - Vote on feedback
- `POST /api/feedback/comments` - Add comment to feedback

## Security Notes

- Never commit `.env.local` to version control
- Use strong database passwords
- Regularly backup your database
- Keep your database credentials secure

## Support

If you encounter issues:
1. Check Hostinger's documentation for MySQL setup
2. Verify your database credentials in hPanel
3. Check server logs for detailed error messages
4. Ensure your hosting plan supports MySQL databases

