import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext'; // Import useTheme

// Define the type of data
type Favorite = {
  id: string;
  name: string;
  coordinates: { latitude: number; longitude: number };
  image: string;
};

// Example data
const favoritesData: Favorite[] = Array.from({ length: 10 }, (_, index) => ({
  id: `${index + 1}`,
  name: `Rancho Santa Mónica ${index + 1}`,
  coordinates: { latitude: 19.4326 + index * 0.01, longitude: -99.1332 + index * 0.01 },
  image: 'https://via.placeholder.com/50', // Replace with the real URL
}));

const Favorites = () => {
  const { isDarkMode } = useTheme(); // Access global dark mode state

  const renderFavoriteItem = ({ item }: { item: Favorite }) => (
    <View style={[styles.card, { backgroundColor: isDarkMode ? '#333' : '#FFF' }]}> {/* Adjust card background */}
      <View style={[styles.mapPlaceholder, { backgroundColor: isDarkMode ? '#555' : '#033076' }]} /> {/* Adjust map placeholder color */}
      <View style={styles.info}>
        <Text style={[styles.name, { color: isDarkMode ? '#FFF' : '#000' }]}>{item.name}</Text> {/* Adjust text color */}
        <TouchableOpacity>
          <Ionicons name="heart" size={24} color={isDarkMode ? '#FFF' : 'blue'} /> {/* Adjust icon color */}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#222' : '#f0f0f0' }]}> {/* Adjust screen background */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Ionicons name="heart" size={89} color={isDarkMode ? '#FFF' : '#444444'} /> {/* Adjust header icon color */}
          <Text style={[styles.headerText, { color: isDarkMode ? '#FFF' : '#444444' }]}>Favorites</Text> {/* Adjust header text color */}
        </View>
      </View>
      <View style={[styles.outerCard, { backgroundColor: isDarkMode ? '#444' : '#C0C0C0' }]}> {/* Adjust outer card background */}
        <FlatList
          data={favoritesData}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20, // Padding for the entire container
  },
  headerContainer: {
    paddingHorizontal: 10, // Shortens the line on the sides
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
    marginTop: 10, // Adds space between the icon and the text
  },
  list: {
    paddingHorizontal: 10,
  },
  outerCard: {
    borderRadius: 15, // Rounded corners for the larger card
    paddingVertical: 10, // Padding inside the larger card (top and bottom)
    paddingHorizontal: 5, // Reduces padding on the left and right sides
    marginVertical: 10, // Spacing between the larger card and others
    height: 520, // Constrain the height to make it scrollable
    overflow: 'hidden',
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 5, // Space between inner cards
  },
  mapPlaceholder: {
    width: '100%',
    height: 120, // Placeholder height
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

export default Favorites;
