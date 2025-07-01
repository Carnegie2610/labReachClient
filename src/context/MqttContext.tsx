'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback, useRef } from 'react';
import mqtt, { MqttClient, IClientOptions } from 'mqtt';

// --- Configuration ---
const BROKER_URL = 'wss://uad0f873.ala.eu-central-1.emqxsl.com:8084/mqtt';
const CLIENT_ID = `labreach_webapp_${Math.random().toString(16).substring(2, 8)}`;
const connectionOptions: IClientOptions = {
  clientId: CLIENT_ID,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
  username: 'milko',
  password: 'milkovic',
};

// --- THE FIX IS HERE: The Context Type Definition ---
interface MqttContextType {
  connectionStatus: string;
  publish: (topic: string, payload: string, qos?: 0 | 1 | 2) => void;
  // We explicitly add clientRef to the type definition.
  clientRef: React.RefObject<MqttClient | null>;
}

const MqttContext = createContext<MqttContextType | null>(null);

// --- The Provider ---
export function MqttProvider({ children }: { children: ReactNode }) {
  const clientRef = useRef<MqttClient | null>(null);
  const [connectionStatus, setConnectionStatus] = useState('Closed');

  useEffect(() => {
    if (clientRef.current === null) {
      clientRef.current = mqtt.connect(BROKER_URL, connectionOptions);
      const client = clientRef.current;

      client.on('connect', () => {
        console.log('%cMQTT: Connected to broker.', 'color: green; font-weight: bold;');
        setConnectionStatus('Connected');
      });
      // ... other event listeners
    }
    return () => {
      if (clientRef.current) {
        clientRef.current.end(true);
        clientRef.current = null;
      }
    };
  }, []);

  const publish = useCallback((topic: string, payload: string, qos: 0 | 1 | 2 = 1) => {
    if (clientRef.current && clientRef.current.connected) {
      clientRef.current.publish(topic, payload, { qos }, (error) => {
        if (error) console.error('MQTT Publish Callback Error:', error);
      });
    }
  }, []);

  return (
    // The value object now perfectly matches the MqttContextType interface
    <MqttContext.Provider value={{ connectionStatus, publish, clientRef }}>
      {children}
    </MqttContext.Provider>
  );
}

// --- Custom Hooks (No changes needed here from last version) ---
export function useMqtt() {
  const context = useContext(MqttContext);
  if (!context) throw new Error('useMqtt must be used within an MqttProvider');
  return context;
}

export function useSubscription(topic: string, onMessage: (message: string) => void) {
  const { clientRef, connectionStatus } = useMqtt();

  useEffect(() => {
    if (clientRef.current && connectionStatus === 'Connected') {
      const client = clientRef.current;
      const messageHandler = (t: string, message: Buffer) => {
        if (t === topic) onMessage(message.toString());
      };
      
      client.subscribe(topic);
      client.on('message', messageHandler);

      return () => {
        client.removeListener('message', messageHandler);
        client.unsubscribe(topic);
      };
    }
  }, [clientRef, connectionStatus, topic, onMessage]);
}