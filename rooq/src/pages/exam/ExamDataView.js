import React from 'react';
import { TouchableOpacity, ScrollView, Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import DetailsItem from '../../components/DetailsItem';
import ExamHeader from '../../components/ExamHeader';


const wid = Dimensions.get('window').width;
const hei = Dimensions.get('window').height;


export default function ExamDataView(props) {
  const [nametext, onChangeText] = React.useState("");

  return (
    <View style={styles.container}>

      <ScrollView style={{ width: '100%' }} bounces={true}>
        <View style={{ height: 1000 }}>
          <ExamHeader past={true} leftAction={() => props.navigation.goBack()} />

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
    marginBottom: 20,
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

  ivs: {
    fontFamily: 'Helvetica Neue',
    fontSize: 15,
    fontWeight: "500",
    color: '#898D96',
    position: 'absolute',
    top: 150,
    left: 40,
  },

  examstatsvs: {
    position: 'absolute',
    top: 175,
    left: 20,
    borderRadius: 20,
    width: wid - 40,
    height: 780,
    backgroundColor: "#2B2C2E",
  },

});