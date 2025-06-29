import './globals.css';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { MqttProvider } from '@/context/MqttContext';
import { Providers } from '@/app/providers'; // <-- IMPORT YOUR NEW PROVIDERS COMPONENT

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  return (
    // CRITICAL: Add suppressHydrationWarning to the <html> tag.
    // This is required by next-themes to prevent console errors.
    <html lang={locale} suppressHydrationWarning>
      <body>
        {/*
          By placing Providers here, you ensure that EVERY page,
          whether in the (auth) group or (main) group,
          is wrapped by the ThemeProvider.
        */}
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <MqttProvider>
              {/* Children will be either the (main) layout or the (auth) layout */}
              {children}
            </MqttProvider>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}