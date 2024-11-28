import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, ImageBackground } from 'react-native';
import TemperatureAndHumidityCard from '../../components/TemperatureAndHumidityCard';
import AtmosphericPressureCard from '../../components/AtmosphericPressureCard';
import { format, getHours } from 'date-fns';
import HourlyForecast from '../../components/HourlyForecast';
import WeeklyForecast from '../../components/WeeklyForecast';
import { useQuery } from '@apollo/client';
import { GET_Wheater } from '@/api/queries/queryWheater';
import { GET_PHOTO } from '@/api/queries/queryPhoto';
import { GET_PREDICTION } from '@/api/queries/queryPrediction';


const getBackgroundImage = (): any => {
  const currentHour = getHours(new Date());

  if (currentHour >= 6 && currentHour < 18) {
    return require('../../assets/images/sunny.jpg'); 
  } else {
    return require('../../assets/images/night.jpg'); 
  }
};

export default function WeatherScreen() {
  const backgroundImage = getBackgroundImage();
  const [dateinicio, setDateInico] = useState();
  const [datefinal, setDateFinal] = useState();
  const [ idPhoto, setIdPhoto] = useState();
  const [temperature, setTemperature] = useState(0);
  const [ humidity, setHumidity] = useState(0);
  const [ pressure, setPressure] = useState(0);
  const [ hourlyForecastData, setHourlyForecastData] = useState();
  const [ weeklyForecastData, setWeeklyForescastData] = useState();


  useEffect(() => {
    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0)); 
    const startOfDayISOString = startOfDay.toISOString(); 
    
    const endOfDay = new Date(now.setHours(23, 59, 59, 999)); 
    const endOfDayISOString = endOfDay.toISOString(); 
    
    setDateInico(startOfDayISOString); 
    setDateFinal(endOfDayISOString); 
  }, []);

  const { data: weatherData, loading: queryLoading, error: queryError } = useQuery(GET_Wheater, {
    variables: {
      where: {
        reading_date: {
          lt: datefinal,
          gt: dateinicio,
        }
      }
    },
    skip: !dateinicio || !datefinal,
  });  

  useEffect(() => {
    if (weatherData && weatherData.weatheReadings) {
      const weatherRecords = weatherData.weatheReadings;
      const now = new Date();
  
      const closestRecord = weatherRecords.reduce((prev, curr) => {
        const prevDiff = Math.abs(new Date(prev.reading_date).getTime() - now.getTime());
        const currDiff = Math.abs(new Date(curr.reading_date).getTime() - now.getTime());
        return currDiff < prevDiff ? curr : prev;
      });
  
      setTemperature(closestRecord.temperature);
      setHumidity(closestRecord.humidity);
      setPressure(closestRecord.atmospheric_pressure);
    }
  }, [weatherData]);
  
  const { data: photoData, loading: queryLoading1, error: queryError1 } = useQuery(GET_PHOTO, {
    variables: {
      where: {
        date_photo: {
          lt: datefinal,
          gt: dateinicio,
        }
      }
    },
    skip: !dateinicio || !datefinal,
  });

  useEffect(() => {
    if (photoData && photoData.photoSkies) {
      const PhotoRecords = photoData.photoSkies;
      const now = new Date();
  
      const closestRecord = PhotoRecords.reduce((prev, curr) => {
        const prevDiff = Math.abs(new Date(prev.reading_date).getTime() - now.getTime());
        const currDiff = Math.abs(new Date(curr.reading_date).getTime() - now.getTime());
        return currDiff < prevDiff ? curr : prev;
      });
      setIdPhoto(closestRecord.id);
    }
  }, [photoData]);

  useEffect(() => {
    console.log(idPhoto);
  }, [idPhoto]);

  const { data: predictionData } = useQuery(GET_PREDICTION, {
    variables: {
      where: {
        skyphoto_id: {
          id: {
            equals: idPhoto,
          },
        },
      },
    },
    skip: !idPhoto,
  });

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    const hours = date.getHours();
    const period = hours >= 12 ? 'P.M' : 'A.M';
    const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHour}${period}`;
  };
  
  const getIcon = (temperature, hours) => {
    if (hours >= 19 || hours < 7) {
      return 'cloudy-night-sharp';
    }
    return temperature >= 25 ? 'sunny' : 'cloudy-sharp';
  };
  const transformForecastData = (rawData) => {
    return rawData.slice(0, 5).map(entry => {
      const dateStr = entry['Fecha y Hora'];
      const temperature = parseFloat(entry.Temperatura);
      const date = new Date(dateStr);
      const hours = date.getHours();
      const time = formatTime(dateStr);
      const icon = getIcon(temperature, hours);
      
      return { time, icon, temperature };
    });
  };

  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[date.getUTCDay()];
  };

  const getIcon_1 = (maxTemperature) => {
    return maxTemperature >= 25 ? "sunny" : "cloudy-sharp";
 };

  const transformWeeklyForecastData = (rawData) => {
    if (!Array.isArray(rawData)) return []; 
    return rawData.map((entry, index) => {
        const dateStr = entry['Fecha'];
        const maxTemperature = parseFloat(entry['Temperatura Maxima']);
        let dayName;

        dayName = getDayName(dateStr);
        const icon = getIcon_1(maxTemperature);

        return {
            day: dayName,
            icon: icon,
            temperature: `${maxTemperature.toFixed(1)}°`
        };
    });
  }; 
  useEffect(() => {
    if (predictionData) {
      const predictionPerDayString = predictionData.aPIPredicions[0].prediction_per_day;
      const predictionPerDayJSON = JSON.parse(predictionPerDayString);
      // console.log(predictionPerDayJSON);
      setWeeklyForescastData(transformWeeklyForecastData(predictionPerDayJSON));
      const predictionPerHourString = predictionData.aPIPredicions[0].prediction_per_hour;
      const predictionPerHourJSON = JSON.parse(predictionPerHourString);
      // console.log(predictionPerHourJSON);
      if (predictionPerDayJSON){
        setHourlyForecastData(transformForecastData(predictionPerHourJSON));
        // console.log(hourlyForecastData);
      }
    }
    
  }, [predictionData]);

  
  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.firstDivider} />
        <View style={styles.topRow}>
          <AtmosphericPressureCard icon="sunny" pressure={pressure} />
          <TemperatureAndHumidityCard
            temperature={temperature}
            humidity={humidity}
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