import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext'; // Import useTheme
import { useTranslation } from 'react-i18next'; // Import useTranslation

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
  name: `Rancho Santa Mónica ${index + 1}`, // Name will also be translated
  coordinates: { latitude: 19.4326 + index * 0.01, longitude: -99.1332 + index * 0.01 },
  image: 'https://via.placeholder.com/50', // Replace with the real URL
}));

const Favorites = () => {
  const { isDarkMode } = useTheme(); // Access global dark mode state
  const { t } = useTranslation(); // Access translation function

  const renderFavoriteItem = ({ item }: { item: Favorite }) => (
    <View style={[styles.card, { backgroundColor: isDarkMode ? '#333' : '#FFF' }]}>
      <View style={[styles.mapPlaceholder, { backgroundColor: isDarkMode ? '#555' : '#033076' }]} />
      <View style={styles.info}>
        <Text style={[styles.name, { color: isDarkMode ? '#FFF' : '#000' }]}>
          {t('favoriteItemName', { name: item.name })}
        </Text>
        <TouchableOpacity>
          <Ionicons name="heart" size={24} color={isDarkMode ? '#FFF' : 'blue'} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#222' : '#f0f0f0' }]}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Ionicons name="heart" size={89} color={isDarkMode ? '#FFF' : '#444444'} />
          <Text style={[styles.headerText, { color: isDarkMode ? '#FFF' : '#444444' }]}>
            {t('favoritesTitle')}
          </Text>
        </View>
      </View>
      <View style={[styles.outerCard, { backgroundColor: isDarkMode ? '#444' : '#C0C0C0' }]}>
        <FlatList
          data={favoritesData}
          renderItem={renderFavoriteItem}
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
  headerContainer: {
    paddingHorizontal: 10,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#FFF',
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
    height: 520,
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

export default Favorites;
