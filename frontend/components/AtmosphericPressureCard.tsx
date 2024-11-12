import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface AtmosphericPressureCardProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;  
  pressure: number | string; 
}

const AtmosphericPressureCard: React.FC<AtmosphericPressureCardProps> = ({ icon, pressure }) => {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <MaterialCommunityIcons name={icon} size={36} color="white" style={styles.icon} />
        <Text style={styles.pressure}>{pressure}mb</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 15,
    width: 110,
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  pressure: {
    fontSize: 16,
    color: 'white',
  },
});

export default AtmosphericPressureCard;
