import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext'; // Dark mode hook
import { useTranslation } from 'react-i18next'; // Translation hook
import { GET_IA } from '@/api/queries/queryIA';

type AnalysisPhoto = {
  id: string;
  skyphoto_id: { url_photo: string };
  sky_type: string;
  probability_rain: number;
};

const CloudScreen = () => {
  const [dataIA, setDataIA] = useState<AnalysisPhoto[]>([]);
  const { data } = useQuery(GET_IA, { variables: {} });
  const { isDarkMode } = useTheme(); // Dark mode context
  const { t } = useTranslation(); // Translation hook

  useEffect(() => {
    if (data) {
      setDataIA(data.analysisPhotos);
    }
  }, [data]);

  const renderCloudItem = ({ item }: { item: AnalysisPhoto }) => (
    <View style={[styles.card, { backgroundColor: isDarkMode ? '#444' : '#FFFFFF' }]}>
      <Image source={{ uri: item.skyphoto_id.url_photo }} style={styles.image} />
      <View style={[styles.info, { backgroundColor: isDarkMode ? '#333' : 'rgba(3, 48, 118, 0.5)' }]}>
        <Text style={[styles.skyType, { color: isDarkMode ? '#ccc' : '#fff' }]}>{item.sky_type}</Text>
        <Text style={[styles.probability, { color: isDarkMode ? '#ccc' : '#fff' }]}>{item.probability_rain}%</Text>
      </View>
    </View>
  );
  

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#f0f0f0' }]}>
      <View style={styles.headerContainer}>
        <View style={[styles.header, { borderBottomColor: isDarkMode ? '#444' : 'rgba(0, 0, 0, 0.2)' }]}>
          <Ionicons name="cloudy" size={89} color={isDarkMode ? '#fff' : '#444'} />
          <Text style={[styles.headerText, { color: isDarkMode ? '#fff' : '#444' }]}>{t('cloudReading')}</Text>
        </View>
      </View>
      <View style={[styles.outerCard, { backgroundColor: isDarkMode ? '#555' : '#C0C0C0' }]}>
        <FlatList
          data={dataIA}
          renderItem={renderCloudItem}
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
    paddingBottom: 40,
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
    height: 490,
    overflow: 'hidden',
    backgroundColor: '#555', // Outer card color in dark mode
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 5,
    backgroundColor: '#444', // Card color
  },
  image: {
    width: '100%',
    height: 120,
  },
  info: {
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#333', // Darker rectangle color in dark mode
  },
  skyType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  probability: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default CloudScreen;
