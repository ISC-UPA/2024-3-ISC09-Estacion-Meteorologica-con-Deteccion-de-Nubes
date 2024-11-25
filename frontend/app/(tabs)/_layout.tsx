import AppDrawer from '@/app/(tabs)/AppDrawer';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

  const TabLayout = () => {
    const navigation = useNavigation();
    const [isDrawerVisible, setDrawerVisible] = useState(false);

    const handleOpenDrawer = () => setDrawerVisible(true);

    return (
      <>
        <AppDrawer navigation={navigation} drawerVisible={isDrawerVisible} setDrawerVisible={setDrawerVisible} />
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'blue',
            headerShown: false,
            tabBarStyle: {
              backgroundColor: 'rgba(200, 200, 200, 0.3)',
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
                <Ionicons name={focused ? 'menu-sharp' : 'menu-outline'} color={color} size={30} />
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
          <Tabs.Screen
            name="Favorites"
            options={{
              title: '',
              tabBarIcon: ({ color, focused }) => (
                <FontAwesome name={focused ? 'heart' : 'heart-o'} size={22} color={color} />
              ),
            }}
          />
          
        </Tabs>

        
      </>
    );
  };

  export default TabLayout;
