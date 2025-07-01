'use client';

import { Rocket } from 'lucide-react';
import { useMqtt } from '@/context/MqttContext'; // Assuming you have an MQTT context

// Define the component's props
interface RunExperimentButtonProps {
  // A callback function to execute when the button is clicked
  onClick: () => void;
  // The name of the currently selected experiment to display on the button
  experimentName: string;
}

export function RunExperimentButton({ onClick, experimentName }: RunExperimentButtonProps) {
  // We still need the MQTT context to know if we can enable the button
  const { connectionStatus } = useMqtt();
  const isReady = connectionStatus === 'Connected';

  const handleButtonClick = () => {
     // --- ADD THIS LOG ---
     console.log(`Button clicked. Current MQTT status: '${connectionStatus}'`); 
    if (isReady) {
      onClick(); // Execute the function passed from the parent
    }else{
      // --- ADD THIS LOG ---
      console.warn('Button clicked, but MQTT is not connected. Publish will be skipped.');
    }
  };

  return (
    <button
      onClick={handleButtonClick}
      disabled={!isReady}
      className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-bold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-70"
    >
      <Rocket size={20} />
      {/* 
        THE FIX: The button's text is now dynamic.
        It uses the `experimentName` prop.
      */}
      <span>
        {isReady ? `Run ${experimentName}` : `MQTT: ${connectionStatus}`}
      </span>
    </button>
  );
}