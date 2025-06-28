'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { cpp } from '@codemirror/lang-cpp';
import { Button } from '@/components/atoms/Button';
import { ExerciseSelector } from '@/components/molecules/ExerciseSelector';
import { PhysicalComponentViewer } from '@/components/molecules/PhysicalComponentViewer'; // <-- IMPORT NEW MOLECULE
import { labExercises, getExerciseById } from '@/lib/lab-data';
import { RunExperimentButton } from '../molecules/CompileButton';

const CodeMirror = dynamic(() => import('@uiw/react-codemirror'), { 
  ssr: false,
});

const defaultExerciseId = labExercises[0].id;
const defaultExercise = getExerciseById(defaultExerciseId)!;

export function LabExercise() {
  const [selectedExerciseId, setSelectedExerciseId] = useState(defaultExerciseId);
  const [code, setCode] = useState(defaultExercise.code);
  const [output, setOutput] = useState('// Compilation output will appear here...');
  
  const currentExercise = getExerciseById(selectedExerciseId) || defaultExercise;

  const handleSelectExercise = (id: string) => {
    const selected = getExerciseById(id);
    if (selected) {
      setSelectedExerciseId(id);
      setCode(selected.code);
      setOutput('// New exercise loaded. Ready to compile.');
    }
  };
  
  const handleResetCode = () => setCode(currentExercise.code);

  const handleCompile = async () => {
    // ... (Your compile logic remains the same)
    setOutput('Compiling...');
    // ...
  };

  return (
    <div className="space-y-4 rounded-lg p-4">
      {/* Top-level controls */}
      <div className="flex flex-col space-y-2 md:max-w-xs">
        <label className="text-sm font-medium text-muted dark:text-neutral/80">
          Select Lab Exercise:
        </label>
        <ExerciseSelector
          exercises={labExercises}
          selectedId={selectedExerciseId}
          onSelect={handleSelectExercise}
        />
      </div>

      {/* Main two-column layout */}
      {/* This will stack vertically on mobile and be side-by-side on medium screens and up */}
      <div className="flex flex-col gap-6 md:flex-row">

        {/* --- LEFT COLUMN: CODE EDITOR & CONTROLS --- */}
        <div className="flex flex-col space-y-4 md:w-3/5">
          <div className="editor-container overflow-hidden rounded-md border border-muted/50">
            <CodeMirror
              value={code}
              height="500px" // Adjusted height for the new layout
              extensions={[cpp()]}
              onChange={(value) => setCode(value)}
              theme="dark" // Assuming you'll add light/dark theme toggle later
            />
          </div>
          <div className="flex items-center space-x-2">
            <RunExperimentButton onClick={handleCompile} experimentName={currentExercise.title} />
            <Button variant="secondary" onClick={handleResetCode}>
              Reset Code
            </Button>
          </div>
        </div>

        {/* --- RIGHT COLUMN: OUTPUT & PHYSICAL VIEW --- */}
        <div className="flex flex-col space-y-6 md:w-2/5">
          {/* Physical Component Viewer Integration */}
          <PhysicalComponentViewer
            componentName={currentExercise.componentName}
            imageSrc={currentExercise.imageSrc}
            altText={`Physical view of ${currentExercise.componentName}`}
          />

          {/* Output Console */}
          <div className="output-container">
            <h3 className="text-lg font-semibold text-primary dark:text-neutral">Output</h3>
            <pre className="mt-2 h-48 overflow-y-auto rounded-md bg-gray-900 p-4 text-sm text-white whitespace-pre-wrap">
              <code>{output}</code>
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
}