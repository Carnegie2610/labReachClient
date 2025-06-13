// src/components/atoms/NavLink.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import { useLocale } from 'next-intl';

type NavLinkProps = {
  href: string;
  labelKey: 'home' | 'laboratory' | 'contact';
};

export default function NavLink({ href, labelKey }: NavLinkProps) {
  const t = useTranslations('Laboratory.Header');
  const pathname = usePathname();
  const locale = useLocale();

  // Robustly remove the locale prefix for comparison
  const activePathname = pathname.replace(new RegExp(`^/${locale}`), '');
  const isActive = activePathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        'text-sm font-medium transition-colors hover:text-blue-600',
        isActive 
          ? 'text-blue-700 border-b-2 border-blue-600' 
          : 'text-gray-700 hover:text-gray-900'
      )}
    >
      {t(labelKey)}
    </Link>
  );
}