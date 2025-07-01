'use client';

import { useState } from 'react';
import { useMqtt, useSubscription } from '@/context/MqttContext';
import { Button } from '@/components/atoms/Button';
import { Rocket, Server, Wifi, WifiOff } from 'lucide-react';

// The types of messages we expect from the ESP32 on the status topic
type DeviceStatus = 'online' | 'offline' | 'running' | 'complete' | 'connecting...';

const DEVICE_ID = 'esp32-alpha';
const STATUS_TOPIC = `labreach/sim/${DEVICE_ID}/status`;

export function EspControlPanel() {
  // The component's state is now driven by MQTT messages.
  // We start in a neutral 'connecting...' state.
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>('connecting...');
  
  // Get the overall MQTT connection status from our main context
  const { connectionStatus: brokerStatus, publish } = useMqtt();
  
  // Use a custom hook to subscribe to the device's specific status topic
  useSubscription(STATUS_TOPIC, (message) => {
    // When a message arrives on the status topic, update our component's state
    console.log(`Received device status update: ${message}`);
    setDeviceStatus(message as DeviceStatus);
  });
  
  const isDeviceReady = brokerStatus === 'Connected' && deviceStatus === 'online';

  const handleRunExperiment = () => {
    // This no longer needs to set the status itself.
    // The ESP32 will do that for us by publishing its new status.
    console.log(`Publishing "RUN" command for ${DEVICE_ID}`);
    const commandTopic = `labreach/sim/${DEVICE_ID}/command`;
    const payload = JSON.stringify({ experiment: 'blink-led', count: 7 });
    publish(commandTopic, payload, 1);
  };

  // A more dynamic status indicator
  const StatusIndicator = () => {
    if (brokerStatus !== 'Connected') {
      return <span className="text-muted-foreground">Broker: {brokerStatus}</span>;
    }
    switch (deviceStatus) {
      case 'online':
        return <span className="text-green-400">Online</span>;
      case 'offline':
        return <span className="text-red-500">Offline</span>;
      case 'running':
        return <span className="animate-pulse text-accent">Running Experiment...</span>;
      case 'complete':
        return <span className="text-secondary">Task Complete</span>;
      default:
        return <span className="animate-pulse text-muted-foreground">{deviceStatus}</span>;
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
      <div className="mb-4">
        <h3 className="text-xl font-bold">ESP32 Control Panel</h3>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Server className="h-4 w-4" /> Device ID: {DEVICE_ID}
        </p>
      </div>
      
      <Button 
        onClick={handleRunExperiment} 
        disabled={!isDeviceReady}
        className="w-full"
      >
        <Rocket className="mr-2 h-5 w-5" />
        Run Experiment on Device
      </Button>

      <div className="mt-4 rounded-md border border-border bg-background p-4">
        <div className="flex items-center justify-between">
          <p className="font-medium">Device Status</p>
          {deviceStatus === 'online' ? <Wifi className="h-5 w-5 text-green-400" /> : <WifiOff className="h-5 w-5 text-red-500" />}
        </div>
        <p className="mt-1 text-lg font-semibold">
          <StatusIndicator />
        </p>
      </div>
    </div>
  );
}