// src/components/organisms/SubHeader.tsx
import { LabExerciseDropdown } from '@/components/molecules/LabExerciseDropdown';

export function SubHeader() {
  return (
    <div className="w-full bg-gray-200 py-3">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <LabExerciseDropdown />
      </div>
    </div>
  );
}