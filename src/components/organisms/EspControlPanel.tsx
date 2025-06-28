'use client';

import { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Rocket, Server, Wifi, WifiOff } from 'lucide-react';

// In a real app, this would come from props or a global state (Zustand/Context)
type DeviceStatus = 'online' | 'offline' | 'running' | 'awaiting command';

export function EspControlPanel() {
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>('online');
  const isOnline = deviceStatus !== 'offline';

  const handleRunExperiment = () => {
    // This would publish a message via MQTT to the ESP32
    console.log('Publishing "RUN" command to MQTT topic for esp32-alpha');
    setDeviceStatus('running');
    // Simulate the experiment finishing
    setTimeout(() => setDeviceStatus('online'), 5000);
  };

  const StatusIndicator = () => {
    switch (deviceStatus) {
      case 'online':
        return <span className="text-green-400">Online</span>;
      case 'offline':
        return <span className="text-red-500">Offline</span>;
      case 'running':
        return <span className="animate-pulse text-accent">Running...</span>;
      default:
        return <span className="text-muted">Awaiting Command</span>;
    }
  };

  return (
    <div className="rounded-lg border border-muted/20 bg-primary/30 p-6 text-neutral">
      <div className="mb-4">
        <h3 className="text-xl font-bold">ESP32 Control Panel</h3>
        <p className="flex items-center gap-2 text-sm text-muted">
          <Server className="h-4 w-4" /> Device ID: esp32-alpha
        </p>
      </div>
      
      <Button 
        onClick={handleRunExperiment} 
        disabled={!isOnline || deviceStatus === 'running'}
        className="w-full"
      >
        <Rocket className="mr-2 h-5 w-5" />
        Run Experiment on Device
      </Button>

      <div className="mt-4 rounded-md border border-muted/20 bg-primary/50 p-4">
        <div className="flex items-center justify-between">
          <p className="font-medium">Device Status</p>
          {isOnline ? <Wifi className="h-5 w-5 text-green-400" /> : <WifiOff className="h-5 w-5 text-red-500" />}
        </div>
        <p className="mt-1 text-lg font-semibold">
          <StatusIndicator />
        </p>
      </div>
    </div>
  );
}