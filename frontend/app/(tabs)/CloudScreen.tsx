import { GET_IA } from '@/api/queries/queryIA';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';

const CloudScreen = () => {
  const [dataIA, setDataIA] = useState();
  const { data: data_IA } = useQuery(GET_IA, {
    variables: {},
   });
  
  useEffect(()=>{
    if (data_IA) {
      console.log(data_IA);
      console.log(data_IA.analysisPhotos);
      setDataIA(data_IA.analysisPhotos);
    }
  }, [data_IA])

  const data = [
    {
      id: '1',
      imageUrl: 'https://example.com/image1.jpg',
      cloudType: 'Nublado',
      probability: 80,
    },
    {
      id: '2',
      imageUrl: 'https://example.com/image2.jpg',
      cloudType: 'Despejado',
      probability: 10,
    },
    {
      id: '3',
      imageUrl: 'https://example.com/image3.jpg',
      cloudType: 'Lluvia ligera',
      probability: 50,
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={dataIA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <View style={styles.placeholder}>
              <Image
                source={{ uri: item.skyphoto_id.url_photo}}
                style={styles.image}
              />
            </View>
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.cloudType}>{item.sky_type}</Text>
                <Text style={styles.probability}>{item.probability_rain}%</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20, 
    paddingVertical: 50,
  },
  cardContainer: {
    width: '100%',
    marginBottom: 20,
  },
  placeholder: {
    width: '100%',
    height: 250, 
    backgroundColor: '#033076',
    borderRadius: 20,
    overflow: 'hidden', 
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', 
  },
  card: {
    width: '100%',
    height: 60,
    borderRadius: 20,
    backgroundColor: 'rgba(3, 48, 118, 0.5)', 
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  row: {
    flexDirection: 'row', 
    justifyContent: 'space-around',  
    width: '100%', 
  },
  cloudType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white', 
  },
  probability: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white', 
  },
});

export default CloudScreen;
