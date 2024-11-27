import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { useFonts, Quicksand_700Bold, Quicksand_600SemiBold } from '@expo-google-fonts/quicksand';

interface TemperatureAndHumidityCardProps {
  temperature: number | string;
  humidity: number | string;
  location: string;
  region: string;
}

const TemperatureAndHumidityCard: React.FC<TemperatureAndHumidityCardProps> = ({ temperature, humidity, location, region }) => {
  const [fontsLoaded] = useFonts({
    Quicksand_700Bold,
    Quicksand_600SemiBold
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; 
  }

  return (
    <Card style={styles.card}>
      
        <View style={styles.row}>
          <Text style={styles.temperature}>{temperature}°</Text>
          <Text style={styles.humidity}>{humidity}%</Text>
        </View>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.region}>{region}</Text>
      
    </Card>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 5,
    width: 210,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  temperature: {
    fontSize: 55,
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 5,
    fontFamily: 'Quicksand_700Bold',
  },
  humidity: {
    fontSize: 30,
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: 'Quicksand_600SemiBold ',
  },
  location: {
    fontSize: 20,
    color: 'white',
    textAlign: 'left',
    fontFamily: 'Quicksand_700Bold',
    paddingHorizontal: 10,
  },
  region: {
    fontSize: 16,
    color: 'white',
    textAlign: 'left',
    fontFamily: 'Quicksand_700Bold',
    paddingHorizontal: 10,
    marginTop: 5, 
  },
});

export default TemperatureAndHumidityCard;
