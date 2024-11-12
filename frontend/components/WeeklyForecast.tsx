import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, IconButton } from 'react-native-paper';

interface WeeklyForecastItem {
  day: string;
  icon: string; 
  temperature: string | number;
}

interface WeeklyForecastProps {
  weeklyForecast: WeeklyForecastItem[];
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ weeklyForecast }) => {
  return (
    <Card style={styles.card}>
      <Text style={styles.title}>Weekly forecast</Text>
      {weeklyForecast.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.day}>{item.day}</Text>
          <IconButton icon={item.icon} size={20} style={styles.icon} />
          <Text style={styles.temperature}>{item.temperature}</Text>
        </View>
      ))}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#e0f7fa',
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  day: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  icon: {
    marginHorizontal: 10,
  },
  temperature: {
    fontSize: 16,
    color: '#333',
  },
});

export default WeeklyForecast;
