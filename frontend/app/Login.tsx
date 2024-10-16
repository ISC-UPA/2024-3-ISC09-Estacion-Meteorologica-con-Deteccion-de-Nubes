import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import AzureAuth from 'react-native-azure-auth';
import { azureAuthConfig } from '../constants/azureAuthConfig';

console.log('azureAuthConfig:', azureAuthConfig);

const azureAuth = new AzureAuth({
  clientId: azureAuthConfig.clientId,
  redirectUri: azureAuthConfig.redirectUri,
  tenant: azureAuthConfig.tenant,
});

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const tokens = await azureAuth.webAuth.authorize({
        scope: 'openid profile User.Read',
      });
      await AsyncStorage.setItem('accessToken', tokens.accessToken);
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default Login;