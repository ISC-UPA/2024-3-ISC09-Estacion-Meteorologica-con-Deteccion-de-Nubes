import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Define the type of data
type History = {
  id: string;
  name: string;
  coordinates: { latitude: number; longitude: number };
  image: string;
};

// Example data
const historyData: History[] = Array.from({ length: 10 }, (_, index) => ({
  id: `${index + 1}`,
  name: `Rancho Santa Mónica ${index + 1}`,
  coordinates: { latitude: 19.4326 + index * 0.01, longitude: -99.1332 + index * 0.01 },
  image: 'https://via.placeholder.com/50', // Replace with the real URL
}));

const HistoryScreen = () => {
  const router = useRouter();

  const renderHistoryItem = ({ item }: { item: History }) => (
    <View style={styles.card}>
      <View style={styles.mapPlaceholder} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: '', headerShown: false }} />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/(tabs)/')}
      >
        <Ionicons name="arrow-back" size={24} color="#1464F6" />
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Ionicons name="time-outline" size={89} color="#444444" />
          <Text style={[styles.headerText, { color: "#444444" }]}>History</Text>
        </View>
      </View>
      <View style={styles.outerCard}>
        <FlatList
          data={historyData}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40, // Adjust this to fit your design
    left: 20, // Adjust this to fit your design
    zIndex: 10, // Ensures the button is above other elements
  },
  headerContainer: {
    paddingHorizontal: 10,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    paddingBottom: 40,
    marginBottom: 1,
    marginTop: 80,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  list: {
    paddingHorizontal: 10,
  },
  outerCard: {
    backgroundColor: '#C0C0C0', // Larger card background
    borderRadius: 15, // Rounded corners for the larger card
    paddingVertical: 10, // Padding inside the larger card (top and bottom)
    paddingHorizontal: 5, // Reduces padding on the left and right sides
    marginVertical: 10, // Spacing between the larger card and others
    height: 570, // Constrain the height to make it scrollable
    overflow: 'hidden',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 5,
  },
  mapPlaceholder: {
    width: '100%',
    height: 120,
    backgroundColor: '#033076',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HistoryScreen;
