// src/components/organisms/Header.tsx
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Logo from '../atoms/logo';
import NavLink from '../atoms/navlink';
import LanguageSwitcher from '../molecules/languageSwitcher';
import {MobileMenu} from '../molecules/mobilemenu';

export default async function Header() {
  const t = await getTranslations('Laboratory.Header');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        {/* Left Side: Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Middle: Desktop Navigation (hidden on mobile) */}
        <nav className="hidden items-center space-x-8 md:flex">
          <NavLink href="/" labelKey="home" />
          <NavLink href="/laboratory" labelKey="laboratory" />
          <NavLink href="/contact-us" labelKey="contact" />
        </nav>

        {/* Right Side: Actions */}
        <div className="flex items-center space-x-4">
          {/* Desktop Login Button (hidden on mobile) */}
          <div className="hidden md:block">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
            >
              {t('login')}
            </Link>
          </div>
          
          <LanguageSwitcher />

          {/* Mobile Menu Trigger (visible only on mobile) */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}