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
import { useMqtt } from '@/context/MqttContext';

const CodeMirror = dynamic(() => import('@uiw/react-codemirror'), { 
  ssr: false,
});

const defaultExerciseId = labExercises[0].id;
const defaultExercise = getExerciseById(defaultExerciseId)!;

export default function LaboratoryPage() {
  // --- STATE MANAGEMENT ---
  const [selectedExerciseId, setSelectedExerciseId] = useState(defaultExerciseId);
  const [code, setCode] = useState(defaultExercise.code);
  const [output, setOutput] = useState('// Compilation output will appear here...');
  const { publish, connectionStatus } = useMqtt();
  
  // --- STEP 1: ADD NEW STATE FOR THE BLINK COUNT ---
  const [blinkCount, setBlinkCount] = useState(5); // Default to 5 blinks

  const currentExercise = getExerciseById(selectedExerciseId) || defaultExercise;

  // --- HANDLERS ---
  const handleSelectExercise = (id: string) => {
    const selected = getExerciseById(id);
    if (selected) {
      setSelectedExerciseId(id);
      setCode(selected.code);
      setOutput('// New exercise loaded. Ready to compile.');
    }
  };
  
  const handleResetCode = () => setCode(currentExercise.code);

  // --- STEP 3: UPDATE THE LOGIC TO USE THE NEW STATE ---
  const handleCompileAndRun = async () => {
    if (connectionStatus !== 'Connected') {
      setOutput('⚠️ Could not send "Run" command: Not connected to MQTT.');
      return;
    }
    
    setOutput('🚀 Sending "Run" command to device...');

    // The payload now dynamically includes the blinkCount from our state
    const commandPayload = JSON.stringify({
      experiment: currentExercise.id, // e.g., "blink-led"
      count: blinkCount               // e.g., 5, from the input field
    });

    publish(`labreach/sim/esp32-alpha/command`, commandPayload, 1);
    setOutput(prev => prev + '\n\n✅ Command sent successfully!');
  };

  return (
    <main className="container mx-auto min-h-screen max-w-7xl px-4 py-8 text-foreground">
      
      {/* --- PAGE HEADER --- */}
      <section className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Welcome to the Laboratory</h1>
        <p className="mt-2 text-lg text-muted-foreground">Select an exercise from the dropdown to begin.</p>
      </section>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* --- LEFT COLUMN --- */}
        <div className="flex flex-col space-y-4 lg:col-span-2">
          <div className="max-w-md">
            <ExerciseDropdown
              exercises={labExercises}
              selectedId={selectedExerciseId}
              onSelect={handleSelectExercise}
            />
          </div>
          
          <div className="editor-container overflow-hidden rounded-lg border border-border">
            <CodeMirror
              value={code}
              height="550px"
              extensions={[cpp()]}
              onChange={(value) => setCode(value)}
              theme="dark" // This can be made dynamic with useTheme
            />
          </div>
          
          {/* --- STEP 2: ADD THE UI INPUT (CONDITIONALLY RENDERED) --- */}
          {/* This entire block will only appear if the selected exercise is 'blink-led' */}
          {currentExercise.id === 'blink-led' && (
            <div className="flex items-center gap-4 pt-2">
              <label htmlFor="blink-count" className="font-medium">
                Blink Count:
              </label>
              <input
                id="blink-count"
                type="number"
                min="1"
                max="50"
                value={blinkCount}
                onChange={(e) => setBlinkCount(Number(e.target.value))}
                className="w-24 rounded-md border border-border bg-transparent p-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
          )}

          <div className="flex items-center space-x-4">
            <RunExperimentButton
              onClick={handleCompileAndRun}
              experimentName={currentExercise.name}
            />
            <Button variant="secondary" onClick={handleResetCode}>
              Reset Code
            </Button>
          </div>
        </div>

        {/* --- RIGHT COLUMN --- */}
        <div className="flex flex-col space-y-8">
          <PhysicalComponentViewer
            componentName={currentExercise.componentName}
            imageSrc={currentExercise.imageSrc}
            altText={`Physical view of ${currentExercise.componentName}`}
          />
          <div className="output-container">
            <h3 className="text-lg font-semibold">Output</h3>
            <pre className="mt-2 h-56 overflow-y-auto rounded-lg bg-card p-4 text-sm text-card-foreground whitespace-pre-wrap ring-1 ring-inset ring-border">
              <code>{output}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* --- ESP32 CONTROL PANEL --- */}
      <section className="mt-12 max-w-md">
        <EspControlPanel />
      </section>

    </main>
  );
}