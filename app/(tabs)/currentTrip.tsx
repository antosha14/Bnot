import { Text, StyleSheet, View, Pressable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import StripedBackground from '@/components/StripedBackground';
import type { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import OpenedTrip from '@/components/OpenedTrip';
import OnlineStatus from '@/components/OnlineStatus';

const PlaceholderImage = require('@/assets/images/forest.jpg');

const CurrentTrip = () => {
  const router = useRouter();
  const currentTrip = useSelector((state: RootState) => state.currentTrip);

  return (
    <SafeAreaView style={styles.pageContainer}>
      <StripedBackground />
      {!currentTrip.opened ? (
        <>
          <View>
            <Image source={PlaceholderImage} style={styles.forestImage} />
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>
              You currently don't have any trips opened. Do you want to open a new trip?
            </Text>
            <Pressable
              style={({ pressed }) => [styles.redirectButton, { opacity: pressed ? 0.8 : 1 }]}
              onPress={() => router.push('/(tabs)/home')}
            >
              <Text style={styles.redirectButtonText}>Start a new Trip</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <OpenedTrip></OpenedTrip>
          <OnlineStatus />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: '#4C4DDC',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forestImage: { width: 320, height: 400, borderRadius: 100, zIndex: 10 },
  messageContainer: {
    margin: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 600,
  },
  redirectButton: {
    marginRight: 8,
    marginLeft: 8,
    backgroundColor: 'rgb(46, 35, 108)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 50,
    paddingLeft: 50,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 20,
    marginTop: 20,
  },
  redirectButtonText: { color: '#FFF', fontSize: 18, fontWeight: 600 },
});

export default CurrentTrip;
