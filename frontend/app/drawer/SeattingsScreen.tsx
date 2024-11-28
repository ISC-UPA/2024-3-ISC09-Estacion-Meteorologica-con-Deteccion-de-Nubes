import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext'; // Ajustar ruta según sea necesario
import { useTranslation } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const SettingsScreen = () => {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useTheme(); // Estado de modo oscuro del contexto
  const { t, i18n: { changeLanguage, language } } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [showSignOutModal, setShowSignOutModal] = useState(false); // Estado para el modal de cierre de sesión

  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "es" : "en";
    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
  };

  const handleSignOut = () => {
    setShowSignOutModal(true); // Mostrar el modal de confirmación de cierre de sesión
  };

  const confirmSignOut = async () => {
    try {
      // Eliminar el token de usuario de AsyncStorage
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userInfo'); // También eliminamos la información del usuario
      console.log('Token y datos de usuario eliminados');

      // Redirigir a la pantalla de login (index)
      router.push('/'); // O usa 'navigation.navigate("Login")' si estás usando React Navigation
    } catch (error) {
      console.error('Error al eliminar el token de usuario:', error);
    }

    setShowSignOutModal(false); // Cerrar el modal después de hacer logout
  };

  const cancelSignOut = () => {
    setShowSignOutModal(false); // Cerrar el modal sin hacer logout
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

      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)/home')}>
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

      {/* Modal de confirmación de cierre de sesión */}
      <Modal
        visible={showSignOutModal}
        transparent={true}
        animationType="fade"
        onRequestClose={cancelSignOut}
      >
        <View style={[styles.modalOverlay, { backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)' }]}>
          <View style={[styles.modalContainer, { backgroundColor: isDarkMode ? '#444' : 'white' }]}>
            <Text style={[styles.modalText, { color: isDarkMode ? '#fff' : '#333' }]}>{t('signOutMessage')}</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: 'red' }]}
                onPress={confirmSignOut}
              >
                <Text style={[styles.modalButtonText, { textAlign: 'center' }]}>{t('signOut')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#3D8AF7' }]}
                onPress={cancelSignOut}
              >
                <Text style={styles.modalButtonText}>{t('cancel')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Default for light mode
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white', // Default for light mode
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333', // Default for light mode
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SettingsScreen;
