import React, { Path } from 'react'
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	StatusBar,
	TextInput,
	Button,
	Dimensions,
	Image,
	Linking
} from 'react-native'
import { Formik, useFormik } from 'formik'
import * as yup from 'yup'
import auth from '@react-native-firebase/auth';
import { useAuth } from '../../../context/AuthUserContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SvgUri from 'react-native-svg-uri';

const loginSchema = yup.object().shape({
	email: yup
		.string()
		.email("Email inválido")
		.required('Email é necessario'),
	password: yup
		.string()
		.required('Senha é necessária'),
})

const wid = Dimensions.get('window').width;
const hei = Dimensions.get('window').height;
const LoginPage = (props) => {
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
		validationSchema: loginSchema,
		initialValues: { email: '', password: '' },
		onSubmit: (values, { setStatus, setSubmitting }) => {
			auth().signInWithEmailAndPassword(values.email, values.password)
				.then((authUser) => {
					console.log('Success. ', authUser)
				})
				.catch((error) => {
					console.log(error.code)
					if (error.code === 'auth/invalid-email') {
						setStatus('Email invalido.')
					} else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
						setStatus('Email ou senha errado.')
					} else if (error.code === 'auth/too-many-requests') {
						setStatus('Muitas tentativas de login, tente novamente mais tarde.')
					} else {
						setStatus('Tente novamente mais tarde.')
					}
				})
		}
	});

	return (
		<>
			<View style={styles.container}>

				<SvgUri width="233" height="90" source={require('../../images/rooqbiomed.svg')} style={{ marginBottom: 40 }} />


				<View style={styles.innerContainer}>

					<Text style={{ fontSize: 20, fontWeight: '600', color: '#fff', marginBottom: 3 }}>Entre no seu painel rooq</Text>

					<Text style={{ color: '#474761', fontSize: 17, marginBottom: 35, }}>Novo aqui? <TouchableOpacity onPress={() => { Linking.openURL('https://painel.rooqbiomed.com/auth/registration') }}><Text style={{ color: '#3699ff', fontSize: 17, fontWeight: '600', }} >crie uma conta</Text></TouchableOpacity></Text>

					{status ? (
						<View style={{ backgroundColor: '#fbb8bf', borderRadius: 15, height: 55, width: '100%', paddingLeft: 23, justifyContent: 'center', marginBottom: 12 }}>
							<Text style={{ fontSize: 17, color: '#621f26' }}>{status}</Text>
						</View>
					) : null}

					<View style={styles.inp}>
						<Text style={styles.lblvs}>Email</Text>
						<TextInput
							name="email"
							placeholder="Email"
							style={styles.textInput}
							onChangeText={handleChange('email')}
							onBlur={handleBlur('email')}
							value={values.email}
							keyboardType="email-address"
							autoCapitalize='none'
							autoCorrect={false}
							autoComplete={'email'}
						/>
						{(errors.email && touched.email) &&
							<Text style={styles.errorText}>{errors.email}</Text>
						}
					</View>

					<View style={styles.inp}>
						<Text style={styles.lblvs}>Senha</Text>
						<TextInput
							name="password"
							placeholder="Senha"
							style={styles.textInput}
							onChangeText={handleChange('password')}
							onBlur={handleBlur('password')}
							value={values.password}
							secureTextEntry
							autoCapitalize='none'
							autoCorrect={false}
							autoComplete={'password'}
						/>
						{(errors.password && touched.password) &&
							<Text style={styles.errorText}>{errors.password}</Text>
						}
					</View>
					<View style={{ height: 10 }} />
					<View>
						<TouchableOpacity
							onPress={handleSubmit}
							style={styles.btvs}
						><Text style={{ color: '#fff', fontSize: 18 }}>Continuar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#000'
	},

	innerContainer: {
		alignItems: 'center',
		backgroundColor: '#121114',
		borderRadius: 15,
		padding: 30,
		color: '#fff',
		width: wid - 50,
	},

	inp: {
		//alignItems: 'center',
		width: '100%',
		marginBottom: 12
	},

	btvs: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#3699ff',
		height: 50,
		borderRadius: 15,
		width: wid - 110
	},

	textInput: {
		height: 55,
		width: '100%',
		margin: 10,
		paddingLeft: 23,
		borderRadius: 15,
		backgroundColor: '#2b2c2e',
		marginLeft: 'auto',
		marginRight: 'auto',
		fontSize: 17,
		color: '#807f8d'
	},

	errorText: {
		fontSize: 15,
		color: 'red',
	},

	lblvs: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	}
})

export default LoginPage