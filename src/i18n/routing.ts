
export const locales = ['en', 'fr'] as const;
export const defaultLocale = 'en' as const;
export type Locale = (typeof locales)[number];

// The `pathnames` object holds pairs of internal and external paths
export const pathnames = {
  '/': '/',
  '/home': {
    en: '/home',
    fr: '/home',
  },
  '/reservation': {
    en: '/reservation',
    fr: '/reservation',
  },
  '/login': {
    en: '/login',
    fr: '/login',
  },
  '/register': {
    en: '/register',
    fr: '/register',
  },
  '/laboratory': {
    en: '/laboratory',
    fr: '/laboratory',
  },
} as const;

// Use the default: `always`
export const localePrefix = 'always';
