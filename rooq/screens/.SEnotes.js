import React from 'react';
import { TouchableOpacity, Keyboard, TouchableWithoutFeedback, TextInput, StyleSheet, Text, Image, View, Dimensions } from 'react-native';
import moment from 'moment';
import realm, { getExams, getPatients } from "../database";


const wid = Dimensions.get('window').width;
const hei = Dimensions.get('window').height;

export default function SEnotes(props) {
    const [text, onChangeText] = React.useState("");
    const sent = props.route.params;
    const pId = sent.patientId;
    const pName = sent.pName;
    const pAge = sent.pAge;
    const diag = sent.diagnosis;
    const date = String(moment().utcOffset('-03:00').format('D/M/Y, hh:mm a'));

    console.log(pId);
    console.log(diag);

    const saveExam = () => {
        const exams = getExams();
        console.log(exams);
        var id = 0;
        if (exams.length <= 0) {
            id = 1;
        } else {
            id = exams[exams.length - 1].exam_id + 1;
        }


        console.log(id)
        console.log(pName)
        console.log(pAge)

        realm.write(() => {
            const exam = realm.create('exam', {
                p_id: pId,
                exam_id: id,
                date: date,
                diagnosis: diag.trim(),
                notes: text.trim(),
                V1: sent.v1,
                V2: sent.v2,
                V3: sent.v3,
                V4: sent.v4,
                V5: sent.v5,
                V6: sent.v6,
                I: sent.i,
                II: sent.ii,
                III: sent.iii,
                aVL: sent.avl,
                aVR: sent.avr,
                aVF: sent.avf,
            });
        });

        props.navigation.push('savedexam')
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>

                <View style={styles.topvs}>
                    <TouchableOpacity style={styles.backvs} onPress={() => props.navigation.goBack()}>
                        <Image source={require('../images/backIcon.png')} style={styles.backvs} />
                    </TouchableOpacity>
                    <Text style={styles.savevs}>Salvar Exame</Text>
                </View>

                <Text style={styles.questionvs}>Notas:</Text>

                <TextInput style={styles.textfieldvs} multiline={true} onChangeText={onChangeText} value={text} />

                <TouchableOpacity style={styles.savebtvs} onPress={() => saveExam()}>
                    <Text style={styles.savetxtvs}>Salvar</Text>
                </TouchableOpacity>

                <View style={styles.progressvs}>
                    <TouchableOpacity style={{ width: 25, height: 25, marginRight: 23 }} onPress={() => props.navigation.push('SaveExam')}>
                        <View style={{ backgroundColor: '#D5402D', width: 25, height: 25, borderRadius: 25, marginRight: 23 }}></View>
                    </TouchableOpacity>

                    <View style={{ backgroundColor: '#D5402D', width: 25, height: 25, borderRadius: 25, marginRight: 23 }}></View>

                    <TouchableOpacity style={{ width: 25, height: 25, marginRight: 23 }} onPress={() => props.navigation.push('SEnotes')}>
                        <View style={{ backgroundColor: '#D5402D', width: 25, height: 25, borderRadius: 25, marginRight: 23 }}></View>
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
        fontFamily: 'Helvetica Neue',
    },

    backvs: {
        width: 15,
        height: 30,
        position: 'absolute',
        top: 30,
        left: 20,
    },

    savebtvs: {
        position: 'absolute',
        bottom: 75,
        right: 40,
        height: 100,
        width: 107,
    },

    savetxtvs: {
        color: '#D5402D',
        fontSize: 36,
        fontFamily: 'Helvetica Neue',
        fontWeight: '700',
        position: 'absolute',
        bottom: 0,
        right: 0,
    },

}); 