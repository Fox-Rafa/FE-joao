import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, } from 'react-native';

export default function ModalHeader({ drawerToggle, action }) {

  return (
    <View style={styles.header}>

      <TouchableOpacity style={styles.drawerButton} onPress={drawerToggle}>
        <Image source={require('../images/drawerIcon.png')} style={styles.drawerButton} />
      </TouchableOpacity>

      <View style={styles.headerLogoWrapper}>
        <Image source={require('../images/ecglogoIMG.png')} style={styles.logo} />
      </View>


      <TouchableOpacity style={styles.actionButton} onPress={action}>
        <Image source={require('../images/plusiconIMG.png')} style={styles.actionButton} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#000",
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 25,
  },

  drawerButton: {
    width: 21 * 1.1,
    height: 17 * 1.1,
  },

  headerLogoWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  logo: {
    width: 85,
    height: 86,
  },

  actionButton: {
    width: 32,
    height: 32,
  },

})