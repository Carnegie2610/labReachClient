import { Outfit, Lato } from 'next/font/google';
import './globals.css';
import NextTopLoader from 'nextjs-toploader';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { MqttProvider } from '@/context/MqttContext';
import { ThemeProvider } from '@/provider/ThemeProvider';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const lato = Lato({ subsets: ['latin'], variable: '--font-lato', weight: ['700', '900'] });

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${outfit.variable} ${lato.variable} font-sans bg-[#ffffff]`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <MqttProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <NextTopLoader color="#6DD3CE" showSpinner={false} />
              {/* Children will be either the (main) layout or the (auth) layout */}
              {children}
            </ThemeProvider>
          </MqttProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}