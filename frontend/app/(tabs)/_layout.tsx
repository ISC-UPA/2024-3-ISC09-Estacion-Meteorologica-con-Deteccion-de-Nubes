import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const EmptyScreen = () => null;

export default function TabLayout() {
  return (
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
        name="menu"
        options={{
          title: 'Menu',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name= 'menu-sharp' color={color} size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name= 'heart' color={color} size={24} />
          ),
        }}
      />    
  </Tabs>
  );
}
