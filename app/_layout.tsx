import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import React from 'react';
import { StatusBar } from 'expo-status-bar';

const RootLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar backgroundColor="#4C4DDC" style="light" />
    </>
  );
};

export default RootLayout;
