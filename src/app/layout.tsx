import { Outfit, Lato } from 'next/font/google';
import './globals.css';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
// import CookieConsent from '../components/common/CookieConsent';
import NextTopLoader from 'nextjs-toploader';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

// import GoogleAnalyticsScript from '../../components/common/GoogleAnalyticsScript';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const lato = Lato({ subsets: ['latin'], variable: '--font-lato', weight: ['700', '900'] });

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  //datasectiopn clean
  const messages = await getMessages();

  return (
    <html lang={params.lang}>
      <body
        className={`${outfit.variable} ${lato.variable} overflow-x-hidden bg-darkblue   font-inter`}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="flex flex-col overflow-hidden bg-[#FBFBFB]">
            <Header />
            <NextTopLoader />
            <main>{children}</main>
            <Footer />
            {/* <CookieConsent /> */}

            {/* Custom Google Analytics with consent mode */}
            {/* <GoogleAnalyticsScript /> */}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}