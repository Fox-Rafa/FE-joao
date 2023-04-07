// Rafael Fox 2022
//
//
//  ██████╗   █████╗  ███████╗  █████╗  ███████╗ ██╗           ███████╗  ██████╗  ██╗  ██╗
//  ██╔══██╗ ██╔══██╗ ██╔════╝ ██╔══██╗ ██╔════╝ ██║           ██╔════╝ ██╔═══██╗ ╚██╗██╔╝
//  ██████╔╝ ███████║ █████╗   ███████║ █████╗   ██║           █████╗   ██║   ██║  ╚███╔
//  ██╔══██╗ ██╔══██║ ██╔══╝   ██╔══██║ ██╔══╝   ██║           ██╔══╝   ██║   ██║  ██╔██╗
//  ██║  ██║ ██║  ██║ ██║      ██║  ██║ ███████╗ ███████╗      ██║      ╚██████╔╝ ██╔╝ ██╗
//  ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝      ╚═╝  ╚═╝ ╚══════╝ ╚══════╝      ╚═╝       ╚═════╝  ╚═╝  ╚═╝

/*
#include <ESPmDNS.h>
#include <WebServer.h>
#include <WiFi.h>
#include <WiFiClient.h>
*/

#include <Arduino.h>
#include <stdio.h>

//#include "Defs.c"
#include "BLE_communication.h"
#include "Defs.h"
#include "ECG.h"
#include "Manage_preferences.h"

struct Config config;
void setup() {
  config = get_config();

  setupBLE(config.SERVICE_UUID, config.CHARACTERISTIC_UUID);

  Serial.begin(SERIAL_RATE);
  Serial.println('Zetta');
  Serial.println('Made by Rafael Fox Ⓒ 2022');
  Serial.println();
  Serial.println();
  Serial.println(' ██████╗   █████╗  ███████╗  █████╗  ███████╗ ██╗           ███████╗  ██████╗  ██╗  ██╗ ');
  Serial.println(' ██╔══██╗ ██╔══██╗ ██╔════╝ ██╔══██╗ ██╔════╝ ██║           ██╔════╝ ██╔═══██╗ ╚██╗██╔╝ ');
  Serial.println(' ██████╔╝ ███████║ █████╗   ███████║ █████╗   ██║           █████╗   ██║   ██║  ╚███╔   ');
  Serial.println(' ██╔══██╗ ██╔══██║ ██╔══╝   ██╔══██║ ██╔══╝   ██║           ██╔══╝   ██║   ██║  ██╔██╗  ');
  Serial.println(' ██║  ██║ ██║  ██║ ██║      ██║  ██║ ███████╗ ███████╗      ██║      ╚██████╔╝ ██╔╝ ██╗ ');
  Serial.println(' ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝      ╚═╝  ╚═╝ ╚══════╝ ╚══════╝      ╚═╝       ╚═════╝  ╚═╝  ╚═╝	');
  Serial.println();
  Serial.println();
  Serial.println(' ###################################################################################### ');
  Serial.println();
  Serial.println('-SAVED CALIBRATION DATA');
  Serial.println();
  Serial.println('Serial number: ', config.SERNO);
  Serial.println();
  Serial.println('-SAVED CALIBRATION DATA');
  Serial.println();
  Serial.println('Gains:');
  Serial.println('V1_g: ', config.V1_g);
  Serial.println('V2_g: ', config.V2_g);
  Serial.println('V3_g: ', config.V3_g);
  Serial.println('V4_g: ', config.V4_g);
  Serial.println('V5_g: ', config.V5_g);
  Serial.println('V6_g: ', config.V6_g);
  Serial.println('LA_g: ', config.LA_g);
  Serial.println('RA_g: ', config.RA_g);
  Serial.println('LL_g: ', config.LL_g);
  Serial.println('V1_o: ', config.V1_o);

  Serial.println();
  Serial.println('Offsets:');
  Serial.println('V2_o: ', config.V2_o);
  Serial.println('V3_o: ', config.V3_o);
  Serial.println('V4_o: ', config.V4_o);
  Serial.println('V5_o: ', config.V5_o);
  Serial.println('V6_o: ', config.V6_o);
  Serial.println('LA_o: ', config.LA_o);
  Serial.println('RA_o: ', config.RA_o);
  Serial.println('LL_o: ', config.LL_o);
}

int main() {
  //
  BLE_handler();

  return 0;
}

/*
if (BLE_is_connected()) {
     if ( ) { //exam started
  Serial.println('Flushing adc...');
  flush_adc(flush_duration = 1000);
  Serial.println('Done flushing adc.\n');

  Serial.println('Recording ECG...');
  struct Exam recorder_ecg = sample_ecg();
  Serial.println('ECG recording done.\n');

  Serial.println('Sending ECG over BLE...');
  BLE_send_exam(exam = recorder_ecg, config = config);
  Serial.println('Done sending exam.\n');
}
}
*/
