import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext'; // Adjust path as needed

const SettingsScreen = () => {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useTheme(); // Access dark mode state from context

  // Handlers
  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Sign Out", onPress: () => console.log("Signed out!") },
      ],
      { cancelable: true }
    );
  };

  const settingsOptions = [
    {
      id: '1',
      label: 'Light/Dark Mode',
      component: (
        <TouchableOpacity onPress={toggleDarkMode} style={styles.darkModeButton}>
          <Ionicons
            name={isDarkMode ? 'sunny' : 'moon'} // Swap the icons based on dark mode
            size={24}
            color={isDarkMode ? '#FFFFFF' : '#000000'} // White for sun in dark mode, black for moon in light mode
          />
        </TouchableOpacity>
      ),
    },
    {
      id: '2',
      label: 'Language',
      component: (
        <TouchableOpacity style={styles.languageButton}>
          <Ionicons
            name="language-outline" // Language icon
            size={24}
            color={isDarkMode ? '#FFFFFF' : '#000000'} // Change color based on dark mode
          />
        </TouchableOpacity>
      ),
    },
    {
      id: '3',
      label: 'Sign Out',
      component: (
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
          <Ionicons
            name="log-out-outline" // Sign Out icon
            size={24}
            color={isDarkMode ? '#FFFFFF' : '#000000'} // White in dark mode, black in light mode
          />
        </TouchableOpacity>
      ),
    },
  ];

  const renderSettingsOption = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.settingsItem}
      onPress={item.onPress ? item.onPress : undefined}
      activeOpacity={item.onPress ? 0.7 : 1}
    >
      <Text style={[styles.label, { color: isDarkMode ? '#fff' : '#333' }]}>{item.label}</Text>
      {item.component}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#f0f0f0' }]}>
      {/* Disable Header */}
      <Stack.Screen options={{ title: '', headerShown: false }} />

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/')}
      >
        <Ionicons 
          name="arrow-back" 
          size={24} 
          color={isDarkMode ? '#3D8AF7' : '#1464F6'} // Change color based on dark mode
        />
      </TouchableOpacity>

      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Ionicons name="settings-outline" size={89} color={isDarkMode ? '#fff' : '#444'} />
        <Text style={[styles.headerText, { color: isDarkMode ? '#fff' : '#444' }]}>Settings</Text>
      </View>

      {/* Settings List */}
      <View style={styles.settingsList}>
        {settingsOptions.map((option) => (
          <View key={option.id}>{renderSettingsOption({ item: option })}</View>
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
    paddingVertical: 10,
  },
  label: {
    fontSize: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
  },
  darkModeButton: {
    padding: 5,
    borderRadius: 50,
    backgroundColor: 'transparent', // Remove the background to avoid the white circle
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutButton: {
    padding: 5,
    borderRadius: 50,
    backgroundColor: 'transparent', // Remove the background for a clean look
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageButton: {
    padding: 5,
    borderRadius: 50,
    backgroundColor: 'transparent', // Remove the background for a clean look
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SettingsScreen;
