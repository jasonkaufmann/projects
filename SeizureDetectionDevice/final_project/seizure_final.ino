#include <Event.h>
#include <Timer.h>
#include <arduinoFFT.h>
//DON"T EDIT ANYTHING HERE

#include <WiFi101.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_LSM303_U.h>
#define samples 128
#define sampling_frequency 100
arduinoFFT FFT = arduinoFFT();
unsigned int sampling_period;
unsigned long microseconds;

char ssid[] = "Jason"; //  your  network    SSID    ( name)
char pass[] = "12345678";     // your network password (use for WPA, or use as key for WEP)
int status = WL_IDLE_STATUS;
int i = 0;
long interval = 10000;
long previousMillis = 0;
int k = 1;
double movement = 0;
double Real[samples];
double Imag[samples];

//Declare SoftwareSerial object

//thingspeak server
char server[] = "api.thingspeak.com";

WiFiClient client;

//API key for the Thingspeak  ThingHTTP
const String apiKey = "T37GSCHI4CFTK4WX";

//EDIT STARTING HERE - the number   the message should be sent to and the input pins
Adafruit_LSM303_Accel_Unified accel = Adafruit_LSM303_Accel_Unified(54321);
void setup() {
  sampling_period = round(1000000 * (1.0 / sampling_frequency));
  pinMode(5, OUTPUT);
  Serial.begin(9600);
  //set up WiFi:
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println( "WiFi   shield    not  present" ) ;
    //  don't    continue:
    while (true);
  }
  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network. Change this line if using open or WEP network:
    status = WiFi.begin(ssid, pass);
    // wait 10 seconds  for  connection:
    delay(2000);
  }
  Serial.print("Connected to wifi ");
  // attempt to connect to Wifi network:
  //printWifiStatus();
  Serial.println("Accelerometer Test"); Serial.println("");
  /* Initialise the sensor */
  accel.begin();
  pinMode(1, INPUT);
  pinMode(3, OUTPUT);
}

void loop() {
  digitalWrite(3, HIGH);
  for (int i = 0; i < samples; i++) {
    microseconds = micros();
    Wire.begin();
    sensors_event_t event;
    accel.getEvent(&event);
    Wire.endTransmission();
    movement = sqrt(pow(event.acceleration.x, 2) + pow(event.acceleration.y, 2) + pow(event.acceleration.z, 2));
    Real[i] = movement;
    Imag[i] = 0;
    while (micros() < (microseconds + sampling_period)) {
    }
  }
  FFT.Windowing(Real, samples, FFT_WIN_TYP_HAMMING, FFT_FORWARD);
  FFT.Compute(Real, Imag, samples, FFT_FORWARD);
  double peak = FFT.MajorPeak(Real, samples, sampling_frequency);
  Serial.print("Dominant Frequency: "); Serial.print(peak); Serial.println("  ");
  if (peak >= 6 && peak <= 11) {
    k = k + 1;
  }
  unsigned long currenttime = millis();
  if (k >= 3) {
    digitalWrite(5, HIGH);
    unsigned long currenttime = millis();
    int fault = 0;
    while (fault == 0) {
      if (digitalRead(1) == HIGH) {
        digitalWrite(5, LOW);
        Serial.println("false alarm");
        k=0;
        fault = 1;
      } else if (millis() - currenttime == 5000) {
        Serial.print("Seizure occurring");
        digitalWrite(5, LOW);
        sendSMS();
        while (1);
      }
    }
  }
  reset();
  //Serial.print("Movement: "); Serial.print(movement); Serial.println("  ");
}

int reset() {
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis > interval) {
    Serial.println("SAMPLE RESET");
    k = 0;
    previousMillis = currentMillis;
  }
}

void sendSMS() {
  // Make a TCP connection  to  remote    host
  if (client.connect(server, 80)) {
    const String number = "+15619720038";
    String  message = URLEncode("Seizure detected. Assist immediately.");
    //should look like this...
    //api.thingspeak.com/apps/thinghttp/send_request?api_key={api key}&number={send  to  number}&message={text    body}
    client.print("GET   /apps/thinghttp/send_request?api_key="  ) ;
    client.print(apiKey);
    client.print("&number=");
    client.print(number);
    client.print ("&message=") ;
    client.print(message);
    //client.println("HTTP/1.1") ;
    //client.print("Host: ") ;
    //client.println(server);
    //client.println("Connection: close");
    client.println();
  }
  else {
    Serial.println(("Connection failed"));
  }
  // Check for a response from the server, and route it
  // out  the  serial   port.
  while (client.connected())   {
    if ( client.available() )
    {
      char c = client.read();
      Serial.print(c);
    }
  }
  Serial.println () ;
  client.stop();
}

String URLEncode(const char* msg)
{
  const char *hex  =  "0123456789abcdef";
  String encodedMsg = "";

  while (* msg != '\0'  ) {
    if (  ('a' <= *msg && *msg <= 'z')
          || ('A' <= *msg && *msg <= 'Z')
          ||  ( '0'  <=  *msg  &&  *msg  <=  '9')  )  {
      encodedMsg  +=  *msg;
    }
    else {
      encodedMsg += '%';
      encodedMsg += hex[  *msg  >>  4] ;
      encodedMsg += hex[*msg & 15];
    }
    msg++;
  }
  return encodedMsg;
}

void printWifiStatus()  {
  // print the SSID of  the  network    you're    attached    to:
  Serial.print ( "SSID: " ) ;
  Serial.println(WiFi.SSID());

  // print your WiFi   shield's IP  address:
  IPAddress ip  =  WiFi. localIP  () ;
  Serial.print("IP  Address:    " ) ;
  Serial.println(ip);

  // print  the  received  signal strength:
  long rssi = WiFi.RSSI() ;
  Serial.print ( "signal strength ( RSSI):") ;
  Serial.print(rssi);
  Serial.println(" dBm");
}
