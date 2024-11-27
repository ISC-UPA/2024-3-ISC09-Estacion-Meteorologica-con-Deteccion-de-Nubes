import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext'; // Ajustar ruta según sea necesario
import { useTranslation } from "react-i18next";

const SettingsScreen = () => {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useTheme(); // Estado de modo oscuro del contexto
  const { t, i18n: { changeLanguage, language } } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language);

  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "es" : "en";
    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
  };

  const handleSignOut = () => {
    Alert.alert(
      t('signOutTitle'),
      t('signOutMessage'),
      [
        { text: t('cancel'), style: "cancel" },
        { text: t('signOut'), onPress: () => console.log("Signed out!") },
      ],
      { cancelable: true }
    );
  };

  const settingsOptions = [
    {
      id: '1',
      label: t('darkMode'),
      onPress: toggleDarkMode,
      icon: (
        <Ionicons
          name={isDarkMode ? 'sunny' : 'moon'}
          size={24}
          color={isDarkMode ? '#FFFFFF' : '#000000'}
        />
      ),
    },
    {
      id: '2',
      label: t('language'),
      onPress: handleChangeLanguage,
      icon: (
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: isDarkMode ? '#FFFFFF' : '#000000',
          }}
        >
          {currentLanguage.toUpperCase()}
        </Text>
      ),
    },
    {
      id: '3',
      label: t('signOut'),
      onPress: handleSignOut,
      icon: (
        <Ionicons
          name="log-out-outline"
          size={24}
          color={isDarkMode ? '#FFFFFF' : '#000000'}
        />
      ),
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#f0f0f0' }]}>
      <Stack.Screen options={{ title: '', headerShown: false }} />

      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)/')}>
        <Ionicons
          name="arrow-back"
          size={24}
          color={isDarkMode ? '#3D8AF7' : '#1464F6'}
        />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Ionicons name="settings-outline" size={89} color={isDarkMode ? '#fff' : '#444'} />
        <Text style={[styles.headerText, { color: isDarkMode ? '#fff' : '#444' }]}>{t('settings')}</Text>
      </View>

      <View style={styles.settingsList}>
        {settingsOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.settingsItem}
            onPress={option.onPress}
          >
            <Text style={[styles.label, { color: isDarkMode ? '#fff' : '#333' }]}>{option.label}</Text>
            {option.icon}
          </TouchableOpacity>
        ))}
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
    alignItems: 'center',
    marginVertical: 80,
  },
  headerText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingsList: {
    marginVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 15,
  },
  label: {
    fontSize: 20,
  },
});

export default SettingsScreen;
