import './globals.css';
import { MqttProvider } from '@/context/MqttContext';
import { Providers } from '@/app/providers'; // <-- IMPORT YOUR NEW PROVIDERS COMPONENT
import { IntlProvider } from './components/IntlProvider';
import { Metadata } from 'next';

// --- THIS IS THE NEW METADATA OBJECT ---
// It translates your HTML <link> tags into a structured object.


export const metadata: Metadata = {
  // The manifest file for PWA capabilities
  manifest: 'site.webmanifest',
  
  // The icons property handles all your favicons
  icons: {
    // Standard favicon.ico
    icon: 'favicon.ico',
    
    // Favicons for different sizes (maps to <link rel="icon" ...>)
    shortcut: 'favicon.ico', // Often used for older browsers
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        url: 'favicon-32x32.png',
        sizes: '32x32',
      },
      {
        rel: 'icon',
        type: 'image/png',
        url: 'favicon-16x16.png',
        sizes: '16x16',
      },
    ],
    
    // Apple touch icon (maps to <link rel="apple-touch-icon" ...>)
    apple: [
      {
        url: 'apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
};
// --- END OF METADATA OBJECT ---


export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    // CRITICAL: Add suppressHydrationWarning to the <html> tag.
    // This is required by next-themes to prevent console errors.
    <html lang={locale} suppressHydrationWarning>
      <body>
        {/**
          By placing Providers here, you ensure that EVERY page,
          whether in the (auth) group or (main) group,
          is wrapped by the ThemeProvider.
        */}
        <Providers>
          <IntlProvider locale={locale}>
            <MqttProvider>
              {/* Children will be either the (main) layout or the (auth) layout */}
              {children}
            </MqttProvider>
          </IntlProvider>
        </Providers>
      </body>
    </html>
  );
}