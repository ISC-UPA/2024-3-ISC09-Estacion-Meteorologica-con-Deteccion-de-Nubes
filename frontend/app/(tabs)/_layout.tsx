import AppDrawer from '@/app/(tabs)/AppDrawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';


  const TabLayout = () => {
    const navigation = useNavigation();
    const [isDrawerVisible, setDrawerVisible] = useState(false);

    const handleOpenDrawer = () => setDrawerVisible(true);
    const handleCloseDrawer = () => setDrawerVisible(false);

    return (
      <>
        {/* Drawer Modal */}
        <AppDrawer navigation={navigation} drawerVisible={isDrawerVisible} setDrawerVisible={setDrawerVisible} />

        {/* Tab Navigation */}
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'blue',
            headerShown: false,
            tabBarStyle: {
              backgroundColor: 'rgba(200, 200, 200, 0.7)',
              position: 'absolute',
              borderTopWidth: 0,
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
        >
          <Tabs.Screen
            name="AppDrawer"
            options={{
              title: '',
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'menu-sharp' : 'menu-outline'} color={color} size={24} />
              ),
              tabBarButton: (props) => (
                <TouchableOpacity
                  {...props}
                  onPress={() => handleOpenDrawer()}
                />
              ),
            }}
          />

          <Tabs.Screen
            name="index"
            options={{
              title: '',
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
              ),
            }}
          />
        </Tabs>
      </>
    );
  };

  export default TabLayout;
