import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const benefitsData = [
  { feature: "2 APP-LAUNCH ADS", free: true, premium: false },
  { feature: "AD AFTER PHOTO", free: true, premium: false },
  { feature: "PREDICT WEATHER AND RAIN FORECAST", free: true, premium: true },
  { feature: "PHOTOGRAPH TAKEN EVERY HOUR", free: true, premium: true },
  { feature: "HOURLY FORECAST FOR THE NEXT FEW DAYS", free: true, premium: true },
];

const GoPremiumScreen = () => {
  const router = useRouter();

  const renderBenefitItem = ({ item }: { item: typeof benefitsData[0] }) => (
    <View style={styles.row}>
      <Text style={styles.featureText}>{item.feature}</Text>
      <Text style={styles.checkmark}>
        {item.free ? <Ionicons name="checkmark" size={20} color="#444444" /> : '—'}
      </Text>
      <Text style={styles.checkmark}>
        {item.premium ? <Ionicons name="checkmark" size={20} color="#444444" /> : '—'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: '', headerShown: false }} />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/')}
      >
        <Ionicons name="arrow-back" size={24} color="#1464F6" />
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Ionicons name="diamond" size={89} color="#444444" />
          <Text style={[styles.headerText, { color: "#444444" }]}>Go Premium</Text>
        </View>
      </View>
      <Text style={styles.introText}>
        Go premium and enjoy many benefits for a small price:
      </Text>
      <View style={styles.outerCard}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerFeature}>WHAT'S INCLUDED</Text>
          <Text style={styles.headerOption}>FREE</Text>
          <Text style={styles.headerOption}>PREMIUM</Text>
        </View>
        <FlatList
          data={benefitsData}
          renderItem={renderBenefitItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {/* Purchase Button */}
      <TouchableOpacity style={styles.purchaseButton}>
        <Text style={styles.purchaseButtonText}>Purchase</Text>
      </TouchableOpacity>
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
  introText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'justify',
    textAlignVertical: 'center',
    marginBottom: 10,
    paddingHorizontal: 15,
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
  outerCard: {
    backgroundColor: '#C0C0C0',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginVertical: 10,
    height: 330,
    overflow: 'hidden',
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
  },
  headerFeature: {
    flex: 3,
    fontWeight: 'bold',
    fontSize: 14,
  },
  headerOption: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  featureText: {
    flex: 3,
    fontSize: 14,
  },
  checkmark: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
    color: '#444444',
  },
  // Style for the Purchase Button
  purchaseButton: {
    backgroundColor: '#3D8AF7',
    paddingVertical: 15,  // Vertical padding
    marginHorizontal: 125,
    marginTop: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  purchaseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GoPremiumScreen;
