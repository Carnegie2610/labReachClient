'use client';

import { useState } from 'react';
import { useSubscription } from '@/context/MqttContext';
import { clsx } from 'clsx';
import { Loader2, CheckCircle, AlertTriangle } from 'lucide-react';

// --- Configuration ---
const DEVICE_ID = 'esp32-alpha';
const STATUS_TOPIC = `labreach/sim/${DEVICE_ID}/status`;

export function SimulationStatus() {
  const [status, setStatus] = useState('Idle');

  // Reactively subscribe to the status topic
  useSubscription(STATUS_TOPIC, (message) => {
    console.log(`Received status update: ${message}`);
    setStatus(message);
  });

  const getStatusIndicator = () => {
    if (status.toLowerCase().includes('running') || status.toLowerCase().includes('starting')) {
      return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />;
    }
    if (status.toLowerCase().includes('complete')) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
     if (status.toLowerCase().includes('error')) {
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
    return null;
  };

  return (
    <div className="flex items-center gap-3 rounded-lg border bg-gray-50 p-3">
      <div className="flex-shrink-0">{getStatusIndicator()}</div>
      <div>
        <p className="text-sm font-medium text-gray-800">Device Status</p>
        <p className={clsx('text-sm text-gray-600')}>{status}</p>
      </div>
    </div>
  );
}