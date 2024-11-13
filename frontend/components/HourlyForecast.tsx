import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';


interface HourlyForecastProps {
  forecast: { time: string; icon: string; temperature: number | string }[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ forecast }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <FlatList
          data={forecast}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.time}
          renderItem={({ item }) => (
            <View style={styles.forecastItem}>
              <Text style={styles.time}>{item.time}</Text>
              <MaterialCommunityIcons icon={`"${item.icon}"`} size={30} color="white" />
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
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  forecastItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  time: {
    fontSize: 14,
    color: 'white',
    marginBottom: 5,
  },
  temperature: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
    fontWeight: 'bold', 
  },
});

export default HourlyForecast;
