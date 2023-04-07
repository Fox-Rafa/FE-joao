import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-svg-charts'


const wid = Dimensions.get('window').width;
const hei = Dimensions.get('window').height;

const Exam_lead = (props) => {
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('LeadView', { data: props.data, name: props.leadName })}>
      <View style={styles.item}>
        {<LineChart
          style={styles.chartvs}
          data={props.data.slice(10, 760)}
          svg={{ stroke: '#D5402D', strokeWidth: 3 }}
          contentInset={{ top: 5, bottom: 5 }}
        >
        </LineChart>}
        <Text style={styles.leadnamevs}>{props.leadName}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#1C1B1E',
    width: wid - 40,
    height: 160,
    borderRadius: 20,
    marginBottom: 20,
  },

  leadnamevs: {
    fontFamily: 'Helvetica Neue',
    fontSize: 14,
    fontWeight: '500',
    color: '#898D96',
    position: 'absolute',
    bottom: 5,
    right: 30,
  },

  chartvs: {
    position: 'absolute',
    height: 125,
    width: wid - 60,
    bottom: 25,
    left: 10,
    borderWidth: 2,
    borderColor: '#8C909A',
    borderRadius: 10,
  },

});

export default Exam_lead;