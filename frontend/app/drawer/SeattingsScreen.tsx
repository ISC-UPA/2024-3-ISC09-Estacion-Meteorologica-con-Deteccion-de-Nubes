import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function SeattingsScreen()  {

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

  return (
    <View style={styles.container}>
      {/* Icono central */}
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>⚙️</Text>
      </View>
      {/* Configuración */}
      <View style={styles.settingsItem}>
        <Text style={styles.label}>Light/Dark Mode</Text>
        <Switch
    
        />
      </View>
      <View style={styles.settingsItem}>
        <Text style={styles.label}>Language</Text>
        
      </View>
      <TouchableOpacity style={styles.settingsItem} onPress={handleSignOut}>
        <Text style={styles.label}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  icon: {
    fontSize: 80,
    color: 'gray',
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  label: {
    fontSize: 18,
    color: '#333',
  },
  picker: {
    height: 40,
    width: 150,
  },
});


