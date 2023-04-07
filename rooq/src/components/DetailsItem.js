import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-svg-charts'
import { useTextWidth } from '@imagemarker/use-text-width';

const wid = Dimensions.get('window').width;

const DetailsItem = (props) => {
    //console.log(props);

    try{
        if(props.bt==false){
            return (
                <View style={{height: 45, marginTop:props.tp}}>
                    <Text style={{fontFamily: 'Helvetica Neue', fontSize: 15, fontWeight: "700", position: 'absolute', left: 20, top: 0, width: wid-80, color: "#9599a3"}}>{props.name}</Text>
                    <Text style={{fontFamily: 'Helvetica Neue', fontSize: 15, fontWeight: "500", position: 'absolute', left: 20, top: 22, width: wid-80, color: "#fff"}}>{props.value}</Text>
                </View>
            )    
        }
        else{
            return (
                <View style={{height: 45, marginTop:props.tp}}>
                    <Text style={{fontFamily: 'Helvetica Neue', fontSize: 15, fontWeight: "700", position: 'absolute', left: 20, top: 0, width: wid-80, color: "#9599a3"}}>{props.name}</Text>
                    <Text style={{fontFamily: 'Helvetica Neue', fontSize: 15, fontWeight: "500", position: 'absolute', left: 20, top: 22, width: wid-80, color: "#fff"}}>{props.value}</Text>
                    <View style={{backgroundColor: "#8C909A", height: 0.5, width: wid-80, position: 'absolute', left: 20, top: 48}}></View>
                </View>
            )
        }
    } catch{
        return (
            <View style={{height: 45, marginTop:props.tp}}>
                <Text style={{fontFamily: 'Helvetica Neue', fontSize: 15, fontWeight: "700", position: 'absolute', left: 20, top: 0, width: wid-80, color: "#9599a3"}}>{props.name}</Text>
                <Text style={{fontFamily: 'Helvetica Neue', fontSize: 15, fontWeight: "500", position: 'absolute', left: 20, top: 22, width: wid-80, color: "#fff"}}>{props.value}</Text>
                <View style={{backgroundColor: "#8C909A", height: 0.5, width: wid-80, position: 'absolute', left: 20, top: 48}}></View>
            </View>
        )
    }
}
export default DetailsItem;