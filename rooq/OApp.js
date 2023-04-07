import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, Image, View, Dimensions, processColor } from 'react-native';


const wid = Dimensions.get('window').width;
const hei = Dimensions.get('window').height;

import { LineChart } from 'react-native-charts-wrapper';


export default function bigview(props) {
  //const sent = props.route.params;

  return (
    <View style={styles.container}>]
      <View style={styles.topbarvs}>
        {/*
        <TouchableOpacity style={styles.backvs} onPress={() => props.navigation.pop()}>
          <Image source={require('../images/backIcon.png')} style={styles.backvs}/>
        </TouchableOpacity>
        
        <Text style={styles.leadnamevs}>{sent.name}</Text>
        */}
      </View>

      <LineChart
        style={styles.chartvs}
        data={{
          dataSets: [{
            values: [50, 100, 50, 100, 50],
            label: 'Sine function',

            config: {
              drawValues: false,
              colors: [processColor('#f23')],
              drawCircles: false,
              lineWidth: 2,
              //axisDependency: "RIGHT",
            }
          }],
        }}
        xAxis={{
          granularityEnabled: true,
          granularity: 5
        }}
        yAxis={{
          left: {
            granularityEnabled: true,
            granularity: 10
          },
          right: {
            granularityEnabled: true,
            granularity: 100
          }
        }}
        highlightFullBarEnabled={false}
        dragDecelerationEnabled={true}
        dragDecelerationFrictionCoef={0}
      />

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1B1E',
    alignItems: 'center',

  },

  leadnamevs: {
    fontFamily: 'Helvetica Neue',
    fontSize: 25,
    fontWeight: '500',
    color: '#fff',
    position: 'absolute',

  },

  chartvs: {
    position: 'absolute',
    right: 33,
    bottom: 0,
    left: 33,
    top: 0,
    borderWidth: 20,
    borderColor: '#171',
  },

  backvs: {
    width: 15,
    height: 30,
    position: 'absolute',
    left: 20,
  },

  topbarvs: {
    width: '100%',
    height: 30,
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    marginBottom: 0,
  },

});


