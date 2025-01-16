import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';

const OnlineStatus = () => {
  const { type, isConnected } = useNetInfo();

  return (
    <View style={styles.container}>
      <View style={[styles.circle, { backgroundColor: isConnected ? 'green' : 'red' }]} />
      <Text style={styles.statusText}>{isConnected ? 'Online' : 'Offline'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 30,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FFF',
    marginTop: 20,
    borderRadius: 10,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  statusText: {
    fontSize: 16,
  },
});

export default OnlineStatus;
