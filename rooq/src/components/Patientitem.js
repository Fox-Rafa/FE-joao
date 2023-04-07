import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-svg-charts'


const wid = Dimensions.get('window').width;
const hei = Dimensions.get('window').height;

const Patientitem = (props) => {
  const [bd, setBd] = useState('')


  useEffect(() => {
    const tm = new Date().getTime()

    var d = new Date(0)
    d.setUTCSeconds(props.age._seconds)
    d = d.getTime()

    d = Math.floor((tm - d) / 1000 / 31540000)

    setBd(d)
  }, []);


  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('PatientRecap', { id: props.id, name: props.name, sex: props.sex, age: props.age, nmsx: props.sex + " de " + bd + " anos", profilePicture: props.profilePicture, item: props.item })}>
      <View style={styles.item}>
        {
          props.profilePicture == '' ? (
            <Image source={require('../images/noImageIcon.png')} style={styles.img} />
          ) : (
            <Image source={{ uri: props.profilePicture }} style={styles.img} />
          )
        }


        <Text style={styles.namevs}>{props.name}</Text>
        <Text style={styles.sexvs}><Text style={{ textTransform: 'capitalize' }}>{props.sex}</Text>{" de " + bd + " anos"}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#1C1B1E',
    width: wid - 40,
    height: 100,
    borderRadius: 20,
    marginBottom: 20,
  },

  namevs: {
    color: "#fff",
    fontFamily: 'Helvetica Neue',
    fontSize: 22,
    position: 'absolute',
    top: 10,
    left: 100,
  },

  sexvs: {
    color: "#fff",
    fontFamily: 'Helvetica Neue',
    fontSize: 19,
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
});

export default Patientitem;