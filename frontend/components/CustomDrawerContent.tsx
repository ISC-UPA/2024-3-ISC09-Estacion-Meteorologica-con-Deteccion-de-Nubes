import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React, { useEffect, useRef } from 'react';
import { Animated, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
  navigation: any; // Type the navigation prop accordingly
}

export default function CustomDrawerContent(props: SideMenuProps) {
  const slideAnim = useRef(new Animated.Value(-300)).current; // Initial position off-screen to the left

  useEffect(() => {
    if (props.visible) {
      Animated.timing(slideAnim, {
        toValue: 0, // Slide to the visible position
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300, // Slide out of view
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [props.visible]);

  return (
    <Modal
      visible={props.visible}
      transparent={true}
      animationType="none" // Disable default animations
      onRequestClose={props.onClose}
    >
      <TouchableOpacity style={styles.overlay} onPress={props.onClose}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ translateX: slideAnim }] }, // Apply slide animation
          ]}
        >
          <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
            {/* Profile Section */}
            <View style={styles.profileSection}>
              <Image
                source={{ uri: 'https://via.placeholder.com/80' }} // Placeholder profile image
                style={styles.profileImage}
              />
              <Text style={styles.profileName}>Test Testerson</Text>
              <Text style={styles.profileEmail}>correo@correo.com</Text>
            </View>

            {/* Navigation Items */}
            <View style={styles.menuItems}>
              <DrawerItem
                label="Weather"
                icon={({ color, size }) => <Ionicons name="cloud-outline" color={color} size={size} />}
                onPress={() => {
                  props.navigation.navigate('Weather');
                  props.onClose(); // Close modal after navigation
                }}
              />
              <DrawerItem
                label="History"
                icon={({ color, size }) => <Ionicons name="time-outline" color={color} size={size} />}
                onPress={() => {
                  props.navigation.navigate('History');
                  props.onClose(); // Close modal after navigation
                }}
              />
              <DrawerItem
                label="My locations"
                icon={({ color, size }) => <Ionicons name="location-outline" color={color} size={size} />}
                onPress={() => {
                  props.navigation.navigate('MyLocations');
                  props.onClose(); // Close modal after navigation
                }}
              />
              <DrawerItem
                label="Favorites"
                icon={({ color, size }) => <Ionicons name="heart-outline" color={color} size={size} />}
                onPress={() => {
                  props.navigation.navigate('Favorites');
                  props.onClose(); // Close modal after navigation
                }}
              />
              <DrawerItem
                label="Go premium"
                icon={({ color, size }) => <Ionicons name="diamond-outline" color={color} size={size} />}
                onPress={() => {
                  props.navigation.navigate('Premium');
                  props.onClose(); // Close modal after navigation
                }}
              />
            </View>

            {/* Settings */}
            <View style={styles.footer}>
              <DrawerItem
                label="Settings"
                icon={({ color, size }) => <Ionicons name="settings-outline" color={color} size={size} />}
                onPress={() => {
                  props.navigation.navigate('Settings');
                  props.onClose(); // Close modal after navigation
                }}
              />
            </View>
          </DrawerContentScrollView>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 300,
    height: '100%',
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  profileSection: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 14,
    color: '#888',
  },
  menuItems: {
    paddingVertical: 10,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 10,
  },
});
