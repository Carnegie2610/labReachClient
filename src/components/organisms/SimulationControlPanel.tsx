'use client';

import { useState } from 'react';
import { useMqtt, useSubscription } from '@/context/MqttContext';
import { Rocket, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';

// --- Configuration ---
const DEVICE_ID = 'esp32-alpha'; // This uniquely identifies your device
const COMMAND_TOPIC = `labreach/sim/${DEVICE_ID}/command`;
const STATUS_TOPIC = `labreach/sim/${DEVICE_ID}/status`;

// Molecule: The button that sends the command
function CompileButton() {
  const { publish, connectionStatus } = useMqtt();
  const isReady = connectionStatus === 'Connected';

  const handleCompileClick = () => {
    // Example: send a JSON payload to specify which experiment to run
    const payload = JSON.stringify({ experiment: 'temp_sensor_read', duration: 30 });
    publish(COMMAND_TOPIC, payload, 1); // QoS 1: At least once delivery
  };

  return (
    <button
      onClick={handleCompileClick}
      disabled={!isReady}
      className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 font-semibold text-white shadow transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
    >
      <Rocket size={18} />
      {isReady ? 'Run Experiment' : `MQTT: ${connectionStatus}`}
    </button>
  );
}

// Molecule: The display that shows feedback from the device
function SimulationStatus() {
  const [status, setStatus] = useState('Awaiting command...');

  // This hook handles everything: subscribing, unsubscribing, and updating state
  useSubscription(STATUS_TOPIC, (message) => {
    setStatus(message);
  });
  
  const getIcon = () => {
    if (status.includes('Running')) return <Loader2 className="animate-spin text-blue-500" />;
    if (status.includes('Complete')) return <CheckCircle className="text-green-500" />;
    if (status.includes('Error')) return <AlertTriangle className="text-red-500" />;
    return null;
  };

  return (
    <div className="mt-4 rounded-lg border bg-slate-50 p-4">
      <h3 className="font-semibold text-gray-800">Device Status</h3>
      <div className="mt-2 flex items-center gap-3">
        <div className="h-6 w-6">{getIcon()}</div>
        <p className="font-mono text-sm text-gray-600">{status}</p>
      </div>
    </div>
  );
}


// Organism: The complete control panel
export function SimulationControlPanel() {
  return (
    <div className="max-w-md rounded-xl border p-6 shadow-lg">
      <h2 className="text-lg font-bold">ESP32 Control Panel</h2>
      <p className="text-sm text-gray-500">Device ID: {DEVICE_ID}</p>
      <div className="mt-6">
        <CompileButton />
        <SimulationStatus />
      </div>
    </div>
  );
}