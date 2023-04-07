import React, { useEffect, useState } from 'react';
import { Image, Dimensions, View, StyleSheet } from 'react-native';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import processECG from '../algos/sigProcessing';
import { sbtrct, makeMed, makeAvr, makeAvl, makeAvf } from '../algos/algebra';
import * as vs from "../algos/vars.js"
import { getExam } from "../algos/getExam.js"

const wid = Dimensions.get('window').width;
const hei = Dimensions.get('window').height;
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

export default LoadingScreen = ({ navigation }) => {
  const exm = Array.from(vs.exam);
  const [isLoading, setLoading] = useState(true);
  var apiDone = false;
  var Lv1 = [];
  var Lv2 = [];
  var Lv3 = [];
  var Lv4 = [];
  var Lv5 = [];
  var Lv6 = [];
  var Lll = [];
  var Lra = [];
  var Lla = [];

  var data = "";
  const [worked, setWorked] = useState(true);
  const [v1, setv1] = useState([]);
  const [v2, setv2] = useState([]);
  const [v3, setv3] = useState([]);
  const [v4, setv4] = useState([]);
  const [v5, setv5] = useState([]);
  const [v6, setv6] = useState([]);
  const [I, setI] = useState([]);
  const [II, setII] = useState([]);
  const [III, setIII] = useState([]);
  const [aVL, setaVL] = useState([]);
  const [aVF, setaVF] = useState([]);
  const [aVR, setaVR] = useState([]);

  let test = 1;

  useEffect(() => {
    if (!test) {
      fetch('http://127.0.0.1:8080/')
        .then(response => response.text())
        .then(text_response => {
          data = text_response.split("@")

          const Lv1 = String(data[0]).split(" ").map(Number).filter(function (value) { return !Number.isNaN(value); })
          const Lv2 = String(data[1]).split(" ").map(Number).filter(function (value) { return !Number.isNaN(value); })
          const Lv3 = String(data[2]).split(" ").map(Number).filter(function (value) { return !Number.isNaN(value); })
          const Lv4 = String(data[3]).split(" ").map(Number).filter(function (value) { return !Number.isNaN(value); })
          const Lv5 = String(data[4]).split(" ").map(Number).filter(function (value) { return !Number.isNaN(value); })
          const Lv6 = String(data[5]).split(" ").map(Number).filter(function (value) { return !Number.isNaN(value); })
          const Lra = String(data[6]).split(" ").map(Number).filter(function (value) { return !Number.isNaN(value); })
          const Lla = String(data[7]).split(" ").map(Number).filter(function (value) { return !Number.isNaN(value); })
          const Lll = String(data[8]).split(" ").map(Number).filter(function (value) { return !Number.isNaN(value); })

          const med = (makeMed(Lra, Lla, Lll))

          setv1(processECG(sbtrct(Lv1, med)))
          setv2(processECG(sbtrct(Lv2, med)))
          setv3(processECG(sbtrct(Lv3, med)))
          setv4(processECG(sbtrct(Lv4, med)))
          setv5(processECG(sbtrct(Lv5, med)))
          setv6(processECG(sbtrct(Lv6, med)))
          setI(processECG(sbtrct(Lla, Lra)))
          setII(processECG(sbtrct(Lll, Lra)))
          setIII(processECG(sbtrct(Lll, Lla)))
          setaVL(processECG(makeAvl(Array.from(I), Array.from(II))))
          setaVF(processECG(makeAvf(Array.from(I), Array.from(II))))
          setaVR(processECG(makeAvr(Array.from(I), Array.from(II))))

          setWorked(true)
          setLoading(false)
        })
        .catch(error => {
          console.log(error)
          setWorked(false)
          setLoading(false)
        })
    }
    else {
      setv1(processECG(exm));
      setv2(processECG(exm));
      setv3(processECG(exm));
      setv4(processECG(exm));
      setv5(processECG(exm));
      setv6(processECG(exm));
      setI(processECG(exm));
      setII(processECG(exm));
      setIII(processECG(exm));
      setaVL(processECG(exm));
      setaVF(processECG(exm));
      setaVR(processECG(exm));
      setLoading(false);
    }
  }, []);

  if (!worked) {
    setTimeout(function () {
      if (Platform.OS === 'ios') {
        ReactNativeHapticFeedback.trigger('notificationError', options);
      }
      navigation.navigate('ExamHomeScreen');

    }, 1700);

    return (
      <View style={styles.container}>

        <Image source={require('../images/erroranimation.gif')} style={styles.okvs} />
      </View>
    )
  }

  else if (isLoading) {
    return (
      <View style={{ backgroundColor: '#000', height: '100%', width: '100%' }}>

        <Image source={require('../images/loadingAnimationFast.gif')} style={styles.loadingvs} />
      </View>
    );
  } else if (worked) {
    setTimeout(function () {
      if (Platform.OS === 'ios') {
        ReactNativeHapticFeedback.trigger("notificationSuccess", options);
      }

      navigation.navigate('ExamSumary', {
        v1: v1,
        v2: v2,
        v3: v3,
        v4: v4,
        v5: v5,
        v6: v6,
        i: I,
        ii: II,
        iii: III,
        avl: aVL,
        avr: aVR,
        avf: aVF,
      });
    }, 1230);


    return (
      <View style={styles.container}>
        <Image source={require('../images/okanimation.gif')} style={styles.okvs} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
  },

  loadingvs: {
    position: 'absolute',
    height: 200,
    width: 200,
    bottom: hei / 2 - 200 / 2,
    left: wid / 2 - 200 / 2,
  },

  okvs: {
    position: 'absolute',
    height: 120,
    width: 120,
    bottom: hei / 2 - 60,
    left: wid / 2 - 60,
  },

});