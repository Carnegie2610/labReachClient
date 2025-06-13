// src/app/[locale]/laboratory/page.tsx
import { SubHeader } from '@/components/organisms/SubHeader';

export default function LaboratoryPage() {
  return (
    <div>
      <SubHeader />
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Welcome to the Laboratory</h1>
        <p className="mt-4">Select an exercise from the dropdown above to begin.</p>
        {/* Other page content goes here */}
      </div>
    </div>
  );
}