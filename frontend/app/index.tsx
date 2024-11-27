import React, { useEffect, useState, useLayoutEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { useQuery } from '@apollo/client';
import * as WebBrowser from 'expo-web-browser';
import { AuthManager } from '@/auth/AzureAuthManager';
import { GET_USERS } from '@/api/queries/queryUsers';
import LoadingIndicator from '@/components/atoms/common/LoadingComponent';
import TextAtom from '@/components/atoms/common/TextAtom';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts, Quicksand_700Bold } from '@expo-google-fonts/quicksand';

WebBrowser.maybeCompleteAuthSession();

export default function AzureSignIn(props: any) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const navigation = useNavigation();

  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerShown: false,
    });
  }, [navigation]);

  const { data, loading: queryLoading, error: queryError } = useQuery(GET_USERS, {
    variables: {
      where: {
        email: userEmail
      }
    },
    skip: !userEmail,
  });

  useEffect(() => {
    const checkSignInStatus = async () => {
      try {
        const token = await AuthManager.getAccessTokenAsync();
        setIsSignedIn(!!token);

        if (token) {
          const email = await AsyncStorage.getItem('userEmail');
          setUserEmail(email || '');
        }
      } catch (error) {
        console.error('Failed to check sign-in status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSignInStatus();
  }, []);

  useEffect(() => {
    if (isSignedIn && data && data.user) {
      AsyncStorage.setItem('userInfo', JSON.stringify(data.user));
      navigation.navigate('(tabs)' as never);
    } else if (isSignedIn && !queryLoading && !data) {
      setError('User does not exist in the database');
      AuthManager.signOutAsync();
      setIsSignedIn(false);
    }
  }, [isSignedIn, data, queryLoading]);

  const handleSignIn = async () => {
    try {
      const { userEmail } = await AuthManager.signInAsync();
      setUserEmail(userEmail);
      setIsSignedIn(true);
    } catch (error) {
      console.error('Failed to sign in:', error);
      setError('Failed to sign in');
    }
  };

  if (loading || queryLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image style={styles.backgroundImage} source={require('../assets/images/background.png')} />
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/images/logo.png')} />
        <Text style={styles.appName}>Cloudy</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.signInTitle}>Sign In</Text>
        <Text style={styles.subtitle}>Hi there! Nice to see you again.</Text>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
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
    fontFamily: 'Quicksand_700Bold',
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 20,
  },
});
