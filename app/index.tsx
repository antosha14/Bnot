import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PlaceholderImage = require('@/assets/images/village.jpg');

const retriveTutorialFlag = async () => {
  try {
    return await AsyncStorage.getItem('shownTutorial');
  } catch (e) {
    alert(e);
  }
};

const setTutorialFlag = async () => {
  try {
    await AsyncStorage.setItem('shownTutorial', 'shown');
  } catch (e) {
    alert(e);
  }
};

const HomePage = () => {
  const router = useRouter();

  useLayoutEffect(() => {
    let tutorialShown;
    retriveTutorialFlag().then(value => {
      tutorialShown = value;
      if (tutorialShown) {
        router.replace('/(tabs)/currentTrip');
      }
    });
  }, [router]);

  return (
    <SafeAreaView style={styles.mainArea}>
      <View style={styles.upperContainer}>
        <Image source={PlaceholderImage} style={styles.image} />
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.title}>Here is your personal Border Notification Agent</Text>
          <Text style={styles.descriptionText}>
            This application will notify you when it is your turn to go through customs control, and perhaps allow you
            to drink an extra cup of coffee or spend unforgettable moments with loved ones. In order for the application
            to work correctly, allow the display of notifications
          </Text>
          <Pressable
            style={({ pressed }) => [styles.directionButton, { opacity: pressed ? 0.8 : 1 }]}
            onPress={() => {
              setTutorialFlag();
              router.replace('/(tabs)/currentTrip');
            }}
          >
            <Text style={styles.linkText}>Get Started</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  directionButton: {
    marginRight: 8,
    marginLeft: 8,
    backgroundColor: '#4C4DDC',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mainArea: {
    backgroundColor: '#4C4DDC',
    flex: 1,
  },
  upperContainer: {
    height: '60%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    height: '40%',
    width: '100%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 800,
  },
  description: {
    height: '40%',
    width: '100%',
    backgroundColor: '#FFF',
  },
  descriptionContainer: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  descriptionText: {
    marginTop: 15,
    textAlign: 'center',
    marginBottom: 20,
    color: '#939393',
  },
  coloredBox: {
    transform: [{ rotate: '45deg' }],
    width: '200%',
  },
  image: {
    width: 320,
    height: 400,
    borderRadius: 18,
  },
  linkText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 600,
  },
});

export default HomePage;
