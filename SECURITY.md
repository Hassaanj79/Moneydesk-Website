# Security Measures

This document outlines the comprehensive security measures implemented in the MoneyDesk website.

## 🔒 Security Headers

### HTTP Security Headers (via `next.config.js`)
- **Strict-Transport-Security (HSTS)**: Forces HTTPS connections for 2 years
- **X-Frame-Options**: Prevents clickjacking attacks (DENY)
- **X-Content-Type-Options**: Prevents MIME type sniffing (nosniff)
- **X-XSS-Protection**: Enables browser XSS filtering
- **Referrer-Policy**: Controls referrer information sharing
- **Permissions-Policy**: Restricts browser features (camera, microphone, geolocation)
- **Content-Security-Policy (CSP)**: Restricts resource loading to prevent XSS attacks
- **X-Powered-By**: Removed to hide server technology

## 🛡️ Rate Limiting

### Middleware Protection (`middleware.ts`)
- **General Routes**: 100 requests per 15 minutes per IP
- **API Routes**: 20 requests per 15 minutes per IP
- Automatic cleanup of expired rate limit entries
- IP-based tracking using `x-forwarded-for` header

## ✅ Input Validation & Sanitization

### Security Utilities (`lib/security.ts`)
- **Email Validation**: RFC-compliant email format checking
- **Input Sanitization**: Removes dangerous characters and scripts
- **Length Limits**: Maximum field lengths enforced
- **HTML Escaping**: Prevents XSS in email templates

### Protected Fields
- Name: Max 100 characters
- Email: Max 254 characters (RFC 5321)
- Subject: Max 200 characters
- Message: Max 5000 characters

## 🔐 API Route Security

### Contact Form API (`/api/contact`)
- JSON parsing with error handling
- Input validation and sanitization
- HTML escaping for email templates
- Content-Type verification
- Rate limiting protection

### Newsletter API (`/api/newsletter`)
- Email format validation
- Input sanitization
- HTML escaping for email templates
- Rate limiting protection

## 🌐 CORS Protection

- Restrictive CORS headers
- Configurable allowed origin via `ALLOWED_ORIGIN` environment variable
- Only POST and OPTIONS methods allowed for API routes
- Content-Type header validation

## 🔑 Environment Variables Security

- `.env.local` files are gitignored
- API keys stored securely in environment variables
- Never exposed in client-side code
- Example file provided (`.env.example`)

## 🚫 Attack Prevention

### XSS (Cross-Site Scripting)
- Content Security Policy (CSP)
- Input sanitization
- HTML escaping in email templates
- React's built-in XSS protection

### CSRF (Cross-Site Request Forgery)
- Same-origin policy enforcement
- Content-Type validation
- CORS restrictions

### SQL Injection
- No direct database queries (using localStorage)
- Input validation prevents malicious payloads

### Clickjacking
- X-Frame-Options: DENY
- CSP frame-ancestors: 'none'

### MIME Sniffing
- X-Content-Type-Options: nosniff

### Brute Force Attacks
- Rate limiting on all routes
- Stricter limits on API endpoints

## 📋 Security Best Practices

1. **Always use HTTPS** in production
2. **Keep dependencies updated** regularly
3. **Monitor rate limit violations** for suspicious activity
4. **Review security headers** periodically
5. **Use strong API keys** and rotate them regularly
6. **Never commit** `.env.local` files to version control

## 🔍 Security Testing

To test security headers:
```bash
curl -I https://your-domain.com
```

Check for:
- Strict-Transport-Security
- X-Frame-Options
- Content-Security-Policy
- X-Content-Type-Options

## 📞 Security Issues

If you discover a security vulnerability, please report it to:
- Email: security@moneydesk.co
- Do not disclose publicly until fixed

## 🔄 Regular Security Updates

- Review and update dependencies monthly
- Monitor security advisories
- Update security headers as needed
- Review rate limit thresholds

