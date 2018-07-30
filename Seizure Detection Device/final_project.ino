//DON"T EDIT ANYTHING HERE
      #include <SPI.h> 
      #include <WiFi101.h> 
      
      char ssid[] = "hp-setup-1"; //  your  network    SSID    ( name)  
      char pass[] = "WelcomeHal";     // your network password (use for WPA, or use as key for WEP) 
      int status = WL_IDLE_STATUS; 
      int i = 0;

      //Declare SoftwareSerial object
       
      //thingspeak server 
      char server[] = "api.thingspeak.com"; 
       
      WiFiClient client; 
       
      //API key for the Thingspeak  ThingHTTP  
      const String apiKey = "OO11KHQZAPQU3E7U"; 
       
//EDIT STARTING HERE - the number   the message should be sent to and the input pins 
      const String sendNumber = "+18324549145"; 
      
      void setup() { 
        Serial.begin(9600);
        //set up WiFi: 
        if (WiFi.status() == WL_NO_SHIELD) { 
          Serial.println( "WiFi   shield    not  present" ) ;  
           //  don't    continue:  
          while(true); 
        }  
         
        // attempt to connect to Wifi network: 
         while (status != WL_CONNECTED) {  
          Serial.print("Attempting to connect to SSID: "); 
           Serial.println(ssid); 
          // Connect to WPA/WPA2 network. Change this line if using open or WEP network:     
          status = WiFi.begin(ssid, pass); 
          // wait 10 seconds  for  connection:   
          delay(10000); 
        }  
        Serial.println("Connected to wifi"); 
        //printWifiStatus();
         
      } 
      
      void loop() {
        if (i == 0) {
          Serial.println("Sending SMS");        
          //EDIT MESSAGE TO SEND
          sendSMS(sendNumber, URLEncode("this shit works!!!")); 
          i++;
        }

        }

      void sendSMS(String number, String message) { 
        // Make a TCP connection  to  remote    host   
        
        if (client.connect(server, 80)) { 
          Serial.println("connected");
          //should look like this... 
          //api.thingspeak.com/apps/thinghttp/send_request?api_key={api key}&number={send  to  number}&message={text    body}  
          client.print("GET   /apps/thinghttp/send_request?api_key="  ) ; 
          client.print(apiKey); 
          client.print("&number=");     
          client.print(number); 
          client.print ("&message=") ;     
          client.print(message); 
          client.println("HTTP/1.1") ; 
          client.print("Host: ") ; 
          client.println(server); 
          client.println("Connection: close"); 
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
       
        while (* msg != '\0'  ){ 
          if(  ('a' <= *msg && *msg <= 'z') 
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
