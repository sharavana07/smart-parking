#include <WiFi.h>
#include <HTTPClient.h>

// Define Wi-Fi credentials
const char* ssid = "Butter";
const char* password = "terabaap";

// Define ThingSpeak or server settings
const char* server = "https://api.thingspeak.com";
const String apiKey = "1TJE3X658PW4YLI8"; // Replace with your ThingSpeak Write API Key

// Define pins for Sensor 1
const int trigPin1 = 5;
const int echoPin1 = 18;

// Define pins for Sensor 2
const int trigPin2 = 19;
const int echoPin2 = 21;

// Define LED pins for Sensor 1
const int redLED1 = 12;
const int greenLED1 = 13;

// Define LED pins for Sensor 2
const int redLED2 = 25;
const int greenLED2 = 26;

// Define sound speed in cm/uS
#define SOUND_SPEED 0.034
#define CM_TO_INCH 0.393701

long duration1, duration2;
float distanceCm1, distanceCm2;

void setup() {
  Serial.begin(115200); // Start serial communication

  // Connect to Wi-Fi
  Serial.print("Connecting to Wi-Fi");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println(" Connected!");

  // Set up pins for Sensor 1
  pinMode(trigPin1, OUTPUT);
  pinMode(echoPin1, INPUT);

  // Set up pins for Sensor 2
  pinMode(trigPin2, OUTPUT);
  pinMode(echoPin2, INPUT);

  // Set up LED pins
  pinMode(redLED1, OUTPUT);
  pinMode(greenLED1, OUTPUT);
  pinMode(redLED2, OUTPUT);
  pinMode(greenLED2, OUTPUT);
}

void loop() {
  // Measure distance for Sensor 1
  digitalWrite(trigPin1, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin1, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin1, LOW);
  duration1 = pulseIn(echoPin1, HIGH);
  distanceCm1 = duration1 * SOUND_SPEED / 2;

  // Measure distance for Sensor 2
  digitalWrite(trigPin2, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin2, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin2, LOW);
  duration2 = pulseIn(echoPin2, HIGH);
  distanceCm2 = duration2 * SOUND_SPEED / 2;

  // Control LEDs for Sensor 1
  if (distanceCm1 <= 5) {
    digitalWrite(redLED1, HIGH);
    digitalWrite(greenLED1, LOW);
  } else {
    digitalWrite(redLED1, LOW);
    digitalWrite(greenLED1, HIGH);
  }

  // Control LEDs for Sensor 2
  if (distanceCm2 <= 5) {
    digitalWrite(redLED2, HIGH);
    digitalWrite(greenLED2, LOW);
  } else {
    digitalWrite(redLED2, LOW);
    digitalWrite(greenLED2, HIGH);
  }
  Serial.print("Wi-Fi status: ");
  Serial.println(WiFi.status());
  Serial.print("Signal strength (RSSI): ");
  Serial.println(WiFi.RSSI());

  // Print distances for both sensors
  Serial.print("Sensor 1 - Distance (cm): ");
  Serial.println(distanceCm1);
  Serial.print("Sensor 2 - Distance (cm): ");
  Serial.println(distanceCm2);


  // Send data to the server in JSON format
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(String(server) + "/update");
    http.addHeader("Content-Type", "application/json");

    // Construct JSON payload
    String jsonPayload = "{";
    jsonPayload += "\"api_key\": \"" + apiKey + "\",";
    jsonPayload += "\"field1\": " + String(distanceCm1) + ",";
    jsonPayload += "\"field2\": " + String(distanceCm2);
    jsonPayload += "}";

    int httpResponseCode = http.POST(jsonPayload);

    if (httpResponseCode > 0) {
      Serial.print("Data sent to server, response code: ");
      Serial.println(httpResponseCode);
      Serial.println("Response: " + http.getString());
    } else {
      Serial.print("Error sending data: ");
      Serial.println(http.errorToString(httpResponseCode).c_str());
    }

    http.end();
  } else {
    Serial.println("Wi-Fi not connected!");
  }

  delay(1000); // Delay between readings (2 seconds)
}