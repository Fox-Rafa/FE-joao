import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, } from 'react-native';

export default function ModalHeader({ done, submit, exit }) {

  return (
    <View style={styles.header}>

      <TouchableOpacity style={styles.backButton} onPress={exit}>
        <Image source={require('../images/backIcon.png')} style={styles.backButton} />
      </TouchableOpacity>

      <View style={styles.headerTitleWrapper}>
        <Text style={styles.headerTitle}>Salvar Exame</Text>
      </View>

      {done ? (
        <TouchableOpacity style={styles.saveButton} onPress={submit}>
          <Image source={require('../images/saveIcon.png')} style={styles.saveButton} />
        </TouchableOpacity>
      ) : (
        <View style={styles.saveDisabled}>
          <Image source={require('../images/saveIcon.png')} style={styles.saveDisabled} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: "#000",
    flexDirection: 'row',
    width: '100%',
    padding: 25,
  },

  backButton: {
    width: 15 * 0.8,
    height: 30 * 0.8,
  },

  headerTitleWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  saveButton: {
    width: 22 * 0.8,
    height: 30 * 0.8,
  },

  saveDisabled: {
    width: 22 * 0.8,
    height: 30 * 0.8,
    opacity: 0.7,
  },

})