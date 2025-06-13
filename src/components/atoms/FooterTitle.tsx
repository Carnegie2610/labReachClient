// src/components/atoms/FooterTitle.tsx
import React from 'react';

type FooterTitleProps = {
  children: React.ReactNode;
};

export function FooterTitle({ children }: FooterTitleProps) {
  return (
    <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
      {children}
    </h3>
  );
}