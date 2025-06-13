// src/components/organisms/Footer.tsx
import { getTranslations } from 'next-intl/server';
import { LinkColumn } from '@/components/molecules/LinkColumn';
import { FooterLink } from '@/components/atoms/footerlink';

export default async function Footer() {
  const t = await getTranslations('Laboratory.Footer');
  
  const pagesLinks = [
    { href: '/login', label: t('login') },
    { href: '/register', label: t('register') },
    { href: '/reservations', label: t('reservationManagement') },
    { href: '/contact', label: t('contact') },
    { href: '/support', label: t('support') },
  ];

  const usefulLinks = [
    { href: '#', label: t('university') }, // Assuming external link or placeholder
    { href: '#', label: t('twitter') },
    { href: '#', label: t('youtube') },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="min-h-screen flex flex-col">
        <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          
          {/* Top Section: Link Columns */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
            <LinkColumn title={t('pages')} links={pagesLinks} />
            {/* The design shows a repeated "Pages" column. Reusing the component is trivial. */}
            <LinkColumn title={t('pages')} links={pagesLinks} />
            <LinkColumn title={t('usefulLinks')} links={usefulLinks} />
          </div>

          {/* Divider */}
          <div className="mt-12 border-t border-gray-700 pt-8">
            
            {/* Bottom Section */}
            <div className="flex flex-col items-center justify-between sm:flex-row">
              
              {/* Bottom Links */}
              <div className="flex space-x-6">
                <FooterLink href="/info">{t('informative')}</FooterLink>
                <FooterLink href="/privacy">{t('privacy')}</FooterLink>
                <FooterLink href="/orders">{t('orders')}</FooterLink>
              </div>

              {/* Copyright */}
              <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                {t('copyright', { year: new Date().getFullYear() })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}