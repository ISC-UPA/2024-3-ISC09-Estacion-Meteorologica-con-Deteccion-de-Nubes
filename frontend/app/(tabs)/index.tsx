import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Text } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import TemperatureAndHumidityCard from '../../components/TemperatureAndHumidityCard';
import AtmosphericPressureCard from '../../components/AtmosphericPressureCard';
import HourlyForecast from '../../components/HourlyForecast';
import WeeklyForecast from '../../components/WeeklyForecast';


const hourlyForecastData = [
  { time: 'Now', icon: 'weather-sunny', temperature: 25 },
  { time: '4PM', icon: 'weather-sunny', temperature: 25 },
  { time: '5PM', icon: 'weather-sunny', temperature: 24 },
  { time: '6PM', icon: 'weather-sunny', temperature: 23 },
  { time: '7PM', icon: 'weather-night', temperature: 22 },
];

const weeklyForecastData = [
  { day: 'Today', icon: 'weather-sunny', temperature: 21 },
  { day: 'Tuesday', icon: 'weather-sunny', temperature: 21 },
  { day: 'Wednesday', icon: 'weather-sunny', temperature: 21 },
  { day: 'Thursday', icon: 'weather-sunny', temperature: 21 },
  { day: 'Friday', icon: 'weather-cloudy', temperature: 21 }, 
  { day: 'Saturday', icon: 'weather-cloudy', temperature: 21 },
  { day: 'Sunday', icon: 'weather-cloudy', temperature: 21 },
];

export default function WeatherScreen() {
  return (
    <ImageBackground
      source={require('../../assets/images/sunny.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.firstDivider} />
        <View style={styles.topRow}>
          <AtmosphericPressureCard icon="sunny" pressure={1020.0} />
          <TemperatureAndHumidityCard
            temperature={25}
            humidity={10}
            location="Cerro del Muerto"
            region="Aguascalientes"
          />
        </View>
          <View style={styles.divider} />
          <HourlyForecast forecast={hourlyForecastData} />
          <WeeklyForecast weeklyForecast={weeklyForecastData} />
      </View>
    </ImageBackground>

  );
  
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 55,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  divider: {
    borderBottomColor: '#cccc',
    borderBottomWidth: 3.5,
    marginBottom: 5,
    marginHorizontal: 5,
    borderRadius: 40,  
  },
  firstDivider: {
    borderBottomColor: '#cccc',
    borderBottomWidth: 3,
    marginBottom: 15,
    marginHorizontal: 5,
    borderRadius: 40,  
  },
});


