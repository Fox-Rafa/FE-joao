import React from 'react';
import { TouchableOpacity, Keyboard, TouchableWithoutFeedback, TextInput, StyleSheet, Text, Image, View, Dimensions } from 'react-native';


const wid = Dimensions.get('window').width;
const hei = Dimensions.get('window').height;

export default function APage(props) {
    const pName = props.route.params.patientName;
    console.log(props);
    console.log(pName);
    const [text, onChangeText] = React.useState("");

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>

                <View style={styles.topvs}>
                    <TouchableOpacity style={styles.backvs} onPress={() => props.navigation.goBack()}>
                        <Image source={require('../images/backIcon.png')} style={styles.backvs} />
                    </TouchableOpacity>
                    <Text style={styles.savevs}>Criar Paciente</Text>
                </View>

                <Text style={styles.questionvs}>Qual a idade do paciente?</Text>

                <TextInput style={styles.textfieldvs} onChangeText={onChangeText} value={text} />

                <View style={styles.progressvs}>
                    <TouchableOpacity style={{ width: 25, height: 25, marginRight: 23 }} onPress={() => props.navigation.navigate('SavePatient')}>
                        <View style={{ backgroundColor: '#D5402D', width: 25, height: 25, borderRadius: 25, marginRight: 23 }}></View>
                    </TouchableOpacity>

                    <View style={{ backgroundColor: '#D5402D', width: 25, height: 25, borderRadius: 25, marginRight: 23 }}></View>

                    <TouchableOpacity style={{ width: 25, height: 25, marginRight: 23 }} onPress={() => props.navigation.navigate('APsex', { patientName: pName, patientAge: text })}>
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
        top: 15,
        fontSize: 30,
        color: '#E93F2D',
    },

    topvs: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 60,
        width: '100%',
        backgroundColor: '#1C1B1E',
        alignItems: 'center',
    },

    questionvs: {
        position: 'absolute',
        bottom: hei / 2 + 30,
        fontFamily: 'Helvetica Neue',
        fontSize: 24,
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
        borderColor: '#fff',
        padding: 10,
        fontSize: 25,
        color: '#fff',

    },

    backvs: {
        width: 15,
        height: 30,
        position: 'absolute',
        top: 10,
        left: 20,
    },

});