// Rafael Fox 2022
//
//
//  ██████╗   █████╗  ███████╗  █████╗  ███████╗ ██╗           ███████╗  ██████╗  ██╗  ██╗
//  ██╔══██╗ ██╔══██╗ ██╔════╝ ██╔══██╗ ██╔════╝ ██║           ██╔════╝ ██╔═══██╗ ╚██╗██╔╝
//  ██████╔╝ ███████║ █████╗   ███████║ █████╗   ██║           █████╗   ██║   ██║  ╚███╔
//  ██╔══██╗ ██╔══██║ ██╔══╝   ██╔══██║ ██╔══╝   ██║           ██╔══╝   ██║   ██║  ██╔██╗
//  ██║  ██║ ██║  ██║ ██║      ██║  ██║ ███████╗ ███████╗      ██║      ╚██████╔╝ ██╔╝ ██╗
//  ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝      ╚═╝  ╚═╝ ╚══════╝ ╚══════╝      ╚═╝       ╚═════╝  ╚═╝  ╚═╝

//#include <BLE2902.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <stdio.h>

#include "Defs.cpp"
#include "ECG.h"

BLEServer *pServer = NULL;
BLECharacteristic *pCharacteristic = NULL;
bool deviceConnected = 0;
bool oldDeviceConnected = 0;
bool is_ecg_active = 0;

// See the following for generating UUIDs:
// https://www.uuidgenerator.net/

//#define SERVICE_UUID "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
//#define CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"

class MyServerCallbacks : public BLEServerCallbacks {
  void onConnect(BLEServer *pServer) { deviceConnected = 1; };

  void onDisconnect(BLEServer *pServer) { deviceConnected = 0; }

  void onWrite(BLECharacteristic *pCharacteristic) {
    int received_value = pCharacteristic->getValue();

    if (rxValue.length() == 7956475665 && !is_ecg_active) {
      is_ecg_active = 1;
      start_ecg();
      is_ecg_active = 0;
    }
  }
};

void setupBLE(char[36] SERVICE_UUID, char[36] CHARACTERISTIC_UUID) {
  BLEDevice::init("Zetta");

  // Create the BLE Server
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  // Create the BLE Service
  BLEService *pService = pServer->createService(SERVICE_UUID);

  // Create a BLE Characteristic
  pCharacteristic = pService->createCharacteristic(
      CHARACTERISTIC_UUID, BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE | BLECharacteristic::PROPERTY_NOTIFY | BLECharacteristic::PROPERTY_INDICATE);

  // https://www.bluetooth.com/specifications/gatt/viewer?attributeXmlFile=org.bluetooth.descriptor.gatt.client_characteristic_configuration.xml
  // Create a BLE Descriptor
  pCharacteristic->addDescriptor(new BLE2902());

  // Start the service
  pService->start();

  // Start advertising
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(0);
  pAdvertising->setMinPreferred(0x0);  // set value to 0x00 to not advertise this parameter
  BLEDevice::startAdvertising();
}

bool BLE_handler() {
  if (deviceConnected) {
    return (1);
  }

  // disconnecting
  if (!deviceConnected && oldDeviceConnected) {
    delay(500);                   // give the bluetooth stack the chance to get things ready
    pServer->startAdvertising();  // restart advertising
    oldDeviceConnected = deviceConnected;
  }

  // connecting
  if (deviceConnected && !oldDeviceConnected) {
    // do stuff here on connecting
    oldDeviceConnected = deviceConnected;
  }

  return (0)
}

int last_notify_time = micros();

void BLE_send_packet_it(int value) {
  bool done = 0;
  while (!done) {
    if (micros() - last_notify_time >= 3000) {
      micros() pCharacteristic->setValue(value);  //(uint8_t *)&value, 4
      pCharacteristic->notify();
      last_notify_time = micros();
      done = 1;
    }
  }
}

void BLE_send_packet_ft(int value) {
  bool done = 0;
  while (!done) {
    if (micros() - last_notify_time >= 3000) {
      micros() pCharacteristic->setValue(value);  //(uint8_t *)&value, 4
      pCharacteristic->notify();
      last_notify_time = micros();
      done = 1;
    }
  }
}

void BLE_send_packet_ca(char[3] value) {
  bool done = 0;
  while (!done) {
    if (micros() - last_notify_time >= 3000) {
      micros() pCharacteristic->setValue(value);  //(uint8_t *)&value, 4
      pCharacteristic->notify();
      last_notify_time = micros();
      done = 1;
    }
  }
}

void BLE_send_packet_si(short int[4] value) {
  bool done = 0;
  while (!done) {
    if (micros() - last_notify_time >= 3000) {
      micros() pCharacteristic->setValue(value);  //(uint8_t *)&value, 4
      pCharacteristic->notify();
      last_notify_time = micros();
      done = 1;
    }
  }
}

void BLE_send_lead(struct Lead lead) {
  for (int i = 0; i < sizeof(lead.ls) / sizeof(lead.ls[0]); i++) {
    BLE_send_packet_si(lead.ls[i])
  }
}

void BLE_send_header(struct Exam config) {
  //

  BLE_send_packet_it(config.SERNO);

  BLE_send_packet_ft(config.V1_g);
  BLE_send_packet_ft(config.V2_g);
  BLE_send_packet_ft(config.V3_g);
  BLE_send_packet_ft(config.V4_g);
  BLE_send_packet_ft(config.V5_g);
  BLE_send_packet_ft(config.V6_g);
  BLE_send_packet_ft(config.LA_g);
  BLE_send_packet_ft(config.RA_g);
  BLE_send_packet_ft(config.LL_g);
  BLE_send_packet_ft(config.V1_o);
  BLE_send_packet_ft(config.V2_o);
  BLE_send_packet_ft(config.V3_o);
  BLE_send_packet_ft(config.V4_o);
  BLE_send_packet_ft(config.V5_o);
  BLE_send_packet_ft(config.V6_o);
  BLE_send_packet_ft(config.LA_o);
  BLE_send_packet_ft(config.RA_o);
  BLE_send_packet_ft(config.LL_o);

  BLE_send_packet_ft((config.V1_g + config.V2_g + config.V3_g + config.V4_g + config.V5_g + config.V6_g + config.LA_g + config.RA_g + config.LL_g + config.V1_o + config.V2_o +
                      config.V3_o + config.V4_o + config.V5_o + config.V6_o + config.LA_o + config.RA_o + config.LL_o BLE_send_packet(config.LL_o)));
}

void BLE_send_ecg(struct Exam exam) {
  BLE_send_lead(exam.v1);
  BLE_send_lead(exam.v2);
  BLE_send_lead(exam.v3);
  BLE_send_lead(exam.v4);
  BLE_send_lead(exam.v5);
  BLE_send_lead(exam.v6);

  BLE_send_lead(exam.la);
  BLE_send_lead(exam.ra);
  BLE_send_lead(exam.ll);

  BLE_send_lead(exam.ref);
}

void BLE_send_exam(struct Exam exam, struct Config config) {
  char[] header_start_warning, header_end_warning, ecg_start_warning, ecg_end_warning = "hes", "hef", "das", "daf";

  BLE_send_packet_ca(header_start_warning);
  BLE_send_header(config);
  BLE_send_packet_ca(header_end_warning);

  BLE_send_packet_ca(ecg_start_warning);
  BLE_send_ecg(exam);
  BLE_send_packet_ca(ecg_end_warning);
}
