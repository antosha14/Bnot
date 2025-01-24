import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import { NotificationProvider } from '@/contexts/NotificationContext';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const RootLayout = () => {
  return (
    <Provider store={store}>
      <NotificationProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar backgroundColor="#4C4DDC" style="light" />
      </NotificationProvider>
    </Provider>
  );
};

export default RootLayout;
