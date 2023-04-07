import React from 'react';
import { TouchableOpacity, Keyboard, TouchableWithoutFeedback, StyleSheet, Text, Image, View, Dimensions } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from "react";
import realm, { getExams, getPatients } from "../database";


const wid = Dimensions.get('window').width;
const hei = Dimensions.get('window').height;

export default function APsex(props) {
    const pName = props.route.params.patientName;
    const pAge = props.route.params.patientAge;
    console.log(pName);
    console.log(pAge);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("Homen");
    const [items, setItems] = useState([
        { label: 'Homen', value: 'Homen' },
        { label: 'Mulher', value: 'Mulher' },
    ]);

    const savePatient = () => {
        const patients = getPatients();
        var id = 0;
        if (patients.length <= 0) {
            id = 1;
        } else {
            id = patients[patients.length - 1].pat_id + 1;
        }

        console.log(id)
        console.log(pName)
        console.log(pAge)
        console.log(value)

        realm.write(() => {
            const patient = realm.create('patient', {
                pat_id: id,
                pat_name: String(pName).trim(),
                pat_age: Number(pAge),
                pat_sex: String(value).trim(),
            });
        });

        props.navigation.push('savedpatient')
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>

                <View style={styles.topvs}>
                    <TouchableOpacity style={styles.backvs} onPress={() => props.navigation.goBack()}>
                        <Image source={require('../images/backIcon.png')} style={styles.backvs} />
                    </TouchableOpacity>
                    <Text style={styles.savevs}>Criar Paciente</Text>
                </View>

                <Text style={styles.questionvs}>Qual o sexo do paciente?</Text>

                <DropDownPicker
                    placeholder="Male"
                    searchTextInputStyle={{ color: "#fff" }}
                    textStyle={styles.pickertextvs}
                    style={styles.pickervs}
                    containerStyle={styles.pickerCONTvs}
                    dropDownContainerStyle={styles.pickerdropvs}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                />

                <TouchableOpacity style={styles.savebtvs} onPress={() => savePatient()}>
                    <Text style={styles.savetxtvs}>Salvar</Text>
                </TouchableOpacity>

                <View style={styles.progressvs}>
                    <TouchableOpacity style={{ width: 25, height: 25, marginRight: 23 }} onPress={() => props.navigation.push('SavePatient')}>
                        <View style={{ backgroundColor: '#D5402D', width: 25, height: 25, borderRadius: 25, marginRight: 23 }}></View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: 25, height: 25, marginRight: 23 }} onPress={() => props.navigation.push('APage')}>
                        <View style={{ backgroundColor: '#D5402D', width: 25, height: 25, borderRadius: 25, marginRight: 23 }}></View>
                    </TouchableOpacity>

                    <View style={{ backgroundColor: '#D5402D', width: 25, height: 25, borderRadius: 25, marginRight: 23 }}></View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
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

    pickervs: {
        position: 'absolute',
        bottom: hei / 2 + 30,
        width: 300,
        height: 50,
    },

    itemvs: {
        color: '#fff',
        fontFamily: 'Helvetica Neue',
        fontSize: 24,
    },

    backvs: {
        width: 15,
        height: 30,
        position: 'absolute',
        top: 10,
        left: 20,
    },

    pickerCONTvs: {
        position: 'absolute',
        bottom: hei / 2 - 45,
        width: wid - 40,
    },

    pickervs: {
        backgroundColor: '#1C1B1E',
        borderRadius: 22,
        height: 60,

    },

    pickertextvs: {
        color: '#fff',
        fontSize: 25,
        fontFamily: 'Helvetica Neue',
        borderRadius: 22,
    },

    pickerdropvs: {
        backgroundColor: '#1C1B1E',
        borderRadius: 22,
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