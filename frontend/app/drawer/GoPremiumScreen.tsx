import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

const benefitsData = [
  { feature: "appLaunchAds", free: true, premium: false },
  { feature: "adAfterPhoto", free: true, premium: false },
  { feature: "predictWeather", free: true, premium: true },
  { feature: "photoHourly", free: true, premium: true },
  { feature: "hourlyForecast", free: true, premium: true },
];

const GoPremiumScreen = () => {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();

  const renderBenefitItem = ({ item }: { item: typeof benefitsData[0] }) => (
    <View style={[styles.row, { backgroundColor: isDarkMode ? '#444' : '#C0C0C0' }]}>
      <Text style={[styles.featureText, { color: isDarkMode ? '#FFF' : '#333' }]}>
        {t(`benefits.${item.feature}`)}
      </Text>
      <Text style={[styles.checkmark, { color: isDarkMode ? '#FFF' : '#333' }]}>
        {item.free ? <Ionicons name="checkmark" size={20} color={isDarkMode ? '#FFF' : '#333'} /> : '—'}
      </Text>
      <Text style={[styles.checkmark, { color: isDarkMode ? '#FFF' : '#333' }]}>
        {item.premium ? <Ionicons name="checkmark" size={20} color={isDarkMode ? '#FFF' : '#333'} /> : '—'}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#222' : '#f0f0f0' }]}>
      <Stack.Screen options={{ title: '', headerShown: false }} />
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
        <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#3D8AF7' : '#1464F6'} />
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Ionicons name="diamond" size={89} color={isDarkMode ? '#fff' : '#444'} />
          <Text style={[styles.headerText, { color: isDarkMode ? '#fff' : '#444' }]}>
            {t('goPremiumTitle')}
          </Text>
        </View>
      </View>
      <Text style={[styles.introText, { color: isDarkMode ? '#fff' : '#333' }]}>
        {t('goPremiumIntro')}
      </Text>
      <View style={[styles.outerCard, { backgroundColor: isDarkMode ? '#444' : '#C0C0C0' }]}>
        <View style={[styles.tableHeader, { backgroundColor: isDarkMode ? '#444' : '#C0C0C0' }]}>
          <Text style={[styles.headerFeature, { color: isDarkMode ? '#FFF' : '#333' }]}>
            {t('whatsIncluded')}
          </Text>
          <Text style={[styles.headerOption, { color: isDarkMode ? '#FFF' : '#333' }]}>{t('free')}</Text>
          <Text style={[styles.headerOption, { color: isDarkMode ? '#FFF' : '#333' }]}>{t('premium')}</Text>
        </View>
        <FlatList
          data={benefitsData}
          renderItem={renderBenefitItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <TouchableOpacity style={styles.purchaseButton}>
        <Text style={styles.purchaseButtonText}>{t('purchase')}</Text>
      </TouchableOpacity>
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
  introText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'justify',
    marginBottom: 10,
    paddingHorizontal: 15,
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
  outerCard: {
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginVertical: 10,
    height: 350,
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
  },
  // Style for the Purchase Button
  purchaseButton: {
    backgroundColor: '#3D8AF7',
    paddingVertical: 15,
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
