// src/components/atoms/FooterLink.tsx
import Link from 'next/link';
import React from 'react';

type FooterLinkProps = {
  href: string;
  children: React.ReactNode;
};

export function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <Link 
      href={href} 
      className="text-sm text-gray-400 transition-colors hover:text-white"
    >
      {children}
    </Link>
  );
}