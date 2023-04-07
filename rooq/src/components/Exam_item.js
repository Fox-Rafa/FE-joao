import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-svg-charts'
import moment from 'moment';

const wid = Dimensions.get('window').width;
const hei = Dimensions.get('window').height;

const Exam_item = (props) => {
	const [dt, setDt] = useState('')
	const [bkColor, setBkColor] = useState('#2B2C2E')
	const [nameColor, setnameColor] = useState('#fff')
	const [dateColor, setDateColor] = useState('#898D96')
	const [diagColor, setDiagColor] = useState('#229F43')

	const srNm = ['sr', 'sinus rythm', 'sr', 'ritmo sinusal', 'rs', 'ritmo sinusual', 'ritmo s']
	const asNm = ['asystole', 'as', 'ast', 'asyst', 'asistole', 'assistole']

	useEffect(() => {
		if (props.date != null) {
			var d = new Date(0)
			d.setUTCSeconds(props.date._seconds)

			setDt(
				String(
					d.getDate() +
					'/' +
					(d.getMonth() + 1) +
					'/' +
					d.getFullYear() +
					' ' +
					d.getHours() +
					':' +
					d.getMinutes()
				)
			)
		}

		if (srNm.includes(props.diagnosis.toLowerCase())) {
			setBkColor('#2B2C2E')
			setnameColor('#fff')
			setDateColor('#898D96')
			setDiagColor('#229F43')
		} else if (asNm.includes(props.diagnosis.toLowerCase())) {
			setBkColor('#D5402D')
			setnameColor('#000')
			setDateColor('#69251C')
			setDiagColor('#D5402D')
		} else {
			setBkColor('#FFD728')
			setnameColor('#000')
			setDateColor('#986D1B')
			setDiagColor('#FFD728')
		}
	}, [props])

	return (
		<View style={styles.item}>
			<TouchableOpacity onPress={() => props.navigation.navigate('ExamSumary', {
				v1: props.v1,
				v2: props.v2,
				v3: props.v3,
				v4: props.v4,
				v5: props.v5,
				v6: props.v6,
				i: props.I,
				ii: props.II,
				iii: props.III,
				avl: props.aVL,
				avr: props.aVR,
				avf: props.aVF,
				notes: props.notes,
				navigation: props.navigation,
				patientName: props.patientName,
				date: props.date,
				heartRate: props.heartRate,
				diagnosis: props.diagnosis,
				past: true,
				id: props.id
			})}>
				<View style={styles.topbk}>
					<Text style={styles.namevs}>{props.patientName}</Text>
					<Text style={styles.datevs}>{dt}</Text>
					<Image source={require('../images/backgrey.png')} style={styles.morevs} />
				</View>
			</TouchableOpacity>
			<View style={styles.midvs}>
				<Image source={require('../images/hearticonIMG.png')} style={styles.heartvs} />
				<Text style={styles.hrvs}>{props.heartRate + 'BPM'}</Text>
				<Text style={styles.diagvs}>{props.diagnosis}</Text>
			</View>

			<LineChart
				style={styles.chartvs}
				data={props.v3.slice(0, 250 * 4)}
				svg={{ stroke: '#D5402D', strokeWidth: 3 }}
				contentInset={{ top: 5, bottom: 5 }}
			>
			</LineChart>

			<Text style={styles.leadnamevs}>derivação I</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	item: {
		backgroundColor: '#1C1B1E',
		width: wid - 40,
		height: 250,
		borderRadius: 20,
		marginBottom: 20,
	},

	topbk: {
		backgroundColor: '#2B2C2E',
		width: wid - 40,
		height: 50,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		top: 0,
		right: 0,
		flexDirection: 'row',
		alignItems: 'center',
	},

	namevs: {
		fontFamily: 'Helvetica Neue',
		fontSize: 20,
		fontWeight: '500',
		color: '#fff',
		position: 'absolute',
		left: 16,
	},

	datevs: {
		fontFamily: 'Helvetica Neue',
		fontSize: 14,
		fontWeight: '700',
		color: '#898D96',
		position: 'absolute',
		right: 24,
	},

	midvs: {
		width: 340,
		height: 49,
		flexDirection: 'row',
		alignItems: 'center',
	},

	hrvs: {
		fontFamily: 'Helvetica Neue',
		fontSize: 17,
		fontWeight: '700',
		color: '#D5402D',
		position: 'absolute',
		left: 46,
	},

	diagvs: {
		fontFamily: 'Helvetica Neue',
		fontSize: 16,
		fontWeight: '500',
		color: '#229F43',
		position: 'absolute',
		right: 17,
	},

	leadnamevs: {
		fontFamily: 'Helvetica Neue',
		fontSize: 14,
		fontWeight: '500',
		color: '#898D96',
		position: 'absolute',
		bottom: 5,
		right: 30
	},

	heartvs: {
		width: 20,
		height: 50,
		position: 'absolute',
		left: 22,
	},

	morevs: {
		width: 5 * 1.1,
		height: 12 * 1.1,
		position: 'absolute',
		right: 17,
	},

	chartvs: {
		position: 'absolute',
		height: 125,

		width: wid - 60,
		bottom: 25,
		left: 10,
		borderWidth: 2,
		borderColor: '#8C909A',
		borderRadius: 10,
	},
});

export default Exam_item;