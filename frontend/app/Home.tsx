import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getAccessToken } from '../utils/auth';

const Home = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await getAccessToken();
      setAccessToken(token);
    };

    fetchAccessToken();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      {accessToken ? (
        <Text>Access Token: {accessToken}</Text>
      ) : (
        <Text>Loading access token...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default Home;