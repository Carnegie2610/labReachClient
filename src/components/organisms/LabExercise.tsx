// src/components/organisms/LabExercise.tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { cpp } from '@codemirror/lang-cpp';
import { Button } from '@/components/atoms/Button';
import { ExerciseSelector } from '@/components/molecules/ExerciseSelector';
import { labExercises, getExerciseById } from '@/lib/lab-data';
import { CompileButton } from '@/components/molecules/CompileButton'
const CodeMirror = dynamic(() => import('@uiw/react-codemirror'), { 
  ssr: false,
});

// Set the default exercise to be the first one in our list
const defaultExerciseId = labExercises[0].id;
const defaultExercise = getExerciseById(defaultExerciseId)!;

export function LabExercise() {
  const [selectedExerciseId, setSelectedExerciseId] = useState(defaultExerciseId);
  
  // Initialize the code state with the default exercise's code
  const [code, setCode] = useState(defaultExercise.code);
  
  const [output, setOutput] = useState('// Compilation output will appear here...');
  const handleSelectExercise = (id: string) => {
    const selected = getExerciseById(id);
    if (selected) {
      setSelectedExerciseId(id);
      setCode(selected.code);
      setOutput('// New exercise loaded. Ready to compile.');
    }
  };
  
  const handleResetCode = () => {
    const currentExercise = getExerciseById(selectedExerciseId);
    if (currentExercise) {
      setCode(currentExercise.code);
    }
  };

  const handleCompile = async () => {
    setOutput('Compiling...');
    try {
      const response = await fetch('/api/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Compilation failed');
      setOutput(`✅ Success:\n\n${result.message}`);
    } catch (error) {
      setOutput(`❌ Error:\n\n${error instanceof Error ? error.message : 'Unknown error occurred'}`);
    } finally {
      setOutput('Ready to compile');
    }
  };

  return (
    <div className="space-y-4 rounded-lg border p-4">
      {/* --- NEWLY ADDED --- */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">Select Lab Exercise:</label>
        <ExerciseSelector
          exercises={labExercises}
          selectedId={selectedExerciseId}
          onSelect={handleSelectExercise}
        />
      </div>
      {/* --- END NEW --- */}

      <div className="editor-container rounded-md border overflow-hidden">
        <CodeMirror
          value={code}
          height="400px"
          extensions={[cpp()]}
          onChange={(value) => setCode(value)}
          theme="dark"
        />
      </div>
      <div className="flex items-center space-x-2">
        <CompileButton onCompile={handleCompile} />
        {/* The reset button is now smarter */}
        <Button variant="secondary" onClick={handleResetCode}>
          Reset Code
        </Button>
      </div>
      <div className="output-container">
        <h3 className="text-lg font-semibold">Output</h3>
        <pre className="mt-2 rounded-md bg-gray-900 p-4 text-sm text-white whitespace-pre-wrap">
          <code>{output}</code>
        </pre>
      </div>
    </div>
  );
}