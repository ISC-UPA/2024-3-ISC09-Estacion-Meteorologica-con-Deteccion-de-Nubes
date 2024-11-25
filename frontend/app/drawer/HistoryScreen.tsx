import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext'; // Import useTheme

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
  const { isDarkMode } = useTheme(); // Get the global dark mode state

  const renderHistoryItem = ({ item }: { item: History }) => (
    <View style={[styles.card, { backgroundColor: isDarkMode ? '#333' : '#FFF' }]}>
      <View style={[styles.mapPlaceholder, { backgroundColor: isDarkMode ? '#555' : '#033076' }]} />
      <View style={styles.info}>
        <Text style={[styles.name, { color: isDarkMode ? '#FFF' : '#333' }]}>{item.name}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#222' : '#f0f0f0' }]}>
      <Stack.Screen options={{ title: '', headerShown: false }} />

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/')}
      >
        <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#3D8AF7' : '#1464F6'} />
      </TouchableOpacity>

      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Ionicons name="time-outline" size={89} color={isDarkMode ? '#fff' : '#444'} />
          <Text style={[styles.headerText, { color: isDarkMode ? '#fff' : '#444' }]}>History</Text>
        </View>
      </View>

      {/* History List */}
      <View style={[styles.outerCard, { backgroundColor: isDarkMode ? '#444' : '#C0C0C0' }]}>
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
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  headerContainer: {
    paddingHorizontal: 10,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
    borderBottomWidth: 2, // Adds a line at the bottom
    borderBottomColor: '#FFF', // Changed to white
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
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginVertical: 10,
    height: 570,
    overflow: 'hidden',
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 5,
  },
  mapPlaceholder: {
    width: '100%',
    height: 120,
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
