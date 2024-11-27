import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

interface AtmosphericPressureCardProps {
  icon: keyof typeof Ionicons.glyphMap;   
  pressure: number | string; 
}

const AtmosphericPressureCard: React.FC<AtmosphericPressureCardProps> = ({ icon, pressure }) => {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
      <Ionicons name={icon} size={60} color="white" style={styles.icon} />
      <View style={styles.row}>
        <MaterialIcons name='compress' size={20} color="white" />
        <Text style={styles.pressure}>{pressure}mb</Text>
      </View>
    </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 15,
    width: 130,
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  icon: {
    marginBottom: 5,
  },
  pressure: {
    fontSize: 16,
    color: 'white',
    marginLeft: 5,
    fontFamily: 'Quicksand_700Bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AtmosphericPressureCard;
