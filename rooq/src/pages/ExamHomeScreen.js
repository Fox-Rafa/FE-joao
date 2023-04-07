import React, { useEffect, useState } from 'react';
import { RefreshControl, TouchableOpacity, ScrollView, StyleSheet, Text, Image, View, Dimensions, SafeAreaView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Exam_item from '../components/Exam_item';
import MainHeader from '../components/MainHeader';

const wid = Dimensions.get('window').width;
const hei = Dimensions.get('window').height;

import * as database from '../database/database';

export default function ExamHomeScreen(props) {
	const [patients, setPatients] = useState([]);
	const [exams, setExams] = useState([]);
	const [isloading, setIsloading] = useState(true);
	const [refreshing, setRefreshing] = React.useState(false);


	useEffect(() => {
		database.getExams()
			.then((exms) => {
				console.log(exms[0].creation)
				console.log(exms[1].creation)
				setExams(exms)
				setIsloading(false)
			})
	}, []);

	useEffect(() => {
		const unsubscribe = props.navigation.addListener('focus', () => {
			database.getExams()
				.then((exms) => {
					setExams(exms)
					setIsloading(false)
				})
		});
		return unsubscribe;
	}, [props.navigation]);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={{ width: '100%' }} bounces={true}>
				<MainHeader drawerToggle={() => props.navigation.toggleDrawer()} action={() => props.navigation.navigate('LoadingScreen')} />

				<View style={styles.examsvs}>
					{
						isloading && (
							<>
								{/*<Text style={styles.ldnvs}>carregando...</Text>*/}
								<Image source={require('../images/loadingAnimationFast.gif')} style={styles.loadingvs} />
							</>
						)
						|| exams.length == 0 && (<Text style={styles.noexamsvs}>Nenhum exame</Text>)
						|| (
							exams.map((exam, index) => {
								return (

									< Exam_item
										key={index}
										id={exam.exam_id}
										v1={exam.ecg_leads.v1}
										v2={exam.ecg_leads.v2}
										v3={exam.ecg_leads.v3}
										v4={exam.ecg_leads.v4}
										v5={exam.ecg_leads.v5}
										v6={exam.ecg_leads.v6}
										I={exam.ecg_leads.I}
										II={exam.ecg_leads.II}
										III={exam.ecg_leads.III}
										aVL={exam.ecg_leads.aVL}
										aVR={exam.ecg_leads.aVR}
										aVF={exam.ecg_leads.aVF}
										notes={exam.notes}
										navigation={props.navigation}
										patientName={exam.patient.first_name + ' ' + exam.patient.last_name}
										date={exam.creation}
										heartRate={exam.heart_rate}
										diagnosis={exam.diagnosis} />
								)
							}))
					}
				</View>
			</ScrollView >
		</SafeAreaView >
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000000',
		alignItems: 'center',
	},

	examsvs: {
		flex: 1,
		width: '100%',
		backgroundColor: '#000000',
		alignItems: 'center',
		marginTop: 20,
		marginBottom: 180,
	},

	noexamsvs: {
		fontFamily: 'Helvetica Neue',
		fontSize: 15,
		position: 'absolute',
		top: hei * 0.3,
		color: "#898D96",
	},

	patsvs: {
		width: wid - 40,
		height: 100,
		backgroundColor: "#1C1B1E",
		borderRadius: 20,
		marginBottom: 20,
		flexDirection: 'row',
		alignItems: 'center',
	},

	paticonvs: {
		height: 72.1 * 0.7,
		width: 50 * 0.7,
		left: 20
	},

	gotextvs: {
		color: "#E93F2D",
		fontFamily: 'Helvetica Neue',
		fontSize: 30,
		left: 40,
		fontWeight: "500"
	},

	ldnvs: {
		fontFamily: 'Helvetica Neue',
		fontSize: 15,
		position: 'absolute',
		top: (hei * 0.3) - 30,
		color: "#898D96",
	},

	loadingvs: {
		position: 'absolute',
		height: 30,
		width: 30,
		top: hei * 0.3,
	},
});
