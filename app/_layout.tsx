import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { mainColor } from '../constants/colors';

const RootLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar backgroundColor={mainColor} style="light" />
    </>
  );
};

export default RootLayout;
