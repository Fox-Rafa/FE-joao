import * as React from 'react';
import { StyleSheet, ScrollView, Image, View, Dimensions } from 'react-native';
import Exam_lead from '../../components/Exam_lead';


const wid = Dimensions.get('window').width;
const hei = Dimensions.get('window').height;


export default function PAlead({ navigation }) {
  return (
    <View style={styles.container}>

      <ScrollView style={{ width: '100%' }} bounces={true}>
        <View style={styles.topbarvs}>
          <Image source={require('../../images/ecglogoIMG.png')} style={styles.logovs} />
        </View>

        <View style={styles.examsvs}>
          <Exam_lead leadName={"derivação V1"} />
          <Exam_lead leadName={"derivação V2"} />
          <Exam_lead leadName={"derivação V3"} />
          <Exam_lead leadName={"derivação V4"} />
          <Exam_lead leadName={"derivação V5"} />
          <Exam_lead leadName={"derivação V6"} />
          <Exam_lead leadName={"derivação I"} />
          <Exam_lead leadName={"derivação II"} />
          <Exam_lead leadName={"derivação III"} />
          <Exam_lead leadName={"derivação aVR"} />
          <Exam_lead leadName={"derivação aVL"} />
          <Exam_lead leadName={"derivação aVF"} />
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

  closevs: {
    width: 30 * 1.2,
    height: 30 * 1.2,
    position: 'absolute',
    top: 46 - 42,
    left: 20,
  },

  reloadvs: {
    width: 35 * 1.2,
    height: 35 * 1.2,
    position: 'absolute',
    top: 25,
    left: 20,
  },

  savevs: {
    width: 28 * 1.3,
    height: 41 * 1.2,
    position: 'absolute',
    right: 20,
  },
});


