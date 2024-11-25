import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext'; // Import useTheme

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
  navigation: any; 
}

export default function CustomDrawerContent(props: SideMenuProps) {
  const slideAnim = useRef(new Animated.Value(-300)).current; 
  const overlayAnim = useRef(new Animated.Value(0)).current; // Separate animation for the overlay
  const navigation = useNavigation();
  const { isDarkMode } = useTheme(); // Access global dark mode state

  // Function to handle the closing animation
  const handleClose = useCallback(() => {
    // First animate the slide out of the drawer
    Animated.timing(slideAnim, {
      toValue: -300, // Move to the left (off-screen)
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // After sliding out, close the modal
      props.onClose();
    });

    // Optionally fade the overlay (opacity stays constant while the slide animation runs)
    Animated.timing(overlayAnim, {
      toValue: 0, // Fade out the overlay
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [slideAnim, overlayAnim, props]);

  useEffect(() => {
    if (props.visible) {
      // Slide the drawer in
      Animated.timing(slideAnim, {
        toValue: 0, // Slide in the drawer
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Fade in the overlay when the drawer becomes visible
      Animated.timing(overlayAnim, {
        toValue: 0.5, // Set overlay opacity to 50%
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      handleClose(); // Close the drawer if not visible
    }
  }, [props.visible, handleClose]);

  const renderDrawerItem = (label: string, iconName: string, navigateTo: string, isSettings: boolean = false) => (
    <TouchableOpacity
      style={[
        styles.drawerItem,
        {
          backgroundColor: isDarkMode ? '#222' : '#FFF', // Set background color of each item to match the global background
        },
      ]}
      onPress={() => {
        if (navigateTo === 'drawer/HistoryScreen') {
          // Disable the header when navigating to HistoryScreen
          props.navigation.navigate(navigateTo);
          props.navigation.setOptions({
            headerShown: false,  // Disable the header for this screen
          });
        } else {
          props.navigation.navigate(navigateTo);
        }
        handleClose(); // Close the drawer after navigating
      }}
    >
      <View style={styles.itemLeft}>
        {!isSettings && (
          <>
            <Ionicons name={iconName} size={22} color={isDarkMode ? '#FFF' : '#888'} />  {/* Adjust icon color */}
            <Text style={[styles.itemLabel, { color: isDarkMode ? '#FFF' : '#000' }]}>{label}</Text>  {/* Adjust text color */}
          </>
        )}
      </View>
      {!isSettings && <Ionicons name="chevron-forward-outline" size={22} color={isDarkMode ? '#FFF' : '#888'} style={styles.itemRight} />}
      {isSettings && <Ionicons name={iconName} size={35} color={isDarkMode ? '#FFF' : '#888'} style={styles.settingsIcon} />}
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={props.visible}
      transparent={true}
      animationType="none" 
      onRequestClose={handleClose}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        onPress={handleClose} 
        activeOpacity={1} // Disable any touch feedback to avoid weird fading
      >
        <Animated.View
          style={[styles.modalContainer, { transform: [{ translateX: slideAnim }], backgroundColor: isDarkMode ? '#222' : '#FFF' }]} > {/* Adjust modal background color */}
          <DrawerContentScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity style={styles.closeIcon} onPress={handleClose}>
              <MaterialCommunityIcons name="menu-open" size={35} color={isDarkMode ? '#FFF' : 'blue'} /> {/* Adjust close icon color */}
            </TouchableOpacity>
            
            <View style={styles.profileSection}>
              <Image
                source={require('../assets/images/default-image.jpg')}
                style={styles.profileImage}
              />
              <Text style={[styles.profileName, { color: isDarkMode ? '#FFF' : '#000' }]}>Test Testerson</Text>  {/* Adjust text color */}
              <Text style={[styles.profileEmail, { color: isDarkMode ? '#AAA' : '#888' }]}>correo@correo.com</Text>  {/* Adjust text color */}
            </View>

            <View style={styles.menuItems}>
              {renderDrawerItem('Weather', 'cloud-outline', 'index')}
              {renderDrawerItem('History', 'time-outline', 'drawer/HistoryScreen')}
              {renderDrawerItem('My locations', 'location-outline', 'drawer/MyLocationsScreen')}
            </View>
            <View style={{ flex: 1 }} />
            <View style={styles.bottomItems}>
              <View style={{ marginBottom: 60 }}>
                {renderDrawerItem('Go premium', 'diamond-outline', 'drawer/GoPremiumScreen')}
              </View>
              {renderDrawerItem('Settings', 'settings-outline', 'drawer/SettingsScreen', true)}
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Ensure constant opacity
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 300,
    height: '100%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  profileSection: {
    paddingTop: 90,
    paddingBottom: 45, 
    alignItems: 'center',
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 60,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 14,
  },
  menuItems: {
    paddingVertical: 10,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    left: 10, 
    zIndex: 10,
  },
  drawerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLabel: {
    marginLeft: 15,
    fontSize: 16,
  },
  itemRight: {
    marginLeft: 'auto',
  },
  settingsIcon: {
    position: 'absolute',
    bottom: 30,
    right: 5,
    paddingRight: 15,
  },
  bottomItems: {
    marginTop: 'auto', 
  },
});
