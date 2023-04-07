import React from 'react';
import { Image, Dimensions, View, StyleSheet } from 'react-native';

const wid = Dimensions.get('window').width;
const hei = Dimensions.get('window').height;

export default SplashScreen = () => {
	return (
		<View style={{ backgroundColor: '#000', height: '100%', width: '100%' }}>
			<Image source={require('../images/loadingAnimationFast.gif')} style={styles.loadingvs} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000000',
		alignItems: 'center',
	},

	loadingvs: {
		position: 'absolute',
		height: 200,
		width: 200,
		bottom: hei / 2 - 200 / 2,
		left: wid / 2 - 200 / 2,
	},
});