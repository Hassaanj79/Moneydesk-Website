import { NextRequest, NextResponse } from 'next/server';

// Rate limiting store (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Rate limit configuration
const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 1000, // Max requests per window (increased)
  apiMaxRequests: 100, // Max API requests per window (production - increased)
  apiMaxRequestsDev: 1000, // Max API requests per window (development/localhost - increased)
};

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.ip || 'unknown';
  return ip;
}

function checkRateLimit(key: string, isApi: boolean, isLocalhost: boolean): boolean {
  const now = Date.now();
  // Use higher limit for localhost/development
  const limit = isApi 
    ? (isLocalhost ? RATE_LIMIT.apiMaxRequestsDev : RATE_LIMIT.apiMaxRequests)
    : RATE_LIMIT.maxRequests;
  
  const record = rateLimitMap.get(key);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs,
    });
    return true;
  }
  
  if (record.count >= limit) {
    return false;
  }
  
  record.count++;
  return true;
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, RATE_LIMIT.windowMs);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isApiRoute = pathname.startsWith('/api/');
  
  // Check if request is from localhost (development)
  const hostname = request.headers.get('host') || '';
  const isLocalhost = hostname.includes('localhost') || hostname.includes('127.0.0.1') || process.env.NODE_ENV === 'development';
  
  // Skip rate limiting for admin routes (they're authenticated)
  const isAdminRoute = pathname.startsWith('/api/blogs') || 
                       pathname.startsWith('/api/jobs') || 
                       pathname.startsWith('/api/feedback') ||
                       pathname.startsWith('/api/contact/submissions') ||
                       pathname.startsWith('/api/newsletter/subscribers');
  
  // Rate limiting (skip for admin routes and localhost)
  if (!isAdminRoute && !isLocalhost) {
    const rateLimitKey = getRateLimitKey(request);
    if (!checkRateLimit(rateLimitKey, isApiRoute, isLocalhost)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
  }
  
  // Security headers (additional ones not covered by next.config.js)
  const response = NextResponse.next();
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // API route specific security
  if (isApiRoute) {
    // Only allow POST for API routes that need it
    if (request.method === 'POST') {
      // Verify Content-Type for POST requests
      const contentType = request.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        return NextResponse.json(
          { error: 'Invalid content type' },
          { status: 400 }
        );
      }
    }
    
    // Add CORS headers if needed (restrictive)
    response.headers.set('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || 'https://moneydesk.co');
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    response.headers.set('Access-Control-Max-Age', '86400');
    
    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 200, headers: response.headers });
    }
  }
  
  return response;
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico|googledc02856744490327.html).*)',
  ],
};

