-- Fix cover_photo column size to support large base64 images
-- Run this SQL script in your Hostinger MySQL database

ALTER TABLE blogs MODIFY COLUMN cover_photo LONGTEXT;

