import React from 'react';
import { Platform, StyleSheet, Image, View, Dimensions } from 'react-native';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";


const wid = Dimensions.get('window').width;
const hei = Dimensions.get('window').height;

const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false
};

export default function okanimation() {
    //const [text, onChangeText] = React.useState("");  
    setTimeout(function () {
        if (Platform.OS === 'ios') {

            ReactNativeHapticFeedback.trigger("notificationSuccess", options);
        }
    }, 1230);

    return (
        <View style={styles.container}>
            
            <Image source={require('../images/okanimation.gif')} style={styles.animationvs} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
    },


    animationvs: {
        position: 'absolute',
        height: 120,
        width: 120,
        bottom: hei / 2 - 60,
        left: wid / 2 - 60,
    },

});