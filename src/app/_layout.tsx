import { Slot, SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import React, { useEffect } from 'react';
import '../../global.css';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({ 'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf') });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return <Slot />;
};

export default RootLayout;
