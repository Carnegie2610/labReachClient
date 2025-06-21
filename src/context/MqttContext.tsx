'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import mqtt, { MqttClient, IClientOptions } from 'mqtt';

// --- Configuration ---
const BROKER_URL = 'wss://uad0f873.ala.eu-central-1.emqxsl.com:8084/mqtt'; // Secure WebSocket for Browsers
const CLIENT_ID = `labreach_webapp_${Math.random().toString(16).substring(2, 8)}`;

// --- IMPORTANT: Use the credentials you created in your EMQX Cloud Dashboard ---
const connectionOptions: IClientOptions = {
  clientId: CLIENT_ID,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
  username: 'milko', // Replace with your actual username
  password: 'milkovic', // Replace with your actual password
};

// --- Context Definition & Provider ---
interface MqttContextType {
  connectionStatus: string;
  client: MqttClient | null;
  publish: (topic: string, payload: string, qos?: 0 | 1 | 2) => void;
}

const MqttContext = createContext<MqttContextType | null>(null);

export function MqttProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [connectionStatus, setConnectionStatus] = useState('Closed');

  useEffect(() => {
    console.log('MQTT: Attempting to connect...');
    setConnectionStatus('Connecting');
    const mqttClient = mqtt.connect(BROKER_URL, connectionOptions);

    mqttClient.on('connect', () => {
      console.log('MQTT: Connected to broker.');
      setConnectionStatus('Connected');
    });
    // ... (other event listeners: reconnect, close, error)

    setClient(mqttClient);

    return () => {
      if (mqttClient) {
        mqttClient.end(true);
        setConnectionStatus('Closed');
      }
    };
  }, []);

  const publish = useCallback((topic: string, payload: string, qos: 0 | 1 | 2 = 1) => {
    if (client && connectionStatus === 'Connected') {
      client.publish(topic, payload, { qos }, (error) => {
        if (error) console.error('MQTT Publish Error:', error);
      });
    }
  }, [client, connectionStatus]);

  return (
    <MqttContext.Provider value={{ connectionStatus, client, publish }}>
      {children}
    </MqttContext.Provider>
  );
}

// --- Custom Hooks ---
export function useMqtt() {
  const context = useContext(MqttContext);
  if (!context) throw new Error('useMqtt must be used within an MqttProvider');
  return context;
}

export function useSubscription(topic: string, onMessage: (message: string) => void) {
    const { client, connectionStatus } = useMqtt();
    useEffect(() => {
        if (client && connectionStatus === 'Connected') {
            client.subscribe(topic);
            const messageHandler = (t: string, message: Buffer) => {
                if (t === topic) onMessage(message.toString());
            };
            client.on('message', messageHandler);
            return () => {
                client.removeListener('message', messageHandler);
                client.unsubscribe(topic);
            };
        }
    }, [client, connectionStatus, topic, onMessage]);
}