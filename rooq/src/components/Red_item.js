import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-svg-charts'

const wid = Dimensions.get('window').width;
const hei = Dimensions.get('window').height;

const Red_item = (props) => {
  return (
    <View style={styles.item}>
        <View style={styles.topbk}> 
            <Text style={styles.namevs}>{props.patientName}</Text>
            <TouchableOpacity style={styles.exambt} onPress={() => props.navigation.navigate('PEoverview', {v1: props.v1,
                                                                                                            v2: props.v2,
                                                                                                            v3: props.v3,
                                                                                                            v4: props.v4,
                                                                                                            v5: props.v5,
                                                                                                            v6: props.v6,
                                                                                                            I: props.I,
                                                                                                            II: props.II,
                                                                                                            III: props.III,
                                                                                                            aVL: props.aVL,
                                                                                                            aVR: props.aVR,
                                                                                                            aVF: props.aVF,
                                                                                                            notes: props.notes,
                                                                                                            navigation: props.navigation,
                                                                                                            patientName: props.patientName,
                                                                                                            date: props.date,
                                                                                                            heartRate: props.heartRate,
                                                                                                            diagno: props.diagno,
                                                                                                            id: props.id})}>
              <Text style={styles.datevs}>{props.date}</Text>
              <Image source={require('../images/backred.png')} style={styles.morevs}/>
            </TouchableOpacity>
        </View>
        <View style={styles.midvs}>
            <Image source={require('../images/hearticonIMG.png')} style={styles.heartvs}/>
            <Text style={styles.hrvs}>{props.heartRate}</Text>
            <Text style={styles.diagvs}>Asystole</Text>
        </View>

        <LineChart
            style={styles.chartvs}
            data={props.v3.slice(0, 1000)}
            svg={{ stroke: '#D5402D', strokeWidth: 3 }}
            contentInset={{ top: 5, bottom: 5 }}
          >
        </LineChart>

        <Text style={styles.leadnamevs}>lead I</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#1C1B1E',
    width: wid-40,
    height: 250,
    borderRadius: 20,
    marginBottom: 20,
  },

  topbk: {
    backgroundColor: '#D5402D',
    width: wid-40,
    height: 50,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    top: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  namevs: {
    fontFamily: 'Helvetica Neue',
    fontSize: 24,
    fontWeight: '500',
    color: '#000',
    position:'absolute',
    left: 16,
  },

  datevs: {
    fontFamily: 'Helvetica Neue',
    fontSize: 14,
    fontWeight: '700',
    color: '#69251C',
    position:'absolute',
    right: 24,
  },

  midvs: {
    width: 340,
    height: 49,
    flexDirection: 'row',
    alignItems: 'center',
  },

  hrvs: {
    fontFamily: 'Helvetica Neue',
    fontSize: 15,
    fontWeight: '700',
    color: '#D5402D',
    position:'absolute',
    left:46,
  },

  diagvs: {
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
    fontWeight: '500',
    color: '#D5402D',
    position:'absolute',
    right:17,
  },

  leadnamevs: {
    fontFamily: 'Helvetica Neue',
    fontSize: 14,
    fontWeight: '500',
    color: '#898D96',
    position:'absolute',
    bottom: 5,
    left: 260,
  },

  heartvs: {
    width: 20,
    height: 50,
    position:'absolute',
    left: 22,
  },

  morevs: {
    width: 5*1.1,
    height: 12*1.1,
    position:'absolute',
    right: 17,
  },

  chartvs: {
    position: 'absolute', 
    height: 125, 

    width: wid-60, 
    bottom: 25, 
    left: 10,
    borderWidth: 2,
    borderColor: '#8C909A',
    borderRadius: 10,
  },

  exambt: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    height: 13,
    bottom: 25-6.5,
  },
  
});

export default Red_item;