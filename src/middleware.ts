// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, pathnames } from './i18n/routing';
import { getToken } from 'next-auth/jwt';

// 1. Define your protected routes WITHOUT the [locale] prefix.
const protectedRoutes = ['/reservation', '/dashboard', '/profile'];

// 2. Create the specialized internationalization middleware from next-intl
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  pathnames, // Your pathnames for localized routes
  localePrefix: 'always', // Always show the locale in the URL
});

// 3. This is your main middleware function
export default async function middleware(request: NextRequest) {
  // First, run the internationalization middleware
  const response = intlMiddleware(request);

  // Strip the locale from the pathname to check for protected routes
  const pathname = request.nextUrl.pathname;
  const pathnameWithoutLocale = `/${pathname.split('/').slice(2).join('/')}`;
  
  const isProtectedRoute = protectedRoutes.some(route => pathnameWithoutLocale.startsWith(route));

  if (isProtectedRoute) {
    const token = await getToken({ req: request });
    if (!token) {
      // Get the current locale from the original request path
      const locale = pathname.split('/')[1] || defaultLocale;
      // Redirect to the localized login page
      const loginUrl = new URL(`/${locale}/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If the route is not protected or the user is authenticated, return the response from intlMiddleware
  return response;
}

// ... your new config object from Step 1 goes here

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     *
     * This will correctly run the middleware on '/', '/home', '/login', etc.
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
