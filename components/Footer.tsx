import { View } from 'react-native';
import { Tabs } from 'expo-router';
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type TabIconName = 'rocket' | 'car' | 'history' | 'gear';

const TabIcon = ({ icon, focused }: { icon: TabIconName; focused: boolean }) => {
  return (
    <View>
      <FontAwesome name={icon} size={24} color={focused ? '#4C4DDC' : 'black'} />
    </View>
  );
};

const tabBarStyles = {
  backgroundColor: '#FFF',
  borderTopColor: '#232533',
  height: 60,
};

const Footer = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#4C4DDC',
        tabBarStyle: tabBarStyles,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'New Trip',
          tabBarIcon: ({ color, focused }) => <TabIcon icon="rocket" focused={focused} />,
        }}
      />

      <Tabs.Screen
        name="currentTrip"
        options={{
          title: 'Current Trip',
          tabBarIcon: ({ color, focused }) => <TabIcon icon="car" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, focused }) => <TabIcon icon="history" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => <TabIcon icon="gear" focused={focused} />,
        }}
      />
    </Tabs>
  );
};

export default Footer;
