import React, { useEffect, useState } from 'react';
import { RefreshControl, TouchableOpacity, ScrollView, StyleSheet, Text, Image, View, Dimensions } from 'react-native';
import Exam_item from '../../components/Exam_item';
import * as database from "../../database/database";


const wid = Dimensions.get('window').width;
const hei = Dimensions.get('window').height;
const srNm = ["SR", "Sinus Rythm", "sinus rythm", "SINUS RYTHM", "Sr", "sR"];
const asNm = ["Asystole", "as", "AS", "ast", "AST", "asyst", "Asyst", "ASYST"];

export default function PatientRecap(props) {
  var sent = props.route.params;
  const [exams, setExams] = React.useState([]);
  const [bd, setBd] = useState('')


  useEffect(() => {
    const tm = new Date().getTime()

    var d = new Date(0)
    d.setUTCSeconds(sent.age._seconds)
    d = d.getTime()

    d = Math.floor((tm - d) / 1000 / 31540000)

    setBd(d)
  }, []);

  async function ge() {
    const a = await database.getExams(sent.id)

    setExams(a)
  }

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      ge()
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: '100%' }} bounces={true}>
        <View style={styles.topbarvs}>
          <TouchableOpacity style={styles.backvs} onPress={() => props.navigation.pop()}>
            <Image source={require('../../images/backIcon.png')} style={styles.backvs} />
          </TouchableOpacity>

          <Image source={require('../../images/ecglogoIMG.png')} style={styles.logovs} />

        </View>
        <View style={styles.examsvs}>
          <View style={styles.patinfovs}>
            <Image source={require('../../images/noImageIcon.png')} style={styles.img} />
            <Text style={styles.namevs}>{sent.name}</Text>
            <Text style={styles.sexvs}>{sent.nmsx}</Text>
            <TouchableOpacity onPress={() => props.navigation.push("EditPatient", { id: sent.id, name: sent.name, sex: sent.sex, age: sent.age, nmsx: sent.nmsx, profilePicture: sent.profilePicture, item: sent.item })}>
              <Text style={styles.editvs}>editar paciente</Text>
            </TouchableOpacity>
          </View>
          {
            exams.length == 0 ? (
              <Text style={styles.noexamsvs}>Nenhum exame.</Text>
            ) : (
              exams.map((item, index) => {
                <Exam_item
                  key={index}
                  id={item.exam_id}
                  v1={item.V1}
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
                  patientName={item.patient.first_name + ' ' + item.patient.last_name}
                  date={item.creation}
                  heartRate={item.heartRate}
                  diagno={item.diagnosis}
                />
              })
            )
          }

        </View>
        <View style={{ height: 180, position: 'absolute', bottom: 0 }}></View>
      </ScrollView>
    </View>
  );
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

  patinfovs: {
    width: wid - 40,
    height: 100,
    backgroundColor: "#1C1B1E",
    borderRadius: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  backvs: {
    width: 15,
    height: 30,
    position: 'absolute',
    left: 15,
  },

  namevs: {
    color: "#fff",
    fontFamily: 'Helvetica Neue',
    fontSize: 25,
    position: 'absolute',
    top: 10,
    left: 100,
  },

  sexvs: {
    color: "#fff",
    fontFamily: 'Helvetica Neue',
    fontSize: 22,
    position: 'absolute',
    top: 40,
    left: 100,

  },

  img: {
    height: 80,
    width: 80,
    borderRadius: 40,
    position: 'absolute',
    top: 10,
    left: 10,
  },

  editvs: {
    color: "#007AFF",
    fontFamily: 'Helvetica Neue',
    fontSize: 18,
    top: 30,
    left: (wid - 120) / 2,
  },

});