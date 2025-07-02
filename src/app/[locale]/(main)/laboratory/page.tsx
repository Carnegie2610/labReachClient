'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { cpp } from '@codemirror/lang-cpp';
import { useTranslations } from 'next-intl';
import { useMqtt } from '@/context/MqttContext';
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
  // --- Initialize translation hooks for different sections ---
  const t = useTranslations('Laboratory.LaboratoryPage');
  const t_exercises = useTranslations('Laboratory.Laboratory.Exercises');

  // --- STATE MANAGEMENT ---
  const [selectedExerciseId, setSelectedExerciseId] = useState(defaultExerciseId);
  const [code, setCode] = useState(defaultExercise.code);
  const [output, setOutput] = useState(t('initialOutput')); // <-- i18n
  const [blinkCount, setBlinkCount] = useState(5);
  const { publish, connectionStatus } = useMqtt();
  
  const currentExercise = getExerciseById(selectedExerciseId) || defaultExercise;

  // --- HANDLERS ---
  const handleSelectExercise = (id: string) => {
    const selected = getExerciseById(id);
    if (selected) {
      setSelectedExerciseId(id);
      setCode(selected.code);
      setOutput(t('exerciseLoaded')); // <-- i18n
    }
  };
  
  const handleResetCode = () => setCode(currentExercise.code);

  const handleCompileAndRun = async () => {
    if (connectionStatus !== 'Connected') {
      setOutput(t('mqttConnectionError')); // <-- i18n
      return;
    }
    
    setOutput(t('sendingCommand')); // <-- i18n

    const commandPayload = JSON.stringify({
      experiment: currentExercise.id,
      count: blinkCount
    });

    publish(`labreach/sim/esp32-alpha/command`, commandPayload, 1);
    setOutput(prev => prev + t('commandSentSuccess')); // <-- i18n
  };

  // --- DATA MAPPING FOR TRANSLATIONS ---
  // We map the lab exercises to include their translated names for the dropdown
 
  
  const translatedCurrentExerciseName = t_exercises(currentExercise.id);
  const translatedComponenttName = t_exercises(currentExercise.id);


  return (
    <main className="container mx-auto min-h-screen max-w-7xl px-4 py-8 text-foreground">
      
      <section className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">{t('title')}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{t('subtitle')}</p>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="flex flex-col space-y-4 lg:col-span-2">
          <div className="max-w-md">
            <ExerciseDropdown
              exercises={labExercises} // <-- Use translated data
              selectedId={selectedExerciseId}
              onSelect={handleSelectExercise}
            />
          </div>
          
          <div className="editor-container overflow-hidden rounded-lg border border-border">
            <CodeMirror
              value={code}
              height="550px"
              extensions={[cpp()]}
              onChange={(e) => setCode(e)}
              theme="dark"
            />
          </div>
          
          {currentExercise.id === 'blink-led' && (
            <div className="flex items-center gap-4 pt-2">
              <label htmlFor="blink-count" className="font-medium">
                {t('blinkCountLabel')} {/* <-- i18n */}
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
              experimentName={translatedCurrentExerciseName} // <-- Use translated name
            />
            <Button variant="secondary" onClick={handleResetCode}>
              {t('resetButton')} {/* <-- i18n */}
            </Button>
          </div>
        </div>

        <div className="flex flex-col space-y-8">
          <PhysicalComponentViewer
            componentName={translatedComponenttName} // <-- Use translated name
            imageSrc={currentExercise.imageSrc}
            altText={`Physical view of ${translatedComponenttName}`} // <-- Use translated name
          />
          <div className="output-container">
            <h3 className="text-lg font-semibold">{t('outputTitle')}</h3> {/* <-- i18n */}
            <pre className="mt-2 h-56 overflow-y-auto rounded-lg bg-card p-4 text-sm text-card-foreground whitespace-pre-wrap ring-1 ring-inset ring-border">
              <code>{output}</code>
            </pre>
          </div>
        </div>
      </div>

      <section className="mt-12 max-w-md">
        <EspControlPanel />
      </section>
    </main>
  );
}