import { View } from 'react-native';
import { Tabs } from 'expo-router';
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const TabIcon = ({ icon, focused }: { icon: string; focused: boolean }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <FontAwesome name={icon} size={24} color={focused ? '#4C4DDC' : 'black'} />
    </View>
  );
};

const Footer = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#4C4DDC',
          tabBarStyle: {
            backgroundColor: '#FFF',
            borderTopColor: '#232533',
            height: 60,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'New Trip',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => <TabIcon icon="rocket" focused={focused} />,
          }}
        />

        <Tabs.Screen
          name="currentTrip"
          options={{
            title: 'Current Trip',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => <TabIcon icon="car" focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: 'History',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => <TabIcon icon="history" focused={focused} />,
          }}
        />
      </Tabs>
    </>
  );
};

export default Footer;
