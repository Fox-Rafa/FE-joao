import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { getUniqueId } from 'react-native-device-info';

async function getExams(patientId) {
	try {
		const exams = []
		console.log(patientId)
		var querySnapshot
		if (typeof patientId == 'undefined') {
			querySnapshot = await firestore().collection('users').doc(auth().currentUser.uid).collection('exams').get()
		} else {

			querySnapshot = await firestore().collection('users').doc(auth().currentUser.uid).collection('exams').where('patient_id', '==', patientId).get()
		}

		querySnapshot.forEach((doc) => {
			const ex = doc.data()
			ex.exam_id = doc.id
			exams.push(ex)
		})

		return exams
	} catch {
		return null
	}
}

async function getPatients(patientId) {
	try {
		if (typeof patientId == 'undefined') {
			const patients = []

			const querySnapshot = await firestore().collection('users').doc(auth().currentUser.uid).collection('patients').get()

			querySnapshot.forEach((doc) => {
				const a = doc.data()
				a.patient_id = doc.id
				patients.push(a)
			})

			return (patients)
		} else {
			query = await firestore().collection('users').doc(auth().currentUser.uid).collection('patients').doc(patientId).get()

			return (query.data())
		}


	} catch {
		return null
	}
}

async function savePatient(patient) {
	try {
		const a = await firestore().collection('users').doc(auth().currentUser.uid).collection('patients').add({
			first_name: patient.firstName,
			last_name: patient.lastName,
			birthdate: patient.birthDate,
			sex: patient.sex,
			exams_qtdy: 0,
			profile_picture_url: patient.profile_picture ? `https://storage.googleapis.com/hostukrainians-1.appspot.com/profile_pictures/${auth().currentUser.uid}/${patient_id}` : '',
			exams: [],
			originId: getUniqueId(),
			creation: firestore.FieldValue.serverTimestamp(),
			lastModified: firestore.FieldValue.serverTimestamp(),
		})
	} catch {
		return null
	}
}

async function editPatient(patient) {
	try {
		const a = await firestore().collection('users').doc(auth().currentUser.uid).collection('patients').doc(patient.id).update({
			first_name: patient.firstName,
			last_name: patient.lastName,
			birthdate: patient.birthDate,
			sex: patient.sex,
			profile_picture_url: patient.profile_picture ? `https://storage.googleapis.com/hostukrainians-1.appspot.com/profile_pictures/${auth().currentUser.uid}/${patient_id}` : '',
			lastModified: firestore.FieldValue.serverTimestamp()
		})

		console.log({ a })
	} catch (err) {
		console.log({ err })
		return null
	}
}

async function saveExam(exam) {
	try {
		const a = await firestore().collection('users').doc(auth().currentUser.uid).collection('exams').add({
			patient_id: exam.patient_id,
			patient: {
				first_name: exam.patient_first_name,
				last_name: exam.patient_last_name,
				birthdate: exam.patient_birthdate,
				sex: exam.patient_sex,
			},
			ecg_leads: {
				v1: exam.v1,
				v2: exam.v2,
				v3: exam.v3,
				v4: exam.v4,
				v5: exam.v5,
				v6: exam.v6,
				I: exam.I,
				II: exam.II,
				III: exam.III,
				aVR: exam.aVR,
				aVL: exam.aVL,
				aVF: exam.aVF
			},
			heart_rate: exam.heart_rate,
			notes: exam.notes,
			diagnosis: exam.diagnosis,
			originId: getUniqueId(),
			creation: firestore.FieldValue.serverTimestamp(),
			lastModified: firestore.FieldValue.serverTimestamp()
		})

		console.log({ a })
	} catch (err) {
		console.log(err)
		return null
	}
}

async function deleteExam(exam_id) {
	try {
		const a = await firestore().collection('users').doc(auth().currentUser.uid).collection('exams').doc(exam_id).update({
			deletion: {
				creation: firestore.FieldValue.serverTimestamp(),
				originId: getUniqueId(),
			}
		})
	} catch {
		return null
	}
}

async function deletepatient(patient_id) {
	try {
		const a = firestore().collection('users').doc(auth().currentUser.uid).collection('patients').doc(patient_id).update({
			deletion: {
				creation: firestore.FieldValue.serverTimestamp(),
				originId: getUniqueId(),
			}
		})

	} catch {
		return null
	}
}

export {
	getExams,
	getPatients,
	savePatient,
	editPatient,
	saveExam,
	deleteExam,
	deletepatient
}


/*
import Realm from "realm";

// Declare Schema
class examschema extends Realm.Object { }
examschema.schema = {
	name: 'exam',
	properties: {
		p_id: 'int',
		exam_id: 'int',
		date: 'string',
		diagnosis: 'string',
		notes: 'string',
		V1: 'float[]',
		V2: 'float[]',
		V3: 'float[]',
		V4: 'float[]',
		V5: 'float[]',
		V6: 'float[]',
		I: 'float[]',
		II: 'float[]',
		III: 'float[]',
		aVL: 'float[]',
		aVR: 'float[]',
		aVF: 'float[]',
	},
	primaryKey: "exam_id",
};

class patientschema extends Realm.Object { }
patientschema.schema = {
	name: 'patient',
	properties: {
		pat_id: 'int',
		pat_name: 'string',
		pat_age: 'int',
		pat_sex: 'string',
	},
	primaryKey: "pat_id",
};


// Create realm
let realm = new Realm({ schema: [examschema, patientschema], schemaVersion: 2 });

// Export the realm
export default realm;

*/