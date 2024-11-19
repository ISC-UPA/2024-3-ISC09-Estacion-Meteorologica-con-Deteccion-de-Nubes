import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Text } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import TemperatureAndHumidityCard from '../../components/TemperatureAndHumidityCard';
import AtmosphericPressureCard from '../../components/AtmosphericPressureCard';
import HourlyForecast from '../../components/HourlyForecast';
import WeeklyForecast from '../../components/WeeklyForecast';


const hourlyForecastData = [
  { time: 'Now', icon: "sunny", temperature: 25 },
  { time: '4P.M', icon: "sunny", temperature: 25 },
  { time: '5P.M', icon: "sunny", temperature: 24 },
  { time: '6P.M', icon: "sunny", temperature: 23 },
  { time: '7P.M', icon: "cloudy-night-sharp", temperature: 22 },
];

const weeklyForecastData = [
  { day: 'Today', icon: "sunny", temperature: "20°" },
  { day: 'Tuesday', icon: "sunny", temperature: "20°" },
  { day: 'Wednesday', icon: "sunny", temperature: "20°" },
  { day: 'Thursday', icon: "sunny", temperature: "20°" },
  { day: 'Friday', icon: "cloudy-sharp", temperature: "20°" }, 
  { day: 'Saturday', icon: "cloudy-sharp", temperature: "20°" },
  { day: 'Sunday', icon: "cloudy-sharp", temperature: "20°" },
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
    marginBottom: 10,
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
    marginBottom: 10,
    marginHorizontal: 5,
    borderRadius: 40,  
  },
});


