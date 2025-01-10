import { Text, View, Image, ImageSourcePropType } from 'react-native';
import { Tabs, Redirect } from 'expo-router';
import React from 'react';
import icons from '../constants/icons';

const TabIcon = ({
  icon,
  color,
  name,
  focused,
}: {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image source={icon} resizeMode="contain" tintColor={color} className="w-6 h-6" />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-3xs`} style={{ color: color }}>
        {name}
      </Text>
    </View>
  );
};

const Footer = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFA001',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#161622',
          borderTopColor: '#232533',
          height: 84,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon icon={icons.home} color={color} name="Home" focused={focused} />,
        }}
      />

      <Tabs.Screen
        name="currentTrip"
        options={{
          title: 'Current Trip',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon icon={icons.car} color={color} name="Trip" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={icons.bookmark} color={color} name="History" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Footer;
