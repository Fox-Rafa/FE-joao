import * as React from 'react';
import { TouchableOpacity, StyleSheet, ScrollView, Text, Image, View, Dimensions } from 'react-native';
import Exam_lead from '../../components/Exam_lead';
import realm, { getExams, getPatients } from "../../database/database";


const wid = Dimensions.get('window').width;
const hei = Dimensions.get('window').height;


export default function LeadsRecap(props) {
  const sent = props.route.params;
  const v1 = sent.v1;
  const v2 = sent.v2;
  const v3 = sent.v3;
  const v4 = sent.v4;
  const v5 = sent.v5;
  const v6 = sent.v6;
  const i = sent.i;
  const ii = sent.ii;
  const iii = sent.iii;
  const avl = sent.avl;
  const avf = sent.avr;
  const avr = sent.avf;
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
          <Exam_lead navigation={props.navigation} data={v1} leadName={"derivação V1"} />
          <Exam_lead navigation={props.navigation} data={v2} leadName={"derivação V2"} />
          <Exam_lead navigation={props.navigation} data={v3} leadName={"derivação V3"} />
          <Exam_lead navigation={props.navigation} data={v4} leadName={"derivação V4"} />
          <Exam_lead navigation={props.navigation} data={v5} leadName={"derivação V5"} />
          <Exam_lead navigation={props.navigation} data={v6} leadName={"derivação V6"} />
          <Exam_lead navigation={props.navigation} data={i} leadName={"derivação I"} />
          <Exam_lead navigation={props.navigation} data={ii} leadName={"derivação II"} />
          <Exam_lead navigation={props.navigation} data={iii} leadName={"derivação III"} />
          <Exam_lead navigation={props.navigation} data={avr} leadName={"derivação aVR"} />
          <Exam_lead navigation={props.navigation} data={avl} leadName={"derivação aVL"} />
          <Exam_lead navigation={props.navigation} data={avf} leadName={"derivação aVF"} />
        </View>

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
    height: 2340,
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


  heartvs: {
    width: 20,
    height: 50,
    position: 'absolute',
    left: 22,
  },

  morevs: {
    fontSize: 20,
    fontFamily: 'Helvetica Neue',
    fontWeight: "bold",
    color: "#fff",
    left: 30,
    top: 7,
    //left: wid-90,

  },

  hrvs: {
    fontFamily: 'Helvetica Neue',
    fontSize: 15,
    fontWeight: '700',
    color: '#D5402D',
    position: 'absolute',
    left: 46,
  },

  backvs: {
    width: 15,
    height: 30,
    position: 'absolute',
    left: 15,
  },
});