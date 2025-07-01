'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { clsx } from 'clsx';

// Define the shape of the exercise data it will receive
import { LabExerciseType } from '@/lib/lab-data';

type Exercise = LabExerciseType;

type ExerciseDropdownProps = {
  exercises: Exercise[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function ExerciseDropdown({ exercises, selectedId, onSelect }: ExerciseDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedExercise = exercises.find(e => e.id === selectedId);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  const handleSelect = (id: string) => {
    onSelect(id); // Call the parent's function
    setIsOpen(false); // Close the dropdown
  };

  return (
    <div className="relative inline-block w-full text-left" ref={dropdownRef}>
      {/* The Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex w-full items-center justify-between gap-x-2 rounded-md border border-muted/30 bg-primary/50 px-4 py-3 text-sm font-semibold text-neutral shadow-sm ring-1 ring-inset ring-transparent transition hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <span>{selectedExercise ? selectedExercise.name : 'Select an exercise'}</span>
        <ChevronDown 
          className={clsx('h-5 w-5 transform transition-transform duration-200', isOpen && 'rotate-180')} 
          aria-hidden="true" 
        />
      </button>

      {/* The Dropdown Panel */}
      {isOpen && (
        <div className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-primary/90 text-neutral shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-md focus:outline-none">
          <div className="py-1">
            {exercises.map((exercise) => (
              <button
                key={exercise.id}
                onClick={() => handleSelect(exercise.id)}
                className="flex w-full items-center justify-between px-4 py-2 text-left text-sm transition hover:bg-accent hover:text-primary"
                role="menuitem"
              >
                <span>{exercise.name}</span>
                {exercise.id === selectedId && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}