'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { cpp } from '@codemirror/lang-cpp';
import { Button } from '@/components/atoms/Button';
import { PhysicalComponentViewer } from '@/components/molecules/PhysicalComponentViewer';
import { EspControlPanel } from '@/components/organisms/EspControlPanel';
import { labExercises, getExerciseById } from '@/lib/lab-data';
import { ExerciseDropdown } from '@/components/molecules/LabExerciseDropdown';
import { RunExperimentButton } from '@/components/molecules/CompileButton';

const CodeMirror = dynamic(() => import('@uiw/react-codemirror'), { 
  ssr: false,
});

const defaultExerciseId = labExercises[0].id;
const defaultExercise = getExerciseById(defaultExerciseId)!;

export default function LaboratoryPage() {
  // --- STATE IS HOISTED TO THE PAGE LEVEL ---
  const [selectedExerciseId, setSelectedExerciseId] = useState(defaultExerciseId);
  const [code, setCode] = useState(defaultExercise.code);
  const [output, setOutput] = useState('// Compilation output will appear here...');
  
  const currentExercise = getExerciseById(selectedExerciseId) || defaultExercise;

  // --- HANDLERS ALSO LIVE AT THE PAGE LEVEL ---
  const handleSelectExercise = (id: string) => {
    const selected = getExerciseById(id);
    if (selected) {
      setSelectedExerciseId(id);
      setCode(selected.code);
      setOutput('// New exercise loaded. Ready to compile.');
    }
  };
  
  const handleResetCode = () => setCode(currentExercise.code);

  const handleCompileAndRun = async () => {
    // This function can now be smarter, first compiling and then sending the run command
    setOutput('Compiling code...');
    // Replace with your actual API call logic
    await new Promise(res => setTimeout(res, 1500));
    setOutput('✅ Success: Code compiled.\n\nNow sending to device...');
    // In a real app, you would publish to MQTT here
    await new Promise(res => setTimeout(res, 1000));
    setOutput('✅ Success: Code compiled.\n\n🚀 Experiment running on device!');
  };

  return (
    <main className="container mx-auto min-h-screen max-w-7xl px-4 py-8 text-neutral">
      
      {/* --- PAGE HEADER --- */}
      <section className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Welcome to the Laboratory</h1>
        <p className="mt-2 text-lg text-muted">Select an exercise from the dropdown to begin or choose your own exercise</p>
      </section>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

        {/* --- LEFT COLUMN (takes 2/3 of the space on large screens) --- */}
        <div className="flex flex-col space-y-4 lg:col-span-2">
        <div className="max-w-md">
             <ExerciseDropdown
              exercises={labExercises}
              selectedId={selectedExerciseId}
              onSelect={handleSelectExercise}
            />
          </div>
          
          <div className="editor-container overflow-hidden rounded-lg border border-muted/20">
            <CodeMirror
              value={code}
              height="550px"
              extensions={[cpp()]}
              onChange={(value) => setCode(value)}
              theme="dark"
            />
          </div>

          <div className="flex items-center space-x-4">
            <RunExperimentButton
              onClick={handleCompileAndRun}
              experimentName={currentExercise.title} // Pass the dynamic name here
            />
            <Button variant="secondary" onClick={handleResetCode}>
              Reset Code
            </Button>
          </div>
        </div>

        {/* --- RIGHT COLUMN (takes 1/3 of the space on large screens) --- */}
        <div className="flex flex-col space-y-8">
          <PhysicalComponentViewer
            componentName={currentExercise.componentName}
            imageSrc={currentExercise.imageSrc}
            altText={`Physical view of ${currentExercise.componentName}`}
          />
          <div className="output-container">
            <h3 className="text-lg font-semibold">Output</h3>
            <pre className="mt-2 h-56 overflow-y-auto rounded-lg bg-primary/50 p-4 text-sm text-neutral/80 whitespace-pre-wrap ring-1 ring-inset ring-muted/20">
              <code>{output}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* --- ESP32 CONTROL PANEL (sits below the main grid) --- */}
      <section className="mt-12 max-w-md">
        <EspControlPanel />
      </section>

    </main>
  );
}