import React, { useEffect, useState } from 'react';
import { Button, TouchableWithoutFeedback, Keyboard, TouchableOpacity, StyleSheet, Text, Image, View, Dimensions, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as database from "../../database/database";
import ModalHeader from '../../components/ModalHeader';
import * as yup from 'yup'
import { Formik, useFormik } from 'formik'
import DatePicker from 'react-native-date-picker'

const wid = Dimensions.get('window').width;
const hei = Dimensions.get('window').height;

const saveExamSchema = yup.object().shape({
  first_name: yup
    .string()
    .required('O nome é necessário')
    .max(30, 'Nome muito longo'),

  last_name: yup
    .string()
    .required('O sobrenome é necessário')
    .max(30, 'Sobrenome muito longo'),
})

export default function EditPatient(props) {
  const sent = props.route.params
  const [birthDate, setBirthDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [sexValue, setSexValue] = useState('Homen')
  const [pickerItems, setPickerItems] = useState([
    { label: 'Homen', value: 'Homen' },
    { label: 'Mulher', value: 'Mulher' },
  ])

  useEffect(() => {
    const d = new Date(0)
    d.setUTCSeconds(sent.item.birthdate._seconds)

    console.log(sent.item.sex)
    setSexValue(sent.item.sex)
    setBirthDate(d)
  }, []);

  //########################################
  const [patientId, setPatientId] = useState('')
  const [diagnisos, setDiagnosis] = useState('')
  const [notes, setNotes] = useState('')

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    status,
    setSubmitting
  } = useFormik({
    validationSchema: saveExamSchema,
    initialValues: { first_name: sent.item.first_name, last_name: sent.item.last_name },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values, { setStatus, setSubmitting }) => {

      database.editPatient({
        id: sent.id,
        firstName: values.first_name,
        lastName: values.last_name,
        birthDate: { _seconds: Number(Date.parse(birthDate) / 1000) },
        sex: sexValue,
        profile_picture: false,
      })

      exit()
    }
  });


  function exit() {
    props.navigation.popToTop()
  }


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ModalHeader done={true} submit={handleSubmit} exit={exit} />

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputTitle}>Nome</Text>
            <TextInput
              name="first_name"
              style={styles.textInput}
              onChangeText={handleChange('first_name')}
              onBlur={handleBlur('first_name')}
              value={values.first_name}
              autoCorrect={false}
              autoComplete={'none'}
              multiline={true}
            />
            {(errors.first_name && touched.first_name) &&
              <Text style={styles.errorText}>{errors.first_name}</Text>
            }
          </View>

          <View style={styles.input}>
            <Text style={styles.inputTitle}>Sobrenome</Text>
            <TextInput
              name="last_name"
              style={styles.textInput}
              onChangeText={handleChange('last_name')}
              onBlur={handleBlur('last_name')}
              value={values.last_name}
              autoCorrect={false}
              autoComplete={'none'}
              multiline={true}
            />
            {(errors.last_name && touched.last_name) &&
              <Text style={styles.errorText}>{errors.last_name}</Text>
            }
          </View>

          <View style={styles.input}>
            <Text style={styles.inputTitle}>Data de nascimento</Text>
            <DatePicker
              textColor='#ffffff'
              date={birthDate}
              onDateChange={(a) => setBirthDate(a)}
              mode='date'
            />
            {(errors.birthdate && touched.birthdate) &&
              <Text style={styles.errorText}>{errors.birthdate}</Text>
            }
          </View>

          <View style={styles.input}>
            <Text style={styles.inputTitle}>Sexo</Text>
            <DropDownPicker
              placeholder="Homen"
              searchTextInputStyle={{ color: "#fff" }}
              textStyle={styles.pickertextvs}
              style={styles.pickervs}
              containerStyle={styles.pickerCONTvs}
              dropDownContainerStyle={styles.pickerdropvs}
              value={sexValue}
              items={pickerItems}
              setOpen={setOpen}
              open={open}
              setValue={setSexValue}
              setItems={setPickerItems}
            />

            {(errors.sex && touched.sex) &&
              <Text style={styles.errorText}>{errors.sex}</Text>
            }
          </View>

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

  form: {
    width: '100%',
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    margintTop: 60,
  },

  topBar: {
    borderColor: '#fff',
    borderWidth: 1,

    position: 'relative',
    flex: 1,
    flexDirection: "row",
    width: '100%',
    padding: 15
  },

  backButton: {

    width: 15 * 0.8,
    height: 30 * 0.8,
  },

  headerText: {
    position: 'relative',
    color: '#fff'
  },

  errorText: {
    fontSize: 13,
    color: 'red',
    fontWeight: '600',
    alignSelf: 'center',
  },

  inputTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'flex-start',
  },

  pacientInputTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },

  textInput: {
    width: '100%',
    margin: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 13,
    paddingTop: 13,
    borderRadius: 15,
    backgroundColor: '#2b2c2e',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 17,
    color: '#807f8d'
  },

  bigTextInput: {
    width: '100%',
    margin: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 13,
    paddingTop: 13,
    borderRadius: 15,
    backgroundColor: '#2b2c2e',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 17,
    color: '#807f8d'
  },

  input: {
    margintTop: 20,
    marginBottom: 20,
  },

  pickerCONTvs: {
    marginBottom: 150,
  },

  pickervs: {
    backgroundColor: '#2b2c2e',
    borderRadius: 15,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 13,
    paddingTop: 13,
  },

  pickertextvs: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center'
  },

  pickerdropvs: {
    backgroundColor: '#2b2c2e',
    borderRadius: 15,

  },

});