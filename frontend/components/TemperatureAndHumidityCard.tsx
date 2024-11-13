import React from 'react';
import { View, StyleSheet,  Dimensions  } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { useFonts, Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand';

interface TemperatureAndHumidityCardProps {
  temperature: number | string;
  humidity: number | string;
  location: string;
  region: string;
}

const TemperatureAndHumidityCard: React.FC<TemperatureAndHumidityCardProps> = ({ temperature, humidity, location, region }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.row}>
          <Text style={styles.temperature}>{temperature}°</Text>
          <Text style={styles.humidity}>{humidity}%</Text>
        </View>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.region}>{region}</Text>
      </Card.Content>
    </Card>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 19,
    width: width * 0.61,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  temperature: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontVariant: ['tabular-nums'],
  },
  humidity: {
    fontSize: 18,
    color: 'white',
    marginLeft: 5,
    fontFamily: 'Quicksand',
  },
  location: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
    textAlign: 'left',
  },
  region: {
    fontSize: 12,
    color: 'white',
    textAlign: 'left',
  },
});

export default TemperatureAndHumidityCard;
