// src/lib/lab-data.ts

export interface LabExerciseType {
    id: string;
    name: string;
    componentName: string;
    imageSrc: string;
    code: string;
  }
  
  export const labExercises: LabExerciseType[] = [
    {
      id: 'blink-led',
      name: '1. Blink an LED',
      componentName: 'LED and Resistor Circuit',
      imageSrc: '/images/lab/blinkLED.png',
      code: `#include <Arduino.h>
  // Define the pin number for the LED
const int ledPin = 14;

void setup() {
  // Initialize the LED pin as an output
  pinMode(ledPin, OUTPUT);
}

void loop() {
  // Turn the LED on (HIGH is the voltage level)
  digitalWrite(ledPin, HIGH);
  // Wait for a second
  delay(1000);
  // Turn the LED off (LOW is the voltage level)
  digitalWrite(ledPin, LOW);
  // Wait for a second
  delay(1000);
}`,
    },
    {
      id: 'lcd-display',
      name: '2. Hello World on LCD',
      componentName: 'LCD Display',
      imageSrc: '/images/lab/lcd-display.png',
      code: `#include <Wire.h> 
  #include <LiquidCrystal_I2C.h>
  
  // Set the LCD address to 0x27 for a 16 chars and 2 line display
  LiquidCrystal_I2C lcd(0x27, 16, 2);
  
  void setup() {
    // Initialize the LCD
    lcd.begin();
    
    // Turn on the blacklight
    lcd.backlight();
    lcd.setCursor(0, 0);
    lcd.print("Hello, World!");
  }
  
  void loop() {
    // Do nothing here
  }`,
    },
    {
      id: 'resistance-measurement',
      name: '3. Read Analog Voltage',
      componentName: 'Analog Potentiometer',
      imageSrc: '/images/lab/potentiometer.png',
      code: `#include <Arduino.h>
  
  // Analog pin to read from (e.g., a potentiometer)
  #define ANALOG_PIN 34 
  
  void setup() {
    Serial.begin(115200);
  }
  
  void loop() {
    // Read the analog value from the pin
    int analogValue = analogRead(ANALOG_PIN);
  
    // Convert the analog value (0-4095) to a voltage (0-3.3V)
    float voltage = analogValue * (3.3 / 4095.0);
  
    Serial.print("Analog Value: ");
    Serial.print(analogValue);
    Serial.print(", Voltage: ");
    Serial.print(voltage);
    Serial.println("V");
  
    delay(500);
  }`,
    },
  ];
  
  // Helper function to find a specific exercise by its ID
  export const getExerciseById = (id: string): LabExerciseType | undefined => {
      return labExercises.find(exercise => exercise.id === id);
  }