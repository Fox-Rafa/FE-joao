// Rafael Fox 2022
//
//
//  ██████╗   █████╗  ███████╗  █████╗  ███████╗ ██╗           ███████╗  ██████╗  ██╗  ██╗
//  ██╔══██╗ ██╔══██╗ ██╔════╝ ██╔══██╗ ██╔════╝ ██║           ██╔════╝ ██╔═══██╗ ╚██╗██╔╝
//  ██████╔╝ ███████║ █████╗   ███████║ █████╗   ██║           █████╗   ██║   ██║  ╚███╔
//  ██╔══██╗ ██╔══██║ ██╔══╝   ██╔══██║ ██╔══╝   ██║           ██╔══╝   ██║   ██║  ██╔██╗
//  ██║  ██║ ██║  ██║ ██║      ██║  ██║ ███████╗ ███████╗      ██║      ╚██████╔╝ ██╔╝ ██╗
//  ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝      ╚═╝  ╚═╝ ╚══════╝ ╚══════╝      ╚═╝       ╚═════╝  ╚═╝  ╚═╝

#include <Preferences.h>

Preferences preferences;

struct Config get_config() {
  preferences.begin("device_info", 1);

  struct Config config;
  config.SERNO = preferences.getInt("SERNO");
  config.SERVICE_UUID = preferences.getInt("SERVICE_UUID");
  config.CHARACTERISTIC_UUID = preferences.getInt("CHARACTERISTIC_UUID");

  config.V1_g = preferences.getFloat("V1_g");
  config.V2_g = preferences.getFloat("V2_g");
  config.V3_g = preferences.getFloat("V3_g");
  config.V4_g = preferences.getFloat("V4_g");
  config.V5_g = preferences.getFloat("V5_g");
  config.V6_g = preferences.getFloat("V6_g");
  config.LA_g = preferences.getFloat("LA_g");
  config.RA_g = preferences.getFloat("RA_g");
  config.LL_g = preferences.getFloat("LL_g");

  config.V1_o = preferences.getFloat("V1_o");
  config.V2_o = preferences.getFloat("V2_o");
  config.V3_o = preferences.getFloat("V3_o");
  config.V4_o = preferences.getFloat("V4_o");
  config.V5_o = preferences.getFloat("V5_o");
  config.V6_o = preferences.getFloat("V6_o");
  config.LA_o = preferences.getFloat("LA_o");
  config.RA_o = preferences.getFloat("RA_o");
  config.LL_o = preferences.getFloat("LL_o");

  preferences.end();

  return (config);
}

void set_config(struct Config config) {
  preferences.begin("device_info", 0);

  if (preferences.putInt("SERNO") != config.SERNO) preferences.putInt("SERNO", config.SERNO);

  if (preferences.getFloat("V1_g") != config.V1_g) preferences.putFloat("V1_g", config.V1_g);

  if (preferences.getFloat("V2_g") != config.V2_g) preferences.putFloat("V2_g", config.V2_g);

  if (preferences.getFloat("V3_g") != config.V3_g) preferences.putFloat("V3_g", config.V3_g);

  if (preferences.getFloat("V4_g") != config.V4_g) preferences.putFloat("V4_g", config.V4_g);

  if (preferences.getFloat("V5_g") != config.V5_g) preferences.putFloat("V5_g", config.V5_g);

  if (preferences.getFloat("V6_g") != config.V6_g) preferences.putFloat("V6_g", config.V6_g);

  if (preferences.getFloat("LA_g") != config.LA_g) preferences.putFloat("LA_g", config.LA_g);

  if (preferences.getFloat("RA_g") != config.RA_g) preferences.putFloat("RA_g", config.RA_g);

  if (preferences.getFloat("LL_g") != config.LL_g) preferences.putFloat("LL_g", config.LL_g);

  if (preferences.getFloat("V1_o") != config.V1_o) preferences.putFloat("V1_o", config.V1_o);

  if (preferences.getFloat("V2_o") != config.V2_o) preferences.putFloat("V2_o", config.V2_o);

  if (preferences.getFloat("V3_o") != config.V3_o) preferences.putFloat("V3_o", config.V3_o);

  if (preferences.getFloat("V4_o") != config.V4_o) preferences.putFloat("V4_o", config.V4_o);

  if (preferences.getFloat("V5_o") != config.V5_o) preferences.putFloat("V5_o", config.V5_o);

  if (preferences.getFloat("V6_o") != config.V6_o) preferences.putFloat("V6_o", config.V6_o);

  if (preferences.getFloat("LA_o") != config.LA_o) preferences.putFloat("LA_o", config.LA_o);

  if (preferences.getFloat("RA_o") != config.RA_o) preferences.putFloat("RA_o", config.RA_o);

  if (preferences.getFloat("LL_o") != config.LL_o) preferences.putFloat("LL_o", config.LL_o);

  preferences.end();
}
