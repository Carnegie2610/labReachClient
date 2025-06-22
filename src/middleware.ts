// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, pathnames, Locale } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Type assertion for locale
const assertLocale = (locale: string): locale is Locale => {
  return locales.includes(locale as Locale);
};

// Protected routes that require authentication
const protectedRoutes = [
  '/[locale]/dashboard',
  '/[locale]/profile',
  // Add more protected routes as needed
];

// Wrap the middleware to handle cookie detection and auth
export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Get locale from cookie
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
  
  // Check if we need to redirect based on cookie or default locale
  const targetLocale = localeCookie && assertLocale(localeCookie) 
    ? localeCookie 
    : defaultLocale;

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route.replace('[locale]', targetLocale))
  );

  // Check authentication for protected routes
  if (isProtectedRoute) {
    const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.redirect(new URL(`/${targetLocale}/auth/login`, request.url));
    }
  }

  // Don't redirect if already on correct locale path
  const localePrefix = `/${targetLocale}`;
  if (!pathname.startsWith(localePrefix) && 
      !pathname.startsWith('/_next') && 
      !pathname.startsWith('/login') && 
      !pathname.startsWith('/register') && 
      !pathname.startsWith('/reservation') && 
      !pathname.startsWith('/Laboratory') && // Exclude CMS-like routes
      !pathname.includes('.')) {
    
    // Redirect to the localized version of the page
    const url = new URL(request.url);
    url.pathname = `${localePrefix}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(url);
  }
  
  // If no locale cookie or already on correct path, use the next-intl middleware
  const intlMiddleware = createMiddleware({
    defaultLocale,
    locales,
    localePrefix: 'always',
    pathnames
  });
  
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Exclude Payload admin, API routes, and CMS-like routes
    '/((?!api|trpc|_next|_vercel|login|register|reservation|home|Laboratory|.*\\..*).*)',

    // Include these specific locale patterns
    '/',
    '/(fr|en)/:path*',
  ],
};
