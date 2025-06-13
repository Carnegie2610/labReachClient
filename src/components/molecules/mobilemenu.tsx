// src/components/molecules/MobileMenu.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import NavLink from '../atoms/navlink';
import  Logo from '../atoms/logo';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('Laboratory.Header');

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="md:hidden">
      {/* Hamburger Icon Trigger */}
      <button
        onClick={toggleMenu}
        className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
        aria-controls="mobile-menu"
        aria-expanded={isOpen}
      >
        <span className="sr-only">Open main menu</span>
        <Menu className="block h-6 w-6" aria-hidden="true" />
      </button>

      {/* Overlay and Menu Content */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-white"
          id="mobile-menu"
        >
          <div className="flex h-16 items-center justify-between px-4">
            <Logo />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Close main menu</span>
              <X className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <nav className="flex flex-col space-y-4 px-4 pt-4">
            <NavLink href="/" labelKey="home" />
            <NavLink href="/laboratory" labelKey="laboratory" />
            <NavLink href="/contact-us" labelKey="contact" />
            <hr className="my-4"/>
            <Link
              href="/login"
              className="rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            >
              {t('login')}
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}