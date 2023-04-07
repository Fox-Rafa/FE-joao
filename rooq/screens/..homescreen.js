import React, { useEffect, useState } from 'react';
import { RefreshControl, TouchableOpacity, ScrollView, StyleSheet, Text, Image, View, Dimensions } from 'react-native';
import Green_item from '../components/Green_item';
import Yellow_item from '../components/Yellow_item';
import Red_item from '../components/Red_item';
import realm, { getExams, getPatients } from "../database";
import { createDrawerNavigator } from '@react-navigation/drawer';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const wid = Dimensions.get('window').width;
const hei = Dimensions.get('window').height;
const srNm = ["SR", "Sinus Rythm", "sinus rythm", "SINUS RYTHM", "Sr", "sR", "sr"];
const asNm = ["Asystole", "as", "AS", "ast", "AST", "asyst", "Asyst", "ASYST"];
const Drawer = createDrawerNavigator();
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function ExamHomeScreen(props) {
  const [patients, setPatients] = useState([]);
  const [exams, setExams] = useState([]);
  const [_exams, _setExams] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  function _getExams() {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .collection('exams')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          firestore()
            .collection('users')
            .doc(auth().currentUser.uid)
            .collection('patients')
            .doc(doc.data().pid)
            .get()
            .then((p_doc) => {
              _setExams((_exams) =>
                _exams.concat({
                  first_name: p_doc.data().first_name,
                  last_name: p_doc.data().last_name,
                  sex: p_doc.data().sex,
                  birthdate: p_doc.data().birthdate,
                  prfl_picture: p_doc.data().prfl_picture,

                  heart_rate: doc.data().heart_rate,
                  diagnosis: doc.data().diagnosis,
                  pid: doc.data().pid,
                  eid: doc.id,
                  date: doc.data().exam_date,
                  lead_I: doc.data().I,
                  v1: doc.data().v1,
                  v2: doc.data().v2,
                  v3: doc.data().v3,
                  v4: doc.data().v4,
                  v5: doc.data().v5,
                  v6: doc.data().v6,
                  I: doc.data().I,
                  II: doc.data().II,
                  III: doc.data().III,
                  aVR: doc.data().aVR,
                  aVL: doc.data().aVL,
                  aVF: doc.data().aVF,
                })
              )
            })
            .catch((error) => {
              console.log('err: ', error)
            })
        })
      })
      .catch((error) => {
        console.log('Error getting documents: ', error)
      })
  }

  useEffect(() => {
    _getExams()
    setPatients(getPatients());
    setExams(getExams());

  }, []);


  useEffect(() => {
    console.log(_exams.length)
  }, [_exams]);



  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setPatients(getPatients());
      setExams(getExams());
    });
    return unsubscribe;
  }, [props.navigation]);

  if (exams.length <= 0) {
    return (
      <View style={styles.container}>

        <ScrollView style={{ width: '100%' }} bounces={true}>
          <View style={styles.topbarvs}>
            <TouchableOpacity style={{ position: 'absolute', left: 17, }} onPress={() => props.navigation.toggleDrawer()}>
              <Image source={require('../images/drawerIcon.png')} style={styles.drawervs} />
            </TouchableOpacity>

            <Image source={require('../images/ecglogoIMG.png')} style={styles.logovs} />

            <TouchableOpacity style={styles.plusvs} onPress={() => props.navigation.navigate('LoadingScreen')}>
              <Image source={require('../images/plusiconIMG.png')} style={styles.plusvs} />
            </TouchableOpacity>
          </View>
          <View style={styles.examsvs}>
            <Text style={styles.noexamsvs}>Nenhum exame.</Text>
          </View>
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>

        <ScrollView style={{ width: '100%' }} bounces={true}>
          <View style={styles.topbarvs}>
            <TouchableOpacity style={{ position: 'absolute', left: 17, }} onPress={() => props.navigation.toggleDrawer()}>
              <Image source={require('../images/drawerIcon.png')} style={styles.drawervs} />
            </TouchableOpacity>

            <Image source={require('../images/ecglogoIMG.png')} style={styles.logovs} />

            <TouchableOpacity style={styles.plusvs} onPress={() => props.navigation.navigate('LoadingScreen')}>
              <Image source={require('../images/plusiconIMG.png')} style={styles.plusvs} />
            </TouchableOpacity>
          </View>
          <View style={styles.examsvs}>
            {
              exams.map((item, index) => {
                var patien = [];
                for (pat in patients) {
                  if (patients[pat].pat_id == item.p_id) {
                    patien = patients[pat];
                    break;
                  }
                }
                var done = false;
                for (nm in srNm) {
                  if (item.diagnosis === srNm[nm]) {
                    return (
                      <Green_item v1={item.V1}
                        id={item.exam_id}
                        v2={item.V2}
                        v3={item.V3}
                        v4={item.V4}
                        v5={item.V5}
                        v6={item.V6}
                        I={item.I}
                        II={item.II}
                        III={item.III}
                        aVL={item.aVL}
                        aVR={item.aVR}
                        aVF={item.aVF}
                        notes={item.notes}
                        navigation={props.navigation}
                        patientName={patien.pat_name}
                        date={item.date}
                        heartRate={item.heartRate}
                        diagno={item.diagnosis} />
                    )
                  }
                }

                if (!done) {
                  for (nm in asNm) {
                    if (item.diagnosis === asNm[nm]) {
                      return (
                        <Red_item v1={item.V1}
                          v2={item.V2}
                          v3={item.V3}
                          v4={item.V4}
                          v5={item.V5}
                          v6={item.V6}
                          I={item.I}
                          II={item.II}
                          III={item.III}
                          aVL={item.aVL}
                          aVR={item.aVR}
                          aVF={item.aVF}
                          notes={item.notes}
                          navigation={props.navigation}
                          patientName={patien.pat_name}
                          date={item.date}
                          heartRate={item.heartRate}
                          diagno={item.diagnosis}
                          id={item.exam_id} />
                      )
                      done = true;
                      break;
                    }
                  }
                }

                if (!done) {
                  return (
                    <Yellow_item v1={item.V1}
                      v2={item.V2}
                      v3={item.V3}
                      v4={item.V4}
                      v5={item.V5}
                      v6={item.V6}
                      I={item.I}
                      II={item.II}
                      III={item.III}
                      aVL={item.aVL}
                      aVR={item.aVR}
                      aVF={item.aVF}
                      notes={item.notes}
                      navigation={props.navigation}
                      patientName={patien.pat_name}
                      date={item.date}
                      heartRate={item.heartRate}
                      diagno={item.diagnosis}
                      id={item.exam_id} />
                  )
                }

              })
            }

          </View>
          <View style={{ height: 180 }}></View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
  },

  examsvs: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000000',
    alignItems: 'center',
    top: 146,
  },


  topbarvs: {
    width: '100%',
    height: 86,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 42,
    marginBottom: 20,
  },

  drawervs: {
    width: 21,
    height: 17,
  },

  logovs: {
    width: 85,
    height: 86,
    position: 'absolute',
    left: wid / 2 - 42.5,
  },

  plusvs: {
    width: 36,
    height: 36,
    position: 'absolute',
    right: 14,
  },

  noexamsvs: {
    fontFamily: 'Helvetica Neue',
    fontSize: 15,
    position: 'absolute',
    top: hei * 0.3,
    color: "#898D96",
  },

  patsvs: {
    width: wid - 40,
    height: 100,
    backgroundColor: "#1C1B1E",
    borderRadius: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  paticonvs: {
    height: 72.1 * 0.7,
    width: 50 * 0.7,
    left: 20
  },

  gotextvs: {
    color: "#E93F2D",
    fontFamily: 'Helvetica Neue',
    fontSize: 30,
    left: 40,
    fontWeight: "500"
  },
});