'use client';

import { useState } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';

type FaqItemProps = {
  question: string;
  answer: string;
};

export function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border">
      {/* The clickable header for the accordion item */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-foreground">{question}</span>
        {/* 
          ASSET: The chevron icon
          Path: /public/images/home/svg/chevron-down.svg
        */}
        <Image
          src="/images/home/svg/chevron-down.svg"
          width={20}
          height={20}
          alt="Toggle icon"
          className={clsx(
            'transform transition-transform duration-300 ease-in-out',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* The collapsible answer panel with smooth animation */}
      <div
        className={clsx(
          'grid overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-muted-foreground">{answer}</p>
        </div>
      </div>
    </div>
  );
}