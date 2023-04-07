import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, ScrollView, Text, Image, View, Dimensions, SafeAreaView } from 'react-native';
import Exam_lead from '../../components/Exam_lead';
import DetailsItem from '../../components/DetailsItem';
import ExamHeader from '../../components/ExamHeader';


const wid = Dimensions.get('window').width;
const hei = Dimensions.get('window').height;


export default function ExamSumary(props) {
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
  const [dt, setDt] = useState('')

  useEffect(() => {
    if (sent.past) {
      var d = new Date(0)
      d.setUTCSeconds(sent.date._seconds)

      setDt(
        String(
          d.getDate() +
          '/' +
          (d.getMonth() + 1) +
          '/' +
          d.getFullYear() +
          ' ' +
          d.getHours() +
          ':' +
          d.getMinutes()
        )
      )
    }
  }, [props])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ width: '100%', flexGrow: 1 }} bounces={true}>
        <ExamHeader past={sent.past} leftAction={() => props.navigation.popToTop()} rightAction={() => props.navigation.navigate('SaveExam', {
          exam: {
            v1: sent.v1,
            v2: sent.v2,
            v3: sent.v3,
            v4: sent.v4,
            v5: sent.v5,
            v6: sent.v6,

            i: sent.i,
            ii: sent.ii,
            iii: sent.iii,
            avl: sent.avl,
            avr: sent.avr,
            avf: sent.avf,

          }
        })} />

        <View style={styles.examsvs}>

          {sent.past && (
            <View style={styles.exdatavs}>
              <>
                <DetailsItem name={"Horário do Exame"} value={dt} tp={10} />
                <DetailsItem name={"Diagnóstico"} value={sent.diagnosis} tp={20} />
                {/*TODO fix make text longer if input longer*/}
                <DetailsItem name={"Notas"} value={sent.notes} tp={20} bt={false} />
              </>
            </View>
          )}
          <TouchableOpacity onPress={() => props.navigation.navigate("ExamDataView")}>
            <View style={styles.exdatavs}>
              <DetailsItem name={"Frequência Cardiáca"} value={"54bpm"} tp={10} />
              <DetailsItem name={"Intervalo RR"} value={"1107ms"} tp={20} />
              {!sent.past && (
                <>
                  <DetailsItem name={"Intervalo PP"} value={"1107ms"} tp={20} />
                  <DetailsItem name={"Intervalo PR"} value={"143ms"} tp={20} bt={false} />
                </>
              )}
              <Text style={styles.morevs}>•••</Text>

            </View>
          </TouchableOpacity>

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
    </SafeAreaView>
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
    height: 2640,
    marginTop: 20,
  },

  exdatavs: {
    backgroundColor: "#1C1B1E",
    borderRadius: 20,
    width: wid - 40,

    marginBottom: 20,
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
    //top: 46-42,
    left: 20,
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
    marginBottom: 10,
  },

  hrvs: {
    fontFamily: 'Helvetica Neue',
    fontSize: 15,
    fontWeight: '700',
    color: '#D5402D',
    position: 'absolute',
    left: 46,
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