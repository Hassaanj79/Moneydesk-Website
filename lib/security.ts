/**
 * Security utilities for input validation and sanitization
 */

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Maximum lengths
const MAX_LENGTHS = {
  name: 100,
  email: 254,
  subject: 200,
  message: 5000,
};

/**
 * Sanitize string input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }
  
  return input
    .replace(/[<>]/g, '') // Remove < and > characters
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers like onclick=
    .trim()
    .slice(0, 5000); // Max length limit
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  if (typeof email !== 'string') {
    return false;
  }
  
  if (email.length > MAX_LENGTHS.email) {
    return false;
  }
  
  return EMAIL_REGEX.test(email);
}

/**
 * Validate and sanitize contact form input
 */
export function validateContactForm(data: {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
}): { isValid: boolean; errors: string[]; sanitized?: {
  name: string;
  email: string;
  subject: string;
  message: string;
}} {
  const errors: string[] = [];
  
  // Validate name
  if (!data.name || typeof data.name !== 'string') {
    errors.push('Name is required');
  } else if (data.name.trim().length === 0) {
    errors.push('Name cannot be empty');
  } else if (data.name.length > MAX_LENGTHS.name) {
    errors.push(`Name must be less than ${MAX_LENGTHS.name} characters`);
  }
  
  // Validate email
  if (!data.email || typeof data.email !== 'string') {
    errors.push('Email is required');
  } else if (!isValidEmail(data.email)) {
    errors.push('Invalid email format');
  }
  
  // Validate subject
  if (!data.subject || typeof data.subject !== 'string') {
    errors.push('Subject is required');
  } else if (data.subject.trim().length === 0) {
    errors.push('Subject cannot be empty');
  } else if (data.subject.length > MAX_LENGTHS.subject) {
    errors.push(`Subject must be less than ${MAX_LENGTHS.subject} characters`);
  }
  
  // Validate message
  if (!data.message || typeof data.message !== 'string') {
    errors.push('Message is required');
  } else if (data.message.trim().length === 0) {
    errors.push('Message cannot be empty');
  } else if (data.message.length > MAX_LENGTHS.message) {
    errors.push(`Message must be less than ${MAX_LENGTHS.message} characters`);
  }
  
  if (errors.length > 0) {
    return { isValid: false, errors };
  }
  
  // Sanitize inputs
  return {
    isValid: true,
    errors: [],
    sanitized: {
      name: sanitizeInput(data.name as string).slice(0, MAX_LENGTHS.name),
      email: (data.email as string).toLowerCase().trim().slice(0, MAX_LENGTHS.email),
      subject: sanitizeInput(data.subject as string).slice(0, MAX_LENGTHS.subject),
      message: sanitizeInput(data.message as string).slice(0, MAX_LENGTHS.message),
    },
  };
}

/**
 * Validate newsletter subscription input
 */
export function validateNewsletterForm(data: {
  email?: unknown;
  date?: unknown;
  subscribedAt?: unknown;
}): { isValid: boolean; errors: string[]; sanitized?: {
  email: string;
  date: string;
  subscribedAt: string;
}} {
  const errors: string[] = [];
  
  // Validate email
  if (!data.email || typeof data.email !== 'string') {
    errors.push('Email is required');
  } else if (!isValidEmail(data.email)) {
    errors.push('Invalid email format');
  }
  
  // Validate date (optional but should be valid if provided)
  if (data.date && typeof data.date !== 'string') {
    errors.push('Invalid date format');
  }
  
  // Validate subscribedAt (optional but should be valid if provided)
  if (data.subscribedAt && typeof data.subscribedAt !== 'string') {
    errors.push('Invalid subscribedAt format');
  }
  
  if (errors.length > 0) {
    return { isValid: false, errors };
  }
  
  return {
    isValid: true,
    errors: [],
    sanitized: {
      email: (data.email as string).toLowerCase().trim().slice(0, MAX_LENGTHS.email),
      date: data.date ? String(data.date).slice(0, 50) : new Date().toLocaleDateString(),
      subscribedAt: data.subscribedAt ? String(data.subscribedAt).slice(0, 50) : new Date().toISOString(),
    },
  };
}

/**
 * Escape HTML to prevent XSS in email templates
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

