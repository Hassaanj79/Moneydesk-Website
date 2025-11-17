-- MoneyDesk Website Database Schema
-- Run this SQL script in your Hostinger MySQL database
-- 
-- IMPORTANT: In Hostinger, you create the database through hPanel, not SQL.
-- After creating the database in hPanel, select it in phpMyAdmin, then run this script.
-- 
-- Steps:
-- 1. Create database in Hostinger hPanel (Databases → MySQL Databases)
-- 2. Open phpMyAdmin and select your database
-- 3. Click on the "SQL" tab
-- 4. Paste and run this script
--
-- Note: Remove the "USE database_name;" line below and replace with your actual database name,
-- OR simply select your database in phpMyAdmin before running this script.

-- Select your database (replace 'your_database_name' with your actual Hostinger database name)
-- USE your_database_name;

-- Blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  excerpt TEXT,
  content LONGTEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  date VARCHAR(100) NOT NULL,
  read_time VARCHAR(50),
  category VARCHAR(255) NOT NULL,
  published BOOLEAN DEFAULT FALSE,
  cover_photo TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_published (published),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_subscribed_at (subscribed_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contact form submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_submitted_at (submitted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Job positions table
CREATE TABLE IF NOT EXISTS job_positions (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  department VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_published (published),
  INDEX idx_department (department),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Job applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id VARCHAR(255) PRIMARY KEY,
  position_id VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  resume_url TEXT,
  cover_letter TEXT,
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (position_id) REFERENCES job_positions(id) ON DELETE CASCADE,
  INDEX idx_position_id (position_id),
  INDEX idx_email (email),
  INDEX idx_applied_at (applied_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Feedback submissions table
CREATE TABLE IF NOT EXISTS feedback_submissions (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  type ENUM('enhancement', 'bug') NOT NULL,
  status ENUM('under-review', 'planned', 'in-progress', 'completed', 'rejected') DEFAULT 'under-review',
  submitted_by VARCHAR(255),
  submitted_by_name VARCHAR(255),
  submitted_by_email VARCHAR(255),
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_type (type),
  INDEX idx_status (status),
  INDEX idx_submitted_at (submitted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Feedback votes table (to track who voted)
CREATE TABLE IF NOT EXISTS feedback_votes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  submission_id VARCHAR(255) NOT NULL,
  user_identifier VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (submission_id) REFERENCES feedback_submissions(id) ON DELETE CASCADE,
  UNIQUE KEY unique_vote (submission_id, user_identifier),
  INDEX idx_submission_id (submission_id),
  INDEX idx_user_identifier (user_identifier)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Feedback comments table
CREATE TABLE IF NOT EXISTS feedback_comments (
  id VARCHAR(255) PRIMARY KEY,
  submission_id VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (submission_id) REFERENCES feedback_submissions(id) ON DELETE CASCADE,
  INDEX idx_submission_id (submission_id),
  INDEX idx_submitted_at (submitted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

