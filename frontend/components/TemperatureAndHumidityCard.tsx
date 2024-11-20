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
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    width: 230,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  temperature: {
    fontSize: 65,
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 10,
    fontFamily: 'Quicksand_700Bold',
  },
  humidity: {
    fontSize: 35,
    color: 'white',
    fontFamily: 'Quicksand_600SemiBold ',
  },
  location: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
    textAlign: 'left',
    fontFamily: 'Quicksand_700Bold',
  },
  region: {
    fontSize: 12,
    color: 'white',
    textAlign: 'left',
    fontFamily: 'Quicksand_700Bold',
  },
});

export default TemperatureAndHumidityCard;
