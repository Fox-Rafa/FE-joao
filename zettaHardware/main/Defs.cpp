// Rafael Fox 2022
//
//
//  ██████╗   █████╗  ███████╗  █████╗  ███████╗ ██╗           ███████╗  ██████╗  ██╗  ██╗
//  ██╔══██╗ ██╔══██╗ ██╔════╝ ██╔══██╗ ██╔════╝ ██║           ██╔════╝ ██╔═══██╗ ╚██╗██╔╝
//  ██████╔╝ ███████║ █████╗   ███████║ █████╗   ██║           █████╗   ██║   ██║  ╚███╔
//  ██╔══██╗ ██╔══██║ ██╔══╝   ██╔══██║ ██╔══╝   ██║           ██╔══╝   ██║   ██║  ██╔██╗
//  ██║  ██║ ██║  ██║ ██║      ██║  ██║ ███████╗ ███████╗      ██║      ╚██████╔╝ ██╔╝ ██╗
//  ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝      ╚═╝  ╚═╝ ╚══════╝ ╚══════╝      ╚═╝       ╚═════╝  ╚═╝  ╚═╝

#include <stdio.h>

/* PINS */
const int chv1 = 27;  // V1
const int chv2 = 36;  // V2
const int chv3 = 35;  // V3
const int chv4 = 0;   // V1
const int chv5 = 0;   // V2
const int chv6 = 0;   // V3
const int chra = 32;  // RA
const int chll = 33;  // LL
const int chla = 34;  // LA

/* EXAM CONFIG */
const int sample_rate = 250;
const int chRef = 34;
const int duration = 10;

/*
const float V1_g = 1.0024283097;  // 364.0/363.1182364728
const float V2_g = 0.9938705762;  // 364.0/366.2448700249
const float V3_g = 0.9672839838;  // 364.0/376.3114102
const float V4_g = 1;             // NOT BEING USED *NOT CALIBRATED
const float V5_g = 1;             // NOT BEING USED *NOT CALIBRATED
const float V6_g = 1;             // NOT BEING USED *NOT CALIBRATED
const float LA_g = 0.9681014113;  // 364.0/375.9936673589
const float RA_g = 0.982810625;   // 364.0/370.3663663664
const float LL_g = 0.9757536164;  // 364.0/373.0449919841

const int V1_o = 2;  // *NOT CALIBRATED
const int V2_o = 2;  // *NOT CALIBRATED
const int V3_o = 2;  // *NOT CALIBRATED
const int V4_o = 2;  // NOT BEING USED *NOT CALIBRATED
const int V5_o = 2;  // NOT BEING USED *NOT CALIBRATED
const int V6_o = 2;  // NOT BEING USED *NOT CALIBRATED
const int LA_o = 2;  // *NOT CALIBRATED
const int RA_o = 2;  // *NOT CALIBRATED
const int LL_o = 2;  // *NOT CALIBRATED
*/

const int SERIAL_RATE = 115200;
// const int size = sample_rate * duration;
#define size 231

struct Exam {
  short int v1[size / 10][10];
  short int v2[size / 10][10];
  short int v3[size / 10][10];
  short int v4[size / 10][10];
  short int v5[size / 10][10];
  short int v6[size / 10][10];
  short int la[size / 10][10];
  short int ra[size / 10][10];
  short int ll[size / 10][10];
  short int ref[size / 10][10];
} Exam;

struct Config {
  int SERNO;
  int SERVICE_UUID;
  int CHARACTERISTIC_UUID;

  float V1_g;
  float V2_g;
  float V3_g;
  float V4_g;
  float V5_g;
  float V6_g;
  float LA_g;
  float RA_g;
  float LL_g;

  float V1_o;
  float V2_o;
  float V3_o;
  float V4_o;
  float V5_o;
  float V6_o;
  float LA_o;
  float RA_o;
  float LL_o;
} Config;

struct Lead {
  short int ls[size / 10][10];
} Lead;
