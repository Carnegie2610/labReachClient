'use client';

import { Rocket } from 'lucide-react';
import { useMqtt } from '@/context/MqttContext';

// --- Configuration ---
const DEVICE_ID = 'esp32-alpha'; // This should ideally be dynamic if you have multiple devices
const COMMAND_TOPIC = `labreach/sim/${DEVICE_ID}/command`;

interface CompileButtonProps {
  onCompile?: () => void;
}

export function CompileButton({ onCompile }: CompileButtonProps) {
  const { publish, connectionStatus } = useMqtt();
  const isReady = connectionStatus === 'Connected';

  const handleCompileClick = () => {
    if (onCompile) {
      onCompile();
    } else {
      // THIS IS THE ONLY CHANGE NEEDED ON THE FRONTEND
      // We now send a command specific to the blink experiment.
      const payload = JSON.stringify({ experiment: 'blink', count: 10 });
      
      console.log(`Publishing command: ${payload}`);
      publish(COMMAND_TOPIC, payload, 1);
    }
  };

  return (
    <button
      onClick={handleCompileClick}
      disabled={!isReady}
      className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 font-semibold text-white shadow transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
    >
      <Rocket size={18} />
      {isReady ? 'Run Blink Experiment' : `MQTT: ${connectionStatus}`}
    </button>
  );
}