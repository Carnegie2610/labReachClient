// src/app/[locale]/layout.tsx

import { Outfit, Lato } from 'next/font/google';
import './globals.css';
import NextTopLoader from 'nextjs-toploader';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

// FIX 1 & 4: Use named imports with the '@' alias for consistency and correctness
import Header  from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const lato = Lato({ subsets: ['latin'], variable: '--font-lato', weight: ['700', '900'] });

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // FIX 2: Use `locale` to match the folder name `[locale]`
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    // Use `params.locale` here
    <html lang={params.locale}>
      <body
        className={`${outfit.variable} ${lato.variable} flex min-h-screen flex-col bg-gray-100 font-sans`}
      >
        {/* FIX 3: Pass the `locale` prop to the provider */}
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <div className="flex flex-1 flex-col overflow-hidden">
            <Header />
            <NextTopLoader color="#6DD3CE" showSpinner={false} />
            {/* The main content area should grow to fill available space */}
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}