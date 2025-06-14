// src/components/molecules/ExerciseSelector.tsx
'use client';

import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { LabExerciseType } from '@/lib/lab-data';

interface ExerciseSelectorProps {
  exercises: LabExerciseType[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function ExerciseSelector({ exercises, selectedId, onSelect }: ExerciseSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedExercise = exercises.find(e => e.id === selectedId);

  const handleSelect = (id: string) => {
    onSelect(id);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full md:w-72">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md border bg-white px-4 py-2 text-left text-sm"
      >
        <span>{selectedExercise ? selectedExercise.title : 'Select an exercise'}</span>
        <ChevronDown className={clsx('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md border bg-white py-1 shadow-lg">
          {exercises.map((exercise) => (
            <button
              key={exercise.id}
              onClick={() => handleSelect(exercise.id)}
              className="flex w-full items-center px-4 py-2 text-left text-sm hover:bg-gray-100"
            >
              <span className="flex-grow">{exercise.title}</span>
              {exercise.id === selectedId && <Check className="h-4 w-4 text-blue-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}