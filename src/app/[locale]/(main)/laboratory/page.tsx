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
import { useMqtt } from '@/context/MqttContext'; // 
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
  const [isLoading, setIsLoading] = useState(false);
  const { publish, connectionStatus } = useMqtt();

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
    setOutput('⚙️ Compiling code on server...');
    setIsLoading(true); // Assuming you add an isLoading state

    try {
      // 1. Call your new backend API route
      const response = await fetch('/api/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }), // Send the code from the editor state
      });

      const result = await response.json();

      // 2. Handle the response from the server
      if (!response.ok) {
        // If the server returned an error (e.g., status 400), use its output
        setOutput(`❌ Compilation Failed:\n\n${result.output || result.error}`);
      } else {
        // On success, show a success message
        setOutput(`✅ Success: Code compiled successfully!\n\n${result.output}`);
        
        // --- THIS IS HOW YOU INTEGRATE THE MQTT COMMAND ---
        // If compilation is successful, THEN we send the command to the device.
        if (connectionStatus === 'Connected') {
          const commandPayload = JSON.stringify({
            experiment: currentExercise.id, // "blink-led"
            count: 10
          });
          publish(`labreach/sim/esp32-alpha/command`, commandPayload, 1);
          setOutput(prev => prev + '\n\n🚀 "Run" command sent to device!');
        } else {
          setOutput(prev => prev + '\n\n⚠️ Could not send "Run" command: Not connected to MQTT.');
        }
      }
    } catch (error) {
      console.error("Error calling compile API:", error);
      setOutput('❌ Critical Error: Could not connect to the compilation service.');
    } finally {
      setIsLoading(false); // Stop the loading state
    }
  };


  const mappedExercises = labExercises.map(exercise => ({
    id: exercise.id,
    title: exercise.name
  }));

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
              exercises={mappedExercises}
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
              experimentName={currentExercise.name} // Pass the dynamic name here
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