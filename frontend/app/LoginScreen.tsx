import { StatusBar } from 'expo-status-bar';
import * as React from 'react'; 
import { View, Text, Image, StyleSheet } from 'react-native';

export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <StatusBar style="light"/>
            <Image style={styles.backgroundImage} source={require('../assets/images/background.png')} />
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/images/logo.png')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    logoContainer: {
    },
    logo: {
        height: 255,
        width: 65,
    },
});
