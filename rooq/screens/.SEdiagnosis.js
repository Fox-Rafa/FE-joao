import React from 'react';
import { TouchableOpacity, Keyboard, TouchableWithoutFeedback, TextInput, StyleSheet, Text, Image, View, Dimensions } from 'react-native';


const wid = Dimensions.get('window').width;
const hei = Dimensions.get('window').height;

export default function SEdiagnosis(props) {
    const [text, onChangeText] = React.useState("");
    const sent = props.route.params;
    const pId = sent.patientId;

    console.log(pId);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                
                <View style={styles.topvs}>
                    <TouchableOpacity style={styles.backvs} onPress={() => props.navigation.goBack()}>
                        <Image source={require('../images/backIcon.png')} style={styles.backvs} />
                    </TouchableOpacity>
                    <Text style={styles.savevs}>Salvar Exame</Text>
                </View>

                <Text style={styles.questionvs}>Diagnóstico:</Text>

                <TextInput style={styles.textfieldvs} onChangeText={onChangeText} value={text} />
                <Text style={styles.infovs}>in case you'd like to analyze the exam later just leave the field blank.</Text>
                <View style={styles.progressvs}>
                    <TouchableOpacity style={{ width: 25, height: 25, marginRight: 23 }} onPress={() => props.navigation.goBack()}>
                        <View style={{ backgroundColor: '#D5402D', width: 25, height: 25, borderRadius: 25, marginRight: 23 }}></View>
                    </TouchableOpacity>

                    <View style={{ backgroundColor: '#D5402D', width: 25, height: 25, borderRadius: 25, marginRight: 23 }}></View>

                    <TouchableOpacity style={{ width: 25, height: 25, marginRight: 23 }} onPress={() => props.navigation.push('SEnotes', {
                        patientId: pId,
                        diagnosis: text,
                        v1: sent.v1,
                        v2: sent.v2,
                        v3: sent.v3,
                        v4: sent.v4,
                        v5: sent.v5,
                        v6: sent.v6,
                        i: sent.i,
                        ii: sent.ii,
                        iii: sent.iii,
                        avl: sent.avl,
                        avr: sent.avr,
                        avf: sent.avf,
                    })}>
                        <View style={{ backgroundColor: '#D5402D', opacity: 0.35, width: 25, height: 25, borderRadius: 25, marginRight: 23 }}></View>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
    },

    savevs: {
        fontFamily: 'Helvetica Neue',
        position: 'absolute',
        top: 55,
        fontSize: 30,
        color: '#E93F2D',
    },

    topvs: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 102,
        width: '100%',
        backgroundColor: '#1C1B1E',
        alignItems: 'center',
    },

    questionvs: {
        position: 'absolute',
        bottom: hei / 2 + 30,
        left: 30,
        fontFamily: 'Helvetica Neue',
        fontSize: 30,
        color: '#fff',
    },


    progressvs: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 32,
        width: 121,
        height: 25,
    },

    textfieldvs: {
        position: 'absolute',
        bottom: hei / 2 - 45,
        width: wid - 40,
        height: 61,
        backgroundColor: '#1C1B1E',
        borderRadius: 22,
        //borderWidth: 1,
        borderColor: '#fff',
        padding: 10,
        fontSize: 25,
        color: '#fff',
    },

    infovs: {
        fontFamily: 'Helvetica Neue',
        fontSize: 18,
        fontWeight: "400",
        color: '#898D96',
        width: 300,
        textAlign: 'center',
        position: 'absolute',
        bottom: hei / 2 - 100,
    },

    backvs: {
        width: 15,
        height: 30,
        position: 'absolute',
        top: 30,
        left: 20,
    },

});