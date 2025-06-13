// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, pathnames } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

// Wrap the middleware to handle cookie detection
export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Get locale from cookie
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
  
  // Check if we need to redirect based on cookie
  if (localeCookie && locales.includes(localeCookie as any)) {
    // Don't redirect if already on correct locale path
    const localePrefix = `/${localeCookie}`;
    if (!pathname.startsWith(localePrefix) && 
        !pathname.startsWith('/_next') && 
        !pathname.startsWith('/login') && 
        !pathname.startsWith('/register') && 
        !pathname.startsWith('/reservation') && 
        !pathname.startsWith('/trpc') &&
        !pathname.startsWith('/courses') && // Exclude CMS-like routes
        !pathname.includes('.')) {
      
      // Redirect to the localized version of the page
      const url = new URL(request.url);
      url.pathname = `${localePrefix}${pathname === '/' ? '' : pathname}`;
      return NextResponse.redirect(url);
    }
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
    '/((?!api|trpc|_next|_vercel|login|register|reservation|home|.*\\..*).*)',

    // Include these specific locale patterns
    '/',
    '/(fr|en)/:path*',
  ],
};
