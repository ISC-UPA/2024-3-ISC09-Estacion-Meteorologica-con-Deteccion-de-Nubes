import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALLPHOTO } from '@/api/queries/querryAllPhoto';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

type Photo = {
    id: string;
    date_photo: string;
    latitude: number;
    longitude: number;
    url_photo: string;
};
const HistoryScreen = () => {
  const router = useRouter();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const { data } = useQuery(GET_ALLPHOTO);

  useEffect(() => {
    if (data) {
      console.log(data);
      setPhotos(data.photoSkies);
    }
  }, [data]);
  
  const renderHistoryItem = ({ item }: { item: Photo }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.url_photo }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.date}>Date: {new Date(item.date_photo).toLocaleString()}</Text>
        <Text style={styles.coordinates}>Coordinates: {item.latitude}, {item.longitude}</Text>
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
          data={photos}
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
        backgroundColor: '#C0C0C0',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginVertical: 10,
        height: 570,
        overflow: 'hidden',
      },
      card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 5,
      },
      image: {
        width: '100%',
        height: 120,
      },
      info: {
        padding: 10,
      },
      name: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      date: {
        fontSize: 14,
        color: '#666',
      },
      coordinates: {
        fontSize: 14,
        color: '#666',
      },
      prediction: {
        fontSize: 14,
        color: '#666',
      },
});

export default HistoryScreen;
