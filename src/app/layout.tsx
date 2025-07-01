import './globals.css';
import { MqttProvider } from '@/context/MqttContext';
import { Providers } from '@/app/providers'; // <-- IMPORT YOUR NEW PROVIDERS COMPONENT
import { IntlProvider } from './components/IntlProvider';

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