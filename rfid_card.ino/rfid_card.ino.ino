#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266WebServer.h>
#include <SPI.h>
#include <MFRC522.h>
#include "ThingSpeak.h"
#define SS_PIN 4
#define RST_PIN 5
#define USE_SERIAL Serial
#include <ArduinoJson.h>
#include <ESP8266HTTPClient.h>
#include<string>
ESP8266WiFiMulti wifiMulti;
WiFiClient  client;
MFRC522 mfrc522(SS_PIN, RST_PIN);  
String str;
unsigned long myChannelNumber = 862657;
String apiKey = "N901PGAJCN3KIQ6G";  ;
const char* server = "api.thingspeak.com";
void setup()
{
  Serial.begin(115200);   // Initiate a serial communication
  SPI.begin();      // Initiate  SPI bus
  mfrc522.PCD_Init();   // Initiate MFRC522
  Serial.println("Approximate your card to the reader...");
  Serial.println();
   WiFi.mode(WIFI_STA);
  wifiMulti.addAP("ASUS_X00PD","nanirocks");
  wifiMulti.addAP("karthik", "12345678");
   Serial.println("Connecting Wifi...");
  if (wifiMulti.run() == WL_CONNECTED) {
   Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
    Serial.print("Netmask: ");
    Serial.println(WiFi.subnetMask());
    Serial.print("Gateway: ");
    Serial.println(WiFi.gatewayIP());
    ThingSpeak.begin(client);
    }

}
void check(){
     if (str == "20614015289" || str=="2537720910") //change here the UID of the card/cards that you want to give access
      {
      Serial.println("Authorized access");
      Serial.println();
      delay(3000);
      delay(100);
      }
       else   {
            Serial.println(" Access denied");
            delay(3000);
     }
 }
void update1 (){
 
     str="";
  if ( ! mfrc522.PICC_IsNewCardPresent())
  {
    return;
  }
  // Select one of the cards
  if ( ! mfrc522.PICC_ReadCardSerial())
  {
    return;
  }
  Serial.print("UID tag :");
  String content= "";
  //String a="FD 4D D1 0A";
//  Serial.print(a);
  byte k=0;
  String arr[10];
 // String str;
  for (byte i = 0; i < mfrc522.uid.size; i++)
  {
     //Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
 // Serial.print("See this -> ");
   arr[i]=(mfrc522.uid.uidByte[i]);
     content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
     content.concat(String(mfrc522.uid.uidByte[i], HEX));
     k=k+1;
  }
 
//  for(int i=0;i<10;i++){
//  Serial.print(arr[i]);
//  }
for(int i=0;i<4;i++){
    str=str+String(arr[i]);
    }
     //Serial.print("See -> (");
    // long b=str.toInt();
    //Serial.print(str);
    //Serial.print(")");
  if (client.connect(server,80))  
                  {  
                             
                             String postStr = apiKey;
                             postStr +="&field1=";
                             postStr +=str;
                             //postStr += "\r\n\r\n";
                             client.print("POST /update HTTP/1.1\n");
                             client.print("Host: api.thingspeak.com\n");
                             client.print("Connection: close\n");
                             client.print("X-THINGSPEAKAPIKEY: "+apiKey+"\n");
                             client.print("Content-Type: application/x-www-form-urlencoded\n");
                             client.print("Content-Length: ");
                             client.print(postStr.length());
                             client.print("\n\n");
                             client.print(postStr);
                             client.flush();
                             Serial.println(postStr);
 
                            // Serial.print("UID");
                             //Serial.print(content);
                             Serial.println("Data has been sussecfully sent to Thingspeak.");
                        }
          client.stop();
  byte letter;
 
  Serial.println();
  Serial.print("Message : ");
  content.toUpperCase();
 
  //  ThingSpeak.writeFields(myChannelNumber, myWriteAPIKey);/*  
 check();
 

     
   }
void loop()
{
     WiFiClient client;
    HTTPClient http;
    const int httpPort = 80;
  if (wifiMulti.run() != WL_CONNECTED) {
      Serial.println("WiFi not connected!");
      delay(1000);
    }

  if (WiFi.SSID()== "karthik"){
      Serial.println(WiFi.SSID());
       }
         if (WiFi.SSID()== "ASUS_X00PD"){
      Serial.println(WiFi.SSID());
      update1();
         }
  }
