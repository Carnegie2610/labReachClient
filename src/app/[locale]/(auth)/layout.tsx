// src/app/(auth)/layout.tsx
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { ReactNode } from 'react';

// Define the props for the layout component
interface LayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}

// Make the component async to match Next.js expectations
export default async function AuthLayout({
  children,
  params: { locale }
}: LayoutProps) {
  // CRITICAL STEP: `useMessages()` fetches the messages loaded by your `i18n.ts` config.
  // Without this, the provider has no translations to provide.
  const messages = useMessages();

  return (
    // The provider receives the locale and the messages.
    // Now, any Client Component below this (like LoginForm) can use useTranslations().
    <NextIntlClientProvider locale={locale} messages={messages}>
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral p-4 dark:bg-primary">
        <div className="absolute inset-0 z-0 "></div>
        <div className="relative z-10 flex w-full items-center justify-center">
          {children}
        </div>
      </main>
    </NextIntlClientProvider>
  );
}