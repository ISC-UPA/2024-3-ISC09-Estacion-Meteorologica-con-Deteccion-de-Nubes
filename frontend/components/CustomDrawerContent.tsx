import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext'; // Import useTheme
import { useTranslation } from 'react-i18next'; // Import useTranslation

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
  const { t } = useTranslation(); // Access translation function

  // Function to handle the closing animation
  const handleClose = useCallback(() => {
    Animated.timing(slideAnim, {
      toValue: -300, // Move to the left (off-screen)
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      props.onClose();
    });

    Animated.timing(overlayAnim, {
      toValue: 0, // Fade out the overlay
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [slideAnim, overlayAnim, props]);

  useEffect(() => {
    if (props.visible) {
      Animated.timing(slideAnim, {
        toValue: 0, // Slide in the drawer
        duration: 300,
        useNativeDriver: true,
      }).start();

      Animated.timing(overlayAnim, {
        toValue: 0.5, // Set overlay opacity to 50%
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      handleClose();
    }
  }, [props.visible, handleClose]);

  const renderDrawerItem = (translationKey: string, iconName: string, navigateTo: string, isSettings: boolean = false) => (
    <TouchableOpacity
      style={[
        styles.drawerItem,
        {
          backgroundColor: isDarkMode ? '#222' : '#FFF',
        },
      ]}
      onPress={() => {
        props.navigation.navigate(navigateTo);
        handleClose();
      }}
    >
      <View style={styles.itemLeft}>
        {!isSettings && (
          <>
            <Ionicons name={iconName} size={22} color={isDarkMode ? '#FFF' : '#888'} />
            <Text style={[styles.itemLabel, { color: isDarkMode ? '#FFF' : '#000' }]}>{t(translationKey)}</Text>
          </>
        )}
      </View>
      {!isSettings && <Ionicons name="chevron-forward-outline" size={22} color={isDarkMode ? '#FFF' : '#888'} style={styles.itemRight} />}
      {isSettings && <Ionicons name={iconName} size={35} color={isDarkMode ? '#FFF' : '#888'} style={styles.settingsIcon} />}
    </TouchableOpacity>
  );

  return (
    <Modal visible={props.visible} transparent={true} animationType="none" onRequestClose={handleClose}>
      <TouchableOpacity style={styles.overlay} onPress={handleClose} activeOpacity={1}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ translateX: slideAnim }], backgroundColor: isDarkMode ? '#222' : '#FFF' },
          ]}
        >
          <DrawerContentScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity style={styles.closeIcon} onPress={handleClose}>
              <MaterialCommunityIcons name="menu-open" size={35} color={isDarkMode ? '#FFF' : 'blue'} />
            </TouchableOpacity>

            <View style={styles.profileSection}>
              <Image source={require('../assets/images/default-image.jpg')} style={styles.profileImage} />
              <Text style={[styles.profileName, { color: isDarkMode ? '#FFF' : '#000' }]}>Test Testerson</Text>
              <Text style={[styles.profileEmail, { color: isDarkMode ? '#AAA' : '#888' }]}>correo@correo.com</Text>
            </View>

            <View style={styles.menuItems}>
              {renderDrawerItem('weather', 'cloud-outline', 'index')}
              {renderDrawerItem('history', 'time-outline', 'drawer/HistoryScreen')}
              {renderDrawerItem('myLocations', 'location-outline', 'drawer/MyLocationsScreen')}
            </View>
            <View style={{ flex: 1 }} />
            <View style={styles.bottomItems}>
              <View style={{ marginBottom: 60 }}>
                {renderDrawerItem('goPremium', 'diamond-outline', 'drawer/GoPremiumScreen')}
              </View>
              {renderDrawerItem('settings', 'settings-outline', 'drawer/SettingsScreen', true)}
            </View>
          </DrawerContentScrollView>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}

// ... [Styles remain unchanged]


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
