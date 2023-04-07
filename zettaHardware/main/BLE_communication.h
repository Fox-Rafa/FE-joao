// Rafael Fox 2022
//
//
//  ██████╗   █████╗  ███████╗  █████╗  ███████╗ ██╗           ███████╗  ██████╗  ██╗  ██╗
//  ██╔══██╗ ██╔══██╗ ██╔════╝ ██╔══██╗ ██╔════╝ ██║           ██╔════╝ ██╔═══██╗ ╚██╗██╔╝
//  ██████╔╝ ███████║ █████╗   ███████║ █████╗   ██║           █████╗   ██║   ██║  ╚███╔
//  ██╔══██╗ ██╔══██║ ██╔══╝   ██╔══██║ ██╔══╝   ██║           ██╔══╝   ██║   ██║  ██╔██╗
//  ██║  ██║ ██║  ██║ ██║      ██║  ██║ ███████╗ ███████╗      ██║      ╚██████╔╝ ██╔╝ ██╗
//  ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝      ╚═╝  ╚═╝ ╚══════╝ ╚══════╝      ╚═╝       ╚═════╝  ╚═╝  ╚═╝

//#include "Defs.c"

void setupBLE(char[36] SERVICE_UUID, char[36] CHARACTERISTIC_UUID);

bool BLE_handler();

void BLE_send_packet_it(int value);

void BLE_send_packet_ft(int value);

void BLE_send_packet_ca(char[3] value);

void BLE_send_packet_si(short int[4] value);

void BLE_send_lead(struct Lead lead);

void BLE_send_header(struct Exam config);

void BLE_send_exam(struct Exam exam);

void BLE_send_exam(struct Exam exam, struct Config config);
