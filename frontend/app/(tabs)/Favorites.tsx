import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Define el tipo de los datos
type Favorite = {
  id: string;
  name: string;
  coordinates: { latitude: number; longitude: number };
  image: string;
};

// Datos de ejemplo
const favoritesData: Favorite[] = [
  {
    id: '1',
    name: 'Rancho Santa Mónica',
    coordinates: { latitude: 19.4326, longitude: -99.1332 },
    image: 'https://via.placeholder.com/50', // Reemplázalo con la URL real
  },
  {
    id: '2',
    name: 'Rancho Santa Mónica',
    coordinates: { latitude: 19.4426, longitude: -99.1532 },
    image: 'https://via.placeholder.com/50', // Reemplázalo con la URL real
  },
];

const Favorites = () => {
  const renderFavoriteItem = ({ item }: { item: Favorite }) => (
    <View style={styles.card}> {/* text inner card */}
      <View style={styles.mapPlaceholder} /> {/* Map placeholder */}
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <TouchableOpacity>
          <Ionicons name="heart" size={24} color="blue" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Ionicons name="heart" size={89} color="#444444" />
          <Text style={[styles.headerText, { color: "#444444" }]}>Favorites</Text>
        </View>
      </View>
      {/* Outer card encapsulating the whole list */}
      <View style={styles.outerCard}> 
        <FlatList
          data={favoritesData}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Background color for the screen
    paddingHorizontal: 20, // Padding for the entire container
  },
  headerContainer: {
    paddingHorizontal: 10, // Shortens the line on the sides
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
    borderBottomWidth: 2, // Adds a line at the bottom
    borderBottomColor: 'rgba(0, 0, 0, 0.2)', // Gray color with opacity
    paddingBottom: 40, // Increases space between the line and the text
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
    backgroundColor: '#D6D6D6', // Larger card background
    borderRadius: 15, // Rounded corners for the larger card
    paddingVertical: 10, // Padding inside the larger card (top and bottom)
    marginVertical: 10, // Spacing between the larger card and others
  },
  card: {
    backgroundColor: '#FFFFFF', // Inner card (red)
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 5, // Space between inner cards
  },
  mapPlaceholder: {
    width: '100%',
    height: 120, // Smaller placeholder for map
    backgroundColor: '#033076', // Gray placeholder for map
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
