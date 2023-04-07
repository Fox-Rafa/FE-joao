import React from 'react';
import { TouchableOpacity, ScrollView, StyleSheet, Text, Image, View, Dimensions, Alert, } from 'react-native';
import DetailsItem from '../../components/DetailsItem';

import realm, { getExams, getPatients } from "../../database/database";

const wid = Dimensions.get('window').width;
const hei = Dimensions.get('window').height;
const p = 320;

export default function PEoverview(props) {
  const sent = props.route.params;
  function deletePacient() {
    realm.write(() => {
      const examToDelete = realm.objects("exam").filtered("exam_id == " + String(sent.id));
      realm.delete(examToDelete);
    });
    props.navigation.pop(1);
  }

  const deleteAlert = () =>
    Alert.alert(
      "Deletar exame",
      "Esta ação é irreversivel.",
      [
        { text: "Cancelar" },
        { text: "Deletar", onPress: () => deletePacient(), style: 'destructive' }
      ]
    );

  return (
    <View style={styles.container}>

      <ScrollView style={{ width: '100%' }} bounces={true}>
        <View style={styles.topbarvs}>
          <TouchableOpacity style={styles.backvs} onPress={() => props.navigation.pop()}>
            <Image source={require('../../images/backIcon.png')} style={styles.backvs} />
          </TouchableOpacity>

          <Image source={require('../../images/ecglogoIMG.png')} style={styles.logovs} />

          <TouchableOpacity style={styles.ECGvs} onPress={() => props.navigation.navigate('leadsrecap', {
            v1: sent.v1,
            v2: sent.v2,
            v3: sent.v3,
            v4: sent.v4,
            v5: sent.v5,
            v6: sent.v6,
            i: sent.I,
            ii: sent.II,
            iii: sent.III,
            avl: sent.aVL,
            avr: sent.aVR,
            avf: sent.aVF,
          })}>

            <Text style={styles.ecgtxtvs}>ECG</Text>
          </TouchableOpacity>
        </View>


        <View style={{ height: 1290, width: '100%', top: 180, marginBottom: 50 }}>
          <Text style={styles.dtlsvs}>Detalhes do exame</Text>
          <View style={styles.examdetailsvs}>
            <DetailsItem name={"Horário do Exame"} value={sent.date} tp={10} />
            <DetailsItem name={"Diagnóstico"} value={"Ritmo sinusal"} tp={20} />
            <DetailsItem name={"Notas"} value={sent.notes} tp={20} bt={false} />
            <View style={{ height: 20 }}></View>
          </View>

          <Text style={styles.ivs}>Intervalos, durações e axis</Text>
          <View style={styles.examstatsvs}>
            <DetailsItem name={"Frequência Cardiáca"} value={"54bpm"} tp={10} />
            <DetailsItem name={"Intervalo RR"} value={"1107ms"} tp={20} />
            <DetailsItem name={"Intervalo PP"} value={"1107ms"} tp={20} />
            <DetailsItem name={"Intervalo PR"} value={"143ms"} tp={20} />
            <DetailsItem name={"Duração QRS"} value={"102ms"} tp={20} />
            <DetailsItem name={"Intervalo QT"} value={"446ms"} tp={20} />
            <DetailsItem name={"Intervalo QTc"} value={"431ms"} tp={20} />
            <DetailsItem name={"Axis P"} value={"82deg"} tp={20} />
            <DetailsItem name={"Axis QRS"} value={"87deg"} tp={20} />
            <DetailsItem name={"Axis T"} value={"75deg"} tp={20} />
            <DetailsItem name={"QTc Bazett"} value={"423deg"} tp={20} />
            <DetailsItem name={"QTc Fredericia "} value={"431ms"} tp={20} bt={false} />
          </View>
        </View>

        <View style={styles.container}>
          <TouchableOpacity style={styles.deletebtnview} onPress={() => deleteAlert()}>
            <Text style={styles.deletebtn}>Deletar</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 50 }}></View>
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

  topbarvs: {
    width: '100%',
    height: 86,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 42,
  },

  logovs: {
    width: 85,
    height: 86,
    position: 'absolute',
    left: wid / 2 - 42.5,
  },

  backvs: {
    width: 15,
    height: 30,
    position: 'absolute',
    left: 15,
  },

  dtlsvs: {
    fontFamily: 'Helvetica Neue',
    fontSize: 15,
    fontWeight: "500",
    color: '#898D96',
    marginBottom: 10,
    left: 40,
  },

  ivs: {
    fontFamily: 'Helvetica Neue',
    fontSize: 15,
    fontWeight: "500",
    color: '#898D96',
    marginBottom: 10,
    left: 40,
  },

  examdetailsvs: {
    marginBottom: 40,
    left: 20,
    borderRadius: 20,
    width: wid - 40,
    height: 240,
    backgroundColor: "#2B2C2E",
  },

  examstatsvs: {
    left: 20,
    borderRadius: 20,
    width: wid - 40,
    height: 780,
    backgroundColor: "#2B2C2E",
  },

  ecgtxtvs: {
    fontFamily: 'Helvetica Neue',
    fontSize: 30,
    fontWeight: '700',
    color: "#E93F2D",
  },

  ECGvs: {
    position: 'absolute',
    right: 20,
    height: 30,
    width: 65,
  },

  deletebtnview: {
    height: 35,
    width: 100,
    borderRadius: 10,
    backgroundColor: '#D5402D',
    justifyContent: 'center',
  },

  deletebtn: {
    color: '#fff',
    fontFamily: 'Helvetica Neue',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },

});