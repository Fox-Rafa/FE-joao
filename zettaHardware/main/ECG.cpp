// Rafael Fox 2022
//
//
//  ██████╗   █████╗  ███████╗  █████╗  ███████╗ ██╗           ███████╗  ██████╗  ██╗  ██╗
//  ██╔══██╗ ██╔══██╗ ██╔════╝ ██╔══██╗ ██╔════╝ ██║           ██╔════╝ ██╔═══██╗ ╚██╗██╔╝
//  ██████╔╝ ███████║ █████╗   ███████║ █████╗   ██║           █████╗   ██║   ██║  ╚███╔
//  ██╔══██╗ ██╔══██║ ██╔══╝   ██╔══██║ ██╔══╝   ██║           ██╔══╝   ██║   ██║  ██╔██╗
//  ██║  ██║ ██║  ██║ ██║      ██║  ██║ ███████╗ ███████╗      ██║      ╚██████╔╝ ██╔╝ ██╗
//  ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝      ╚═╝  ╚═╝ ╚══════╝ ╚══════╝      ╚═╝       ╚═════╝  ╚═╝  ╚═╝

#include <Arduino.h>
#include <math.h>

#include "Defs.c"
#include "Manage_preferences.h"

void flush_adc(int flush_duration /*in ms*/) {
  int reading_v1, reading_v2, reading_v3, reading_v4, reading_v5, reading_v6, reading_la, reading_ra, reading_ll, reading_ref;

  int start_time = micros();
  while (micros() - start_time <= flush_duration * 100) {
    reading_v1 = analogRead(chv1);
    reading_v2 = analogRead(chv2);
    reading_v3 = analogRead(chv3);
    reading_v4 = analogRead(chv4);
    reading_v5 = analogRead(chv5);
    reading_v6 = analogRead(chv6);
    reading_la = analogRead(chla);
    reading_ra = analogRead(chra);
    reading_ll = analogRead(chll);
    reading_ref = analogRead(chRef);
    delay(3);
  }
}

struct Exam sample_ecg() {
  struct Exam exam;

  int last_sample_time = millis(), current_time, reference_voltage, n;
  int f, e;

  while (n < duration * sample_rate) {
    current_time = millis();
    if (current_time - last_sample_time >= 4) {
      f = floor(n / 10);
      e = n % 10;

      exam.v1[f][e] = analogRead(chv1);
      exam.v2[f][e] = analogRead(chv2);
      exam.v3[f][e] = analogRead(chv3);
      exam.v4[f][e] = analogRead(chv4);
      exam.v5[f][e] = analogRead(chv5);
      exam.v6[f][e] = analogRead(chv6);
      exam.la[f][e] = analogRead(chla);
      exam.ra[f][e] = analogRead(chra);
      exam.ll[f][e] = analogRead(chll);
      exam.ref[f][e] = analogRead(chRef);

      n++;
    }
  }

  return (exam);
}

void start_ecg() {
  Serial.begin(SERIAL_RATE);
  Serial.println('Flushing adc...');
  flush_adc(1000);
  Serial.println('Done flushing adc.\n');

  Serial.println('Recording ECG...');
  struct Exam recorder_ecg = sample_ecg();
  Serial.println('ECG recording done.\n');

  struct Config config = get_config();
  Serial.println('Sending ECG over BLE...');
  BLE_send_exam(recorder_ecg, config);
  Serial.println('Done sending exam.\n');
}
