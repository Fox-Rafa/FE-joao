import React, { useEffect, useRef, useState } from 'react';
import { Text, Image, Dimensions, View, StyleSheet } from 'react-native';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { BleManager } from 'react-native-ble-plx'
import { Buffer } from 'buffer';
//const Buffer = require("buffer").Buffer;

const wid = Dimensions.get('window').width;
const hei = Dimensions.get('window').height;
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

export default LoadingScreen = ({ navigation }) => {
  const BLEManager = new BleManager();
  const [readingState, setReadingState] = useState('loading');
  const [dasd23readingDescriptionState, asdsadassetReadingDescriptionState] = useState('Realizando o exame'); //Conectando ao Zetta
  const foreignTimer = useRef(null)
  var hasExited = false

  async function readcharacteristic(device) {
    await device.discoverAllServicesAndCharacteristics();
    var service = await device.services();
    service = service[0]

    var characteristic = await service.characteristics()
    const characteristics = characteristic

    characteristic = String(characteristic[0].uuid)
    service = String(service.uuid)



    const msg = await device.writeCharacteristicWithResponseForService(
      service,
      characteristic,
      'Njk='
    )

    const packets = []
    //asdsadassetReadingDescriptionState('Realizando o exame')
    const subscription = characteristics[0].monitor((err, update) => {
      if (err) {
        console.log({ err })
        errorExit()
        setReadingState('error')
      } else {

        packets.push(String(update.value))

        if (String(update.value) == 'ZGFm') {
          format_ecg(packets)
          subscription.remove()
        }
      }
    });
  }


  function scanDevices() {
    BLEManager.startDeviceScan(null, {
      allowDuplicates: false,
    }, (error, device) => {
      if (error) {
        console.log({ error })
        setReadingState('error')
        errorExit()
        return
      }

      if (device.name === 'Zetta') {
        BLEManager.stopDeviceScan();

        BLEManager.connectToDevice(device.id).then((dd) => {
          readcharacteristic(dd)
        }
        ).catch((error) => {
          console.log({ error })
          setReadingState('error')
          errorExit()
        }
        );

      }

    });
  }


  function getExamBle() {
    const subscription = BLEManager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        scanDevices();
        subscription.remove();
      }
    }, true);
  }

  //####################################################################################################################################################################################################

  function b64_to_int(base64_string) {
    var buffer = Buffer.from(base64_string, 'base64');
    const len = buffer.length

    const arr = [];
    for (var i = 0; i < len; i += 2) {
      arr.push((buffer[i] << 8) + buffer[i + 1])
    }

    return (arr)
  }


  function b64_to_lg_int(base64_string) {
    var buffer = Buffer.from(base64_string, 'base64');

    const num = (buffer[3] << 24) + (buffer[2] << 16) + (buffer[1] << 8) + buffer[0]

    return (num)
  }

  function b64_to_flt(base64_string) {
    return (Buffer.from(base64_string, 'base64').readFloatLE(0))
  }

  function decodeLead(start, pckts) {
    var lead_arr = []
    for (let i = start; i < start + 250; i++) {
      lead_arr = lead_arr.concat(b64_to_int(pckts[i]))
    }

    return (lead_arr)
  }

  function subtract_arrays(a, b) {
    for (let i = 0; i < a.length; i++) {
      a[i] = a[i] - b[i]
    }
    return (a)
  }

  function add_arrays(a, b) {
    for (let i = 0; i < a.length; i++) {
      a[i] = a[i] + b[i]
    }
    return (a)
  }

  function avg_arrays(a, b, c) {
    for (let i = 0; i < a.length; i++) {
      a[i] = (a[i] + b[i] + c[i]) / 3.0
    }
    return (a)
  }

  function neg_half_array(a) {
    for (let i = 0; i < a.length; i++) {
      a[i] = a[i] * -0.5
    }
    return (a)
  }

  function _1_multiply_array(a, b) {
    for (let i = 0; i < a.length; i++) {
      a[i] = a[i] * b
    }
    return (a)
  }

  function _1_add_array(a, b) {
    for (let i = 0; i < a.length; i++) {
      a[i] = a[i] + b
    }
    return (a)
  }

  function calibrate_ecg(ecg, config) {


    ecg = {
      "v1": _1_multiply_array(ecg.v1, 3.3 / (10 ** 12 - 1)),
      "v2": _1_multiply_array(ecg.v2, 3.3 / (10 ** 12 - 1)),
      "v3": _1_multiply_array(ecg.v3, 3.3 / (10 ** 12 - 1)),
      "v4": _1_multiply_array(ecg.v4, 3.3 / (10 ** 12 - 1)),
      "v5": _1_multiply_array(ecg.v5, 3.3 / (10 ** 12 - 1)),
      "v6": _1_multiply_array(ecg.v6, 3.3 / (10 ** 12 - 1)),
      "la": _1_multiply_array(ecg.la, 3.3 / (10 ** 12 - 1)),
      "ra": _1_multiply_array(ecg.ra, 3.3 / (10 ** 12 - 1)),
      "ll": _1_multiply_array(ecg.ll, 3.3 / (10 ** 12 - 1)),
    }

    ecg = {
      "v1": _1_multiply_array(ecg.v1, 1 / config.V1_g),
      "v2": _1_multiply_array(ecg.v2, 1 / config.V2_g),
      "v3": _1_multiply_array(ecg.v3, 1 / config.V3_g),
      "v4": _1_multiply_array(ecg.v4, 1 / config.V4_g),
      "v5": _1_multiply_array(ecg.v5, 1 / config.V5_g),
      "v6": _1_multiply_array(ecg.v6, 1 / config.V6_g),
      "la": _1_multiply_array(ecg.la, 1 / config.LA_g),
      "ra": _1_multiply_array(ecg.ra, 1 / config.RA_g),
      "ll": _1_multiply_array(ecg.ll, 1 / config.LL_g),
    }

    ecg = {
      "v1": _1_add_array(ecg.v1, -config.V1_o),
      "v2": _1_add_array(ecg.v2, -config.V2_o),
      "v3": _1_add_array(ecg.v3, -config.V3_o),
      "v4": _1_add_array(ecg.v4, -config.V4_o),
      "v5": _1_add_array(ecg.v5, -config.V5_o),
      "v6": _1_add_array(ecg.v6, -config.V6_o),
      "la": _1_add_array(ecg.la, -config.LA_o),
      "ra": _1_add_array(ecg.ra, -config.RA_o),
      "ll": _1_add_array(ecg.ll, -config.LL_o),
    }

    return (ecg)
  }
  function errorExit() {
    hasExited = true

    foreignTimer.current = setTimeout(function () {
      if (Platform.OS === 'ios') {
        ReactNativeHapticFeedback.trigger('notificationError', options);
      }
      navigation.navigate('ExamHomeScreen');

    }, 1700);
  }

  function readingFinished(ecg) {
    hasExited = true
    setReadingState('success')
    foreignTimer.current = setTimeout(function () {
      if (Platform.OS === 'ios') {
        ReactNativeHapticFeedback.trigger("notificationSuccess", options);
      }

      navigation.navigate('ExamSumary', {
        v1: ecg.v1,
        v2: ecg.v2,
        v3: ecg.v3,
        v4: ecg.v4,
        v5: ecg.v5,
        v6: ecg.v6,
        i: ecg.I,
        ii: ecg.II,
        iii: ecg.III,
        avl: ecg.aVL,
        avr: ecg.aVR,
        avf: ecg.aVF,
      });
    }, 1230);
  }

  //####################################################################################################################################################################################################
  function format_ecg(packets) {
    if (packets.length != 2524) {
      setReadingState('error')
      errorExit()
      return
    }

    var s = 1;

    // sets "config" variable
    const config = {
      "SERNO": b64_to_lg_int(packets[s + 0]),
      "V1_g": b64_to_flt(packets[s + 1]),
      "V2_g": b64_to_flt(packets[s + 2]),
      "V3_g": b64_to_flt(packets[s + 3]),
      "V4_g": b64_to_flt(packets[s + 4]),
      "V5_g": b64_to_flt(packets[s + 5]),
      "V6_g": b64_to_flt(packets[s + 6]),
      "LA_g": b64_to_flt(packets[s + 7]),
      "RA_g": b64_to_flt(packets[s + 8]),
      "LL_g": b64_to_flt(packets[s + 9]),
      "V1_o": b64_to_flt(packets[s + 10]),
      "V2_o": b64_to_flt(packets[s + 11]),
      "V3_o": b64_to_flt(packets[s + 12]),
      "V4_o": b64_to_flt(packets[s + 13]),
      "V5_o": b64_to_flt(packets[s + 14]),
      "V6_o": b64_to_flt(packets[s + 15]),
      "LA_o": b64_to_flt(packets[s + 16]),
      "RA_o": b64_to_flt(packets[s + 17]),
      "LL_o": b64_to_flt(packets[s + 18])
    }

    s = 23

    // decodes reference measurements
    var ref = decodeLead(s + (250 * 9), packets)

    // decodes rest os measurements
    var received_ecg = {
      "v1": subtract_arrays(decodeLead(s + (250 * 0), packets), ref),
      "v2": subtract_arrays(decodeLead(s + (250 * 1), packets), ref),
      "v3": subtract_arrays(decodeLead(s + (250 * 2), packets), ref),
      "v4": subtract_arrays(decodeLead(s + (250 * 3), packets), ref),
      "v5": subtract_arrays(decodeLead(s + (250 * 4), packets), ref),
      "v6": subtract_arrays(decodeLead(s + (250 * 5), packets), ref),
      "la": subtract_arrays(decodeLead(s + (250 * 6), packets), ref),
      "ra": subtract_arrays(decodeLead(s + (250 * 7), packets), ref),
      "ll": subtract_arrays(decodeLead(s + (250 * 8), packets), ref),
    }

    received_ecg = calibrate_ecg(received_ecg, config)


    // // creates average lead
    var md = avg_arrays(received_ecg.la, received_ecg.ra, received_ecg.ll)

    // calculates leads
    var ecg = {
      "v1": subtract_arrays(received_ecg.v1, md),
      "v2": subtract_arrays(received_ecg.v2, md),
      "v3": subtract_arrays(received_ecg.v3, md),
      "v4": subtract_arrays(received_ecg.v4, md),
      "v5": subtract_arrays(received_ecg.v5, md),
      "v6": subtract_arrays(received_ecg.v6, md),
      "I": subtract_arrays(received_ecg.la, received_ecg.ra),
      "II": subtract_arrays(received_ecg.ll, received_ecg.ra),
      "III": subtract_arrays(received_ecg.ll, received_ecg.la),
      "aVR": received_ecg.v1,
      "aVL": received_ecg.v1,
      "aVF": received_ecg.v1,
    }

    ecg.aVR = neg_half_array(add_arrays(ecg.I, ecg.II))
    ecg.aVL = add_arrays(ecg.I, neg_half_array(ecg.II))
    ecg.aVF = add_arrays(ecg.II, neg_half_array(ecg.I))


    readingFinished(ecg)
  }


  useEffect(() => {
    getExamBle()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasExited) {
        errorExit()
        setReadingState('error')
      }
    }, 35000);

    return () => clearTimeout(timer)
  }, []);

  useEffect(() => {
    return () => clearTimeout(foreignTimer)
  }, []);

  return (
    <>
      {readingState === 'loading' ? (
        <View style={styles.container}>
          <Image source={require('../../images/loadingAnimationFast.gif')} style={styles.loadingvs} />
          <Text style={{
            fontSize: 15,
            color: "#898D96",
            position: 'relative',
            top: hei * 0.5
          }}>{dasd23readingDescriptionState}</Text>
        </View>
      ) : readingState === 'error' ? (
        <View style={styles.container}>
          <Image source={require('../../images/erroranimation.gif')} style={styles.okvs} />
        </View>
      ) : readingState === 'success' && (
        <View style={styles.container}>
          <Image source={require('../../images/okanimation.gif')} style={styles.okvs} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
  },

  loadingvs: {
    height: 70,
    width: 70,
    top: hei * 0.47,
  },

  okvs: {
    position: 'absolute',
    height: 120,
    width: 120,
    bottom: hei / 2 - 60,
    left: wid / 2 - 60,
  },

});