// src/components/molecules/LabExerciseDropdown.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

export function LabExerciseDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('Laboratory.Laboratory');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // Placeholder data for the links
  const exercises = [
    { href: '/laboratory/exercise-1', label: t('exercise1') },
    { href: '/laboratory/exercise-2', label: t('exercise2') },
    { href: '/laboratory/exercise-3', label: t('exercise3') },
  ];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* The Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center gap-x-2 rounded-md bg-lab-teal px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm transition hover:opacity-90"
      >
        {t('labExercises')}
        <ChevronDown 
          className={clsx(
            'h-5 w-5 transform transition-transform duration-200',
            isOpen && 'rotate-180'
          )} 
          aria-hidden="true" 
        />
      </button>

      {/* The Dropdown Panel */}
      {isOpen && (
        <div className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {exercises.map((exercise) => (
              <Link
                key={exercise.label}
                href={exercise.href}
                onClick={() => setIsOpen(false)} // Close on link click
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {exercise.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}