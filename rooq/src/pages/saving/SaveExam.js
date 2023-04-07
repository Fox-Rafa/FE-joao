import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, TouchableOpacity, StyleSheet, Text, Image, View, Dimensions, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as database from "../../database/database";
import ModalHeader from '../../components/ModalHeader';
import * as yup from 'yup'
import { Formik, useFormik } from 'formik'

const wid = Dimensions.get('window').width;
const hei = Dimensions.get('window').height;

const saveExamSchema = yup.object().shape({
	diagnosis: yup
		.string()
		.required('O diagnóstico é necessário')
		.max(100, 'Diagnóstico muito longo'),

	observacoes: yup
		.string()
		.max(500, 'Observações muito longas'),
})

var database_patients
export default function SaveExam(props) {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([]);

	async function getPats() {
		database_patients = await database.getPatients()
		const its = []
		for (var i = 0; i < database_patients.length; i++) {
			its.push({ label: database_patients[i].first_name + ' ' + database_patients[i].last_name, value: database_patients[i].patient_id })
		}

		setItems(its)
	}

	useEffect(() => {
		getPats()
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
		initialValues: { diagnosis: '', observacoes: '' },
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: (values, { setStatus, setSubmitting }) => {
			if (!value)
				return

			var pat

			for (let i = 0; i < items.length; i++) {
				if (database_patients[i].patient_id == value) {
					pat = database_patients[i]
					break
				}
			}

			database.saveExam({
				patient_id: pat.patient_id,
				patient_first_name: pat.first_name,
				patient_last_name: pat.last_name,
				patient_birthdate: pat.birthdate,
				patient_sex: pat.sex,
				v1: props.route.params.exam.v1,
				v2: props.route.params.exam.v2,
				v3: props.route.params.exam.v3,
				v4: props.route.params.exam.v4,
				v5: props.route.params.exam.v5,
				v6: props.route.params.exam.v6,
				I: props.route.params.exam.i,
				II: props.route.params.exam.ii,
				III: props.route.params.exam.iii,
				aVR: props.route.params.exam.avr,
				aVL: props.route.params.exam.avl,
				aVF: props.route.params.exam.avf,
				heart_rate: 57,
				notes: values.observacoes,
				diagnosis: values.diagnosis,
			})

			exit()
		}
	});


	function exit() {
		// pop to top
		props.navigation.popToTop()
	}


	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>
				<ModalHeader done={true} submit={handleSubmit} exit={exit} />

				<View style={styles.form}>
					<View style={styles.input}>
						<Text style={styles.inputTitle}>Diagnóstico</Text>
						<TextInput
							name="diagnosis"
							style={styles.textInput}
							onChangeText={handleChange('diagnosis')}
							onBlur={handleBlur('diagnosis')}
							value={values.diagnosis}
							autoCorrect={false}
							autoComplete={'none'}
							multiline={true}
						/>
						{(errors.diagnosis && touched.diagnosis) &&
							<Text style={styles.errorText}>{errors.diagnosis}</Text>
						}
					</View>


					<View style={styles.input}>
						<Text style={styles.inputTitle}>Observações</Text>
						<TextInput
							name="observacoes"
							multiline={true}
							numberOfLines={0}
							style={styles.bigTextInput}
							onChangeText={handleChange('observacoes')}
							onBlur={handleBlur('observacoes')}
							value={values.observacoes}
							autoCorrect={false}
							autoComplete={'none'}
						/>
						{(errors.observacoes && touched.observacoes) &&
							<Text style={styles.errorText}>{errors.observacoes}</Text>
						}
					</View>


					<View style={styles.input}>
						<Text style={styles.pacientInputTitle}>Paciente</Text>
						<DropDownPicker
							placeholder="escolha seu paciente"
							searchablePlaceholder="patient"
							searchTextInputStyle={{ color: "#fff" }}
							searchable={true}
							searchPlaceholderTextColor='#fff'
							textStyle={styles.pickertextvs}
							style={styles.pickervs}
							containerStyle={styles.pickerCONTvs}
							dropDownContainerStyle={styles.pickerdropvs}
							open={open}
							value={value}
							items={items}
							setOpen={setOpen}
							setValue={setValue}
							searchPlaceholder="Qual o nome do paciente?"
							translation={{ NOTHING_TO_SHOW: "não existe" }}
						/>
						{!value &&
							<Text style={styles.errorText}>É necessario escolher o paciente</Text>
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
		margintTop: 30,
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
