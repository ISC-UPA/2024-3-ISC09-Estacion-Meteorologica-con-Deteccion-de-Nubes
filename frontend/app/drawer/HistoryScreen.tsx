import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts, Quicksand_700Bold } from '@expo-google-fonts/quicksand';

export default function LoginScreen() {

    const [fontsLoaded] = useFonts({
        Quicksand_700Bold,
    });

    if (!fontsLoaded) {
        return <Text>Loading...</Text>; 
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Image style={styles.backgroundImage} source={require('@/assets/images/background.png')} />
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('@/assets/images/logo.png')} />
                <Text style={styles.appName}>Cloudy</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.signInTitle}>Sign In</Text>
                <Text style={styles.subtitle}>Hi there! Nice to see you again.</Text>
                <TouchableOpacity style={styles.button} onPress={() => console.log('Login to Azure pressed')}>
                    <Text style={styles.buttonText}>Login to azure</Text>
                </TouchableOpacity>
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
        height: '85%',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    logo: {
        height: 80,
        width: 100,
        marginBottom: 10,
    },
    appName: {
        fontSize: 24,
        color: '#ffffff',
        fontFamily: 'Quicksand_700Bold',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        marginTop: -150,
        paddingHorizontal: 50, 
    },
    signInTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 10,
        fontFamily: 'Quicksand_700Bold',
        textAlign: 'left', 
    },
    subtitle: {
        fontSize: 16,
        color: '#888888',
        marginBottom: 20,
        textAlign: 'left', 
    },
    button: {
        backgroundColor: '#3D8AF7',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 85, 
        alignSelf: 'flex-start', 
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Quicksand_700Bold',
        textAlign: 'center', 
    },
});
