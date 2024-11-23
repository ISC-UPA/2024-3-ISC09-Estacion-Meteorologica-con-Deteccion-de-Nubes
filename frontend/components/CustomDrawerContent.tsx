import React, { useEffect, useRef } from 'react';
import { Animated, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
  navigation: any; 
}

export default function CustomDrawerContent(props: SideMenuProps) {
  const slideAnim = useRef(new Animated.Value(-300)).current; 
  const navigation = useNavigation();

  useEffect(() => {
    if (props.visible) {
      Animated.timing(slideAnim, {
        toValue: 0, 
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300, 
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [props.visible]);

  const renderDrawerItem = (label: string, iconName: string, navigateTo: string) => (
    <TouchableOpacity
      style={styles.drawerItem}
      onPress={() => {
        props.navigation.navigate(navigateTo);
        props.onClose();
      }}
    >
      <View style={styles.itemLeft}>
        <Ionicons name={iconName} size={22} color="#888" />
        <Text style={styles.itemLabel}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={22} color="#888" style={styles.itemRight} />
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={props.visible}
      transparent={true}
      animationType="none" 
      onRequestClose={props.onClose}
    >
      <TouchableOpacity style={styles.overlay} onPress={props.onClose}>
        <Animated.View
          style={[styles.modalContainer, { transform: [{ translateX: slideAnim }] }]}>
          <DrawerContentScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity style={styles.closeIcon} onPress={props.onClose}>
              <MaterialCommunityIcons name="menu-open" size={35} color="blue" />
            </TouchableOpacity>
            
            <View style={styles.profileSection}>
              <Image
                source={require('../assets/images/default-image.jpg')}
                style={styles.profileImage}
              />
              <Text style={styles.profileName}>Test Testerson</Text>
              <Text style={styles.profileEmail}>correo@correo.com</Text>
            </View>

            <View style={styles.menuItems}>
              {renderDrawerItem('Weather', 'cloud-outline', 'INDEX')}
              {renderDrawerItem('History', 'time-outline', 'drawer/HistoryScreen')}
              {renderDrawerItem('My locations', 'location-outline', 'drawer/MyLocationsScreen')}
              {renderDrawerItem('Favorites', 'heart-outline', 'drawer/FavoritesScreen')}
            </View>
            <View style={{ flex: 1 }} />
            <View style={styles.bottomItems}>
              <View style={{ marginBottom: 60 }}>
                {renderDrawerItem('Go premium', 'diamond-outline', 'drawer/GoPremium')}
              </View>

              {/* Reemplazamos el renderDrawerItem por un ícono directo para Settings */}
              <TouchableOpacity
                style={[styles.drawerItem, { justifyContent: 'flex-start', paddingHorizontal: 20 }]}
                onPress={() => {
                  navigation.navigate('drawer/SeattingsScreen');
                  props.onClose();
                }}
              >
                <Ionicons name="settings-outline" size={35} color="#888" style={styles.settingsIcon} />
              </TouchableOpacity>
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
    color: '#888',
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
    color: '#000',
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
