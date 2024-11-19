import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { useFonts, Quicksand_700Bold } from '@expo-google-fonts/quicksand';
import { Ionicons } from '@expo/vector-icons';


interface HourlyForecastProps {
  forecast: { time: string; icon: string; temperature: number | string }[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ forecast }) => {
  const [fontsLoaded] = useFonts({
    Quicksand_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; 
  }

  return (
    <Card style={styles.card}>
      <Card.Content>
        <FlatList
          data={forecast}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.time}
          renderItem={({ item }) => (
            <View style={styles.forecastItem}>
              <Text style={styles.time}>{item.time}</Text>
              <Ionicons name={item.icon} size={30} color="white" style={styles.icon} />
              <Text style={styles.temperature}>{item.temperature}°</Text>
            </View>
          )}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginVertical: 5,
    borderRadius: 15,
    paddingVertical: 2,
    paddingHorizontal: 2,
    height: 100,
  },
  forecastItem: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 18, 
    marginBottom: 0,
  },
  time: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Quicksand_700Bold',
    marginBottom: 0, 
  },
  icon: {
    marginBottom: 5, 
  },
  temperature: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Quicksand_700Bold',
    marginTop: 0,
  },
});

export default HourlyForecast;
