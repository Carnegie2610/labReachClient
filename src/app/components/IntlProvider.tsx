import { useMessages } from 'next-intl';
import { NextIntlClientProvider } from 'next-intl';

export function IntlProvider({ children, locale }: { children: React.ReactNode; locale: string }) {
  const messages = useMessages();
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
