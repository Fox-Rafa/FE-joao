import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//import LineChart from "react-native-chart-kit"
import { RefreshControl, TouchableOpacity, ScrollView, StyleSheet, Text, Image, View, Dimensions } from 'react-native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'




//================================================================================================================================================================================================
import PatientsHomeScreen from './pages/PatientsHomeScreen'
import ExamHomeScreen from './pages/ExamHomeScreen'

import LoginPage from './pages/auth/LoginPage'
import ExamSumary from './pages/exam/ExamSumary'
import LeadsRecap from './pages/exam/LeadsRecap' //###################################
import LeadView from './pages/exam/LeadView'
import LoadingScreen from './pages/exam/LoadingScreen'
import PEleads from './pages/exam/PEleads' //###################################
import PEoverview from './pages/exam/PEoverview' //###################################
import SavedExam from './pages/exam/SavedExam' //###################################
import ExamDataView from './pages/exam/ExamDataView' //###################################

import PatientRecap from './pages/patient/PatientRecap' //###################################
import EditPatient from './pages/patient/EditPatient' //###################################
import SavedPatient from './pages/patient/SavedPatient' //###################################

import SavePatient from './pages/saving/SavePatient'
import SaveExam from './pages/saving/SaveExam'
//================================================================================================================================================================================================

import SplashScreen from './pages/SplashScreen'
import auth from '@react-native-firebase/auth'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

function signOut() {
  auth().signOut()
    .then(() => console.log('Signed Out'))
    .catch(() => console.log('error'))
}

function CustomDrawerContent(props) {
  return (
    <View style={styles.custViewvs}>
      <DrawerItem label="Exams" onPress={() => props.navigation.navigate('ExamHomeScreen')} />
      <DrawerItem label="Patients" onPress={() => props.navigation.navigate('PatientsHomeScreen')} />

      <View style={styles.sg}><TouchableOpacity style={styles.signoutcnt} onPress={() => signOut()}><Text style={styles.signout}>Sair</Text></TouchableOpacity></View>

      <Text style={styles.coprvs}>© Rafael Fox, 2021</Text>
    </View>
  )
}

function Home() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="ExamHomeScreen" component={ExamHomeScreen} options={{ gestureEnabled: false }} />
      <Drawer.Screen name="PatientsHomeScreen" component={PatientsHomeScreen} options={{ gestureEnabled: false }} />
    </Drawer.Navigator>
  )
}

const App = () => {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()

  function onAuthStateChanged(user) {
    setUser(user)
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  if (initializing) {
    console.log(initializing)
    return (<SplashScreen />)
  }
  else {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>


          {!user ? (
            <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
          ) : (
            <>
              <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
              <Stack.Screen name="SavePatient" component={SavePatient} options={{ cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS }} />
              <Stack.Screen name="ExamSumary" component={ExamSumary} options={{ gestureEnabled: false }} />
              <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{ gestureEnabled: false }} />
              <Stack.Screen name="SaveExam" component={SaveExam} options={{ cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS }} />
              <Stack.Screen name="PEoverview" component={PEoverview} />
              <Stack.Screen name="ExamDataView" component={ExamDataView} options={{ cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS }} />
              <Stack.Screen name="PEleads" component={PEleads} />
              <Stack.Screen name="SavedExam" component={SavedExam} />
              <Stack.Screen name="SavedPatient" component={SavedPatient} />
              <Stack.Screen name="LeadView" component={LeadView} options={{ gestureEnabled: false }} />
              <Stack.Screen name="PatientRecap" component={PatientRecap} />
              <Stack.Screen name="EditPatient" component={EditPatient} options={{ cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS }} />
              <Stack.Screen name="LeadsRecap" component={LeadsRecap} />
            </>
          )}

        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  custViewvs: {
    backgroundColor: "#fff",
    position: "absolute",
    top: 45,
    width: "100%",
    height: "100%",
  },

  coprvs: {
    textAlign: 'center',
    position: "absolute",
    bottom: 100,
    width: "100%",
    color: "#000"
  },

  signoutcnt: {
    paddingHorizontal: 17,
    paddingVertical: 4,
    backgroundColor: "#f23",
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sg: {
    width: '100%',
    position: "absolute",
    bottom: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },

  signout: {
    borderRadius: 10,
    fontSize: 16,
  },
})

export default App