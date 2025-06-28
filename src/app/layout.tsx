import './globals.css';
import NextTopLoader from 'nextjs-toploader';
import { NextIntlClientProvider} from 'next-intl';
import { MqttProvider } from '@/context/MqttContext';
import { ThemeProvider } from '@/provider/ThemeProvider'; // Assuming your ThemeProvider is here
import { getMessages } from 'next-intl/server';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const messages = await getMessages();
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        {/*
          This RootLayout is NOW a pure provider shell.
          It contains NO UI components like Header, Footer, or <main>.
          Its only job is to provide context to the entire application.
        */}
        <ThemeProvider> {/* This should contain your ThemeProvider */}
          <NextIntlClientProvider locale={locale} messages={messages}>
            <MqttProvider>
              <NextTopLoader color="#6DD3CE" showSpinner={false} />
              {/* 
                The {children} here will be either the (main) layout or the (auth) layout.
              */}
              {children}
            </MqttProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}