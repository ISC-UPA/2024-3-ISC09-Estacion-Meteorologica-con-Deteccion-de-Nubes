import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

interface WeeklyForecastItem {
  day: string; // Ensure this matches keys like "monday", "tuesday", etc.
  icon: string;
  temperature: string | number;
}

interface WeeklyForecastProps {
  weeklyForecast: WeeklyForecastItem[];
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ weeklyForecast }) => {
  const { t } = useTranslation();

  return (
    <Card style={styles.card}>
      <Text style={styles.title}>{t('weeklyForecast')}</Text>
      <View style={styles.divider} />
      {weeklyForecast && weeklyForecast.length > 0 ? (
        weeklyForecast.map((item, index) => (
          <View key={index}>
            <View style={styles.row}>
              <Text style={styles.day}>{t(`days.${item.day.toLowerCase()}`)}</Text>
              <Ionicons name={item.icon} size={30} color="white" style={styles.icon} />
              <Text style={styles.temperature}>{item.temperature}</Text>
            </View>
            {index < weeklyForecast.length - 1 && <View style={styles.secondDivider} />}
          </View>
        ))
      ) : (
        <Text>No weekly forecast data available</Text>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
    height: '58%',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Quicksand_700Bold',
    color: '#ffffff',
    textAlign: 'left',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  day: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    fontFamily: 'Quicksand_700Bold',
  },
  icon: {
    marginHorizontal: 20,
  },
  temperature: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Quicksand_700Bold',
  },
  divider: {
    borderBottomColor: '#cccc',
    borderBottomWidth: 3,
  },
  secondDivider: {
    borderBottomColor: '#cccc',
    borderBottomWidth: 1,
  },
});

export default WeeklyForecast;
