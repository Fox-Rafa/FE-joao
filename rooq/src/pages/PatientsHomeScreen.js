import React, { useEffect, useState } from 'react';
import { RefreshControl, TouchableOpacity, ScrollView, StyleSheet, Text, Image, View, Dimensions, SafeAreaView } from 'react-native';
import Patientitem from '../components/Patientitem';
import * as database from "../database/database";
import moment from 'moment';
import MainHeader from '../components/MainHeader';

const wid = Dimensions.get('window').width;
const hei = Dimensions.get('window').height;

export default function PatientsHomeScreen(props) {
  const [patients, setPatients] = useState([]);

  async function gp() {
    setPatients(await database.getPatients())
  }

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      gp()
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ width: '100%' }} bounces={true}>
        <MainHeader drawerToggle={() => props.navigation.toggleDrawer()} action={() => props.navigation.navigate('SavePatient')} />
        <View style={styles.patsvs}>
          {
            patients.length == 0 ? (
              <Text style={styles.nopatsvs}>no patients yet</Text>
            ) : (
              patients.map((item, index) => {
                return (
                  <Patientitem id={item.patient_id} name={item.first_name + ' ' + item.last_name} sex={item.sex} age={item.birthdate} navigation={props.navigation} profilePicture={item.profile_picture_url} key={index} item={item} />
                );
              })
            )
          }

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

  patsvs: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000000',
    alignItems: 'center',
    marginBottom: 180,
    marginTop: 20,
  },

  examsvs: {
    width: wid - 40,
    height: 100,
    backgroundColor: "#1C1B1E",
    borderRadius: 20,
    marginBottom: 20,
    flexDirection: 'row',
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

  nopatsvs: {
    fontFamily: 'Helvetica Neue',
    fontSize: 15,
    position: 'absolute',
    top: hei * 0.3,
    color: "#898D96",
  },

  exssvs: {
    width: wid - 40,
    height: 100,
    backgroundColor: "#1C1B1E",
    borderRadius: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  exiconvs: {
    height: 280 * 0.2,
    width: 475.1 * 0.2,
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