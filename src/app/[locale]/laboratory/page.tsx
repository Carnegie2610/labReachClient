// src/app/[locale]/Laboratory/page.tsx
import { SubHeader } from '@/components/organisms/SubHeader';
import { LabExercise } from '@/components/organisms/LabExercise';

export default async function ({ params }: { params: { locale: string } }) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow">
        <SubHeader />
        <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Welcome to the Laboratory</h1>
          <p className="mt-4">Select an exercise from the dropdown above to begin.</p>
          {/* Other page content goes here */}
        </div>
        <LabExercise />
      </main>       
    </div>
  );
}