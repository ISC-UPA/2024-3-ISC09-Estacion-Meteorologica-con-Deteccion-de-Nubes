import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next'; // Import translation hook

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
  navigation: any;
}

export default function CustomDrawerContent(props: SideMenuProps) {
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const { t } = useTranslation(); // Translation function
  const colorScheme = useColorScheme(); // Detect system theme (light/dark mode)
  const isDarkMode = colorScheme === 'dark';

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const storedUserInfo = await AsyncStorage.getItem('userInfo');
        if (storedUserInfo) {
          setUserInfo(JSON.parse(storedUserInfo));
        }
      } catch (error) {
        console.error('Failed to retrieve user info:', error);
      }
    };

    fetchUserInfo();

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

  const renderDrawerItem = (labelKey: string, iconName: string, navigateTo: string) => (
    <TouchableOpacity
      style={[styles.drawerItem, isDarkMode && styles.drawerItemDark]}
      onPress={() => {
        props.navigation.navigate(navigateTo);
        props.onClose();
      }}
    >
      <View style={styles.itemLeft}>
        <Ionicons name={iconName} size={22} color={isDarkMode ? '#FFF' : '#888'} />
        <Text style={[styles.itemLabel, isDarkMode && styles.itemLabelDark]}>
          {t(labelKey)}
        </Text>
      </View>
      <Ionicons
        name="chevron-forward-outline"
        size={22}
        color={isDarkMode ? '#FFF' : '#888'}
        style={styles.itemRight}
      />
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
          style={[
            styles.modalContainer,
            { transform: [{ translateX: slideAnim }] },
            isDarkMode && styles.modalContainerDark,
          ]}
        >
          <DrawerContentScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity style={styles.closeIcon} onPress={props.onClose}>
              <MaterialCommunityIcons
                name="menu-open"
                size={35}
                color={isDarkMode ? '#FFF' : 'blue'}
              />
            </TouchableOpacity>

            <View style={styles.profileSection}>
              <Image
                source={require('../assets/images/default-image.jpg')}
                style={styles.profileImage}
              />
              <Text style={[styles.profileName, isDarkMode && styles.profileNameDark]}>
                {userInfo.name}
              </Text>
              <Text style={[styles.profileEmail, isDarkMode && styles.profileEmailDark]}>
                {userInfo.email}
              </Text>
            </View>

            <View style={styles.menuItems}>
              {renderDrawerItem('Weather', 'cloud-outline', 'INDEX')}
              {renderDrawerItem('History', 'time-outline', 'drawer/HistoryScreen')}
            </View>
            <View style={{ flex: 1 }} />
            <View style={styles.bottomItems}>
              <View style={{ marginBottom: 60 }}>
                {renderDrawerItem('goPremium', 'diamond-outline', 'drawer/GoPremium')}
              </View>

              <TouchableOpacity
                style={[styles.drawerItem, { justifyContent: 'flex-start', paddingHorizontal: 20 }]}
                onPress={() => {
                  navigation.navigate('drawer/SeattingsScreen');
                  props.onClose();
                }}
              >
                <Ionicons
                  name="settings-outline"
                  size={35}
                  color={isDarkMode ? '#FFF' : '#888'}
                  style={styles.settingsIcon}
                />
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
    backgroundColor: 'white', // Fondo claro
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  modalContainerDark: {
    backgroundColor: '#333', // Fondo oscuro para dark mode
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
    color: '#000',
  },
  profileNameDark: {
    color: '#FFF',
  },
  profileEmail: {
    fontSize: 14,
    color: '#888',
  },
  profileEmailDark: {
    color: '#AAA',
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
    backgroundColor: 'transparent', // Sin fondo adicional
  },
  drawerItemDark: {
    backgroundColor: 'transparent', // Sin fondo adicional en modo oscuro
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
  itemLabelDark: {
    color: '#FFF',
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

