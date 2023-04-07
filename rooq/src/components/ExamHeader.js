import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, } from 'react-native';

export default function ExamHeader({ past, leftAction, rightAction }) {

  return (
    <View style={styles.header}>
      {past ? (
        <TouchableOpacity style={styles.leftButtonPast} onPress={leftAction}>
          <Image source={require('../images/backIcon.png')} style={styles.leftButtonPast} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.leftButton} onPress={leftAction}>
          <Image source={require('../images/closeIcon.png')} style={styles.leftButton} />
        </TouchableOpacity>
      )
      }

      <View style={styles.headerLogoWrapper}>
        <Image source={require('../images/ecglogoIMG.png')} style={styles.logo} />
      </View>

      {
        past ? null : (
          <TouchableOpacity style={styles.rightButton} onPress={rightAction} >
            <Image source={require('../images/saveIcon.png')} style={styles.rightButton} />
          </TouchableOpacity >
        )}
    </View >
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

  leftButtonPast: {
    width: 15,
    height: 30,
  },

  leftButton: {
    width: 30 * 1.2,
    height: 30 * 1.2,
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

  rightButton: {
    width: 28 * 1.3,
    height: 41 * 1.2,
  },

})