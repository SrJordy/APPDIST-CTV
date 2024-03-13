#include "thingProperties.h"
#include <Wire.h>
#include <Adafruit_MLX90614.h>
#include <Adafruit_MPU6050.h>
#include "MAX30105.h"
#include "heartRate.h"
#include <HTTPClient.h>
#include <WiFi.h>
#include <algorithm> 

Adafruit_MLX90614 mlx = Adafruit_MLX90614(); // Sensor de temperatura
MAX30105 particleSensor; // Sensor de latidos del corazÃ³n

Adafruit_MPU6050 mpu;
#define GRAVITY_EARTH 9.81
unsigned long lastNotificationTime = 0; // Almacena la Ãºltima vez que se enviÃ³ una notificaciÃ³n

unsigned long startTimeBradycardia = 0;
unsigned long startTimeTachycardia = 0;
bool bradycardiaDetected = false;
bool tachycardiaDetected = false;
// Para std::sort

#define RATE_SIZE 10 // Aumentar para un promedio mÃ³vil mÃ¡s suave
byte rates[RATE_SIZE]; // Almacena las Ãºltimas N mediciones
int rateSpot = 0;
unsigned long lastBeat = 0; // Tiempo del Ãºltimo latido detectado
float beatAvg = 0; // Promedio de BPM

void setup() {
  Serial.begin(9600);
  delay(1500); 
  initProperties();
  ArduinoCloud.begin(ArduinoIoTPreferredConnection);
  setDebugMessageLevel(2);
  ArduinoCloud.printDebugInfo();
  
  // InicializaciÃ³n del sensor MAX30105
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) //Use default I2C port, 400kHz speed
  {
    Serial.println("MAX30105 was not found. Please check wiring/power. ");
    while (1);
  }
  Serial.println("Place your index finger on the sensor with steady pressure.");

  particleSensor.setup(); //Configure sensor with default settings
  particleSensor.setPulseAmplitudeRed(0x0A); //Turn Red LED to low to indicate sensor is running
  particleSensor.setPulseAmplitudeGreen(0); //Turn off Green LED

  Serial.println("Adafruit MLX90614 test");
  Wire.setClock(50000); // Reduce la velocidad del reloj I2C para el MLX90614
  if (!mlx.begin()) {
    Serial.println("Error connecting to MLX sensor. Check wiring.");
    //while (1);
  }
  Wire.setClock(100000);
  
  Serial.println("Iniciando MPU6050");
  if (!mpu.begin()) {
    Serial.println("No se pudo encontrar un MPU6050");
    while (1) {
      delay(10); // Halt
    }
  }

  // Configura el rango del acelerÃ³metro y el giroscopio segÃºn sea necesario
  mpu.setAccelerometerRange(MPU6050_RANGE_8_G);
}

void loop() {
  ArduinoCloud.update();
  readTemperature();
  readHeartRate();
  detectarCaida();
}

void readTemperature() {
  Wire.setClock(50000); // Reduce I2C clock speed for MLX90614 readings
  temperatura = mlx.readObjectTempC();
  Wire.setClock(100000); // Restore standard I2C clock speed
}

void readHeartRate() {
  long irValue = particleSensor.getIR();
    if (checkForBeat(irValue)) {
        unsigned long delta = millis() - lastBeat;
        lastBeat = millis();

        int beatsPerMinute = 60 / (delta / 1000.0);

        // Filtrar lecturas extremadamente bajas o altas que no son plausibles
        if (beatsPerMinute < 255 && beatsPerMinute > 20) {
            rates[rateSpot++] = (byte)beatsPerMinute;
            rateSpot %= RATE_SIZE;

            // Copiar y ordenar las mediciones para filtrar valores atÃ­picos
            byte sortedRates[RATE_SIZE];
            memcpy(sortedRates, rates, RATE_SIZE);
            std::sort(sortedRates, sortedRates + RATE_SIZE);

            // Calcular el promedio sin contar los valores extremos (el mÃ¡s bajo y el mÃ¡s alto)
            int sum = 0;
            for (int i = 1; i < RATE_SIZE - 1; i++) {
                sum += sortedRates[i];
            }
            beatAvg = sum / (RATE_SIZE - 2);

            latidos = beatAvg;
        }
    }

  if (irValue < 50000){
    latidos = 0;
  }
}


void detectarCaida() {
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);
  
  // Calcular la magnitud de la aceleraciÃ³n (cuadrado de la magnitud)
  float accMagnitudeSquared = a.acceleration.x * a.acceleration.x + 
                              a.acceleration.y * a.acceleration.y + 
                              a.acceleration.z * a.acceleration.z;

  float umbralInicioCaidaSquared = (1.2 * GRAVITY_EARTH) * (1.2 * GRAVITY_EARTH);
  float umbralImpactoSquared = (2.0 * GRAVITY_EARTH) * (2.0 * GRAVITY_EARTH);
  float umbralCaidaLibreSquared = (0.5 * GRAVITY_EARTH) * (0.5 * GRAVITY_EARTH);
  
  static bool cayendo = false;
  static unsigned long tiempoInicioCaida = 0;

  // Detectar inicio de caÃ­da
  if (accMagnitudeSquared > umbralInicioCaidaSquared && !cayendo) {
    cayendo = true;
    tiempoInicioCaida = millis();
  }

  if (cayendo) {
    if (accMagnitudeSquared < umbralCaidaLibreSquared) {
      if (millis() - tiempoInicioCaida > 100) { 
        cayendo = false; 
      }
    } else if (accMagnitudeSquared > umbralImpactoSquared) {
      // Impacto detectado
      caida = true;
      cayendo = false;
      sendNotification(); 
    }
  }
}

/*
  Since Temperatura is READ_WRITE variable, onTemperaturaChange() is
  executed every time a new value is received from IoT Cloud.
*/
void onTemperaturaChange()  {
  // Add your code here to act upon Temperatura change
}
/*
  Since Latidos is READ_WRITE variable, onLatidosChange() is
  executed every time a new value is received from IoT Cloud.
*/
void onLatidosChange()  {
  // Add your code here to act upon Latidos change
}
/*
  Since Caida is READ_WRITE variable, onCaidaChange() is
  executed every time a new value is received from IoT Cloud.
*/
void onCaidaChange()  {
  // Add your code here to act upon Caida change
}

void sendNotification() {
  if(WiFi.status() == WL_CONNECTED){
    HTTPClient http;
    
    // Utiliza la URL de tu API
    http.begin("https://carinosaapi.onrender.com/api/sendp"); 
    http.addHeader("Content-Type", "application/json");
    
    // Construye el cuerpo del JSON con la condiciÃ³n detectada y los BPM
    String httpRequestData = "{\"title\":\"Alerta de caÃ­da\",\"body\":\"Se detectÃ³ una caÃ­da\"}";
    int httpResponseCode = http.POST(httpRequestData);

    if(httpResponseCode > 0) {
      String response = http.getString(); // Recibe la respuesta
      Serial.println(response);
    }
    else {
      Serial.print("Error en el envÃ­o: ");
      Serial.println(httpResponseCode);
    }
    http.end(); // Cierra la conexiÃ³n
  }
  else {
    Serial.println("Error en la conexiÃ³n WiFi");
  }
}