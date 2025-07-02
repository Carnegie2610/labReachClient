import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale, Locale } from './routing';
import { cookies } from 'next/headers';

// Type assertion for locale
const assertLocale = (locale: string): locale is Locale => {
  return locales.includes(locale as Locale);
};

export default getRequestConfig(async ({ locale }: { locale?: string }) => {
  try {
    // Use the passed locale as default
    let resolvedLocale = locale || defaultLocale;
    
    // Try to get the locale from cookie
    try {
      // In Next.js App Router, cookies() returns a Promise of ReadonlyRequestCookies
      const cookieStore = await cookies();
      const localeCookie = cookieStore.get('NEXT_LOCALE')?.value;
      if (localeCookie) {
        console.log('Found locale cookie:', localeCookie);
        resolvedLocale = localeCookie;
      }
    } catch (e) {
      console.error('Error reading cookies:', e);
    }

    console.log('Resolving locale in i18n.ts:', resolvedLocale);

    // Validate that the incoming `locale` parameter is valid
    if (!assertLocale(resolvedLocale)) {
      console.error('Invalid locale detected:', resolvedLocale);
      resolvedLocale = defaultLocale;
    }

    console.log(`Loading messages for locale: ${resolvedLocale}`);

    // Define a list of available message namespaces
    const namespaces = [
      'home',
      'reservation',
      'login',
      'register',
      'Laboratory',
      'auth',
      'common',
    ];

    console.log('Namespaces loaded:', namespaces);

    // Load all namespace messages
    const messages: Record<string, Record<string, string>> = {};
    
    for (const namespace of namespaces) {
      try {
        console.log(`Attempting to load ${namespace} for ${resolvedLocale}...`);
        // Ensure we get a plain object by using JSON.parse
        const namespaceMessages = await import(`../../messages/${resolvedLocale}/${namespace}.json`);
        messages[namespace] = JSON.parse(JSON.stringify(namespaceMessages.default || namespaceMessages));
        console.log(`Successfully loaded ${namespace} for ${resolvedLocale}`);
      } catch (error) {
        console.error(`Error loading ${namespace} for ${resolvedLocale}:`, error);
        // Set an empty object for this namespace to prevent errors
        messages[namespace] = {} as Record<string, string>;
      }
    }

    console.log(`Total namespaces loaded for ${resolvedLocale}:`, Object.keys(messages).length);

    return {
      locale: resolvedLocale,
      messages,
      // You can set other configuration options here
      timeZone: 'Europe/Berlin',
    };
  } catch (error) {
    console.error('Error in getRequestConfig:', error);
    // Return a valid locale even in the error case
    return { 
      locale: defaultLocale,
      messages: {} 
    };
  }
});
