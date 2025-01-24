import { Text, StyleSheet } from 'react-native';
import React from 'react';
import type { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const QueuePosition = () => {
  const currentPosition = useSelector((state: RootState) => state.currentTrip['currentTrip']?.currentQueuePosition);
  return <Text style={styles.text}>{currentPosition}</Text>;
};

export default QueuePosition;

const styles = StyleSheet.create({
  text: {
    color: 'green',
    fontWeight: 300,
  },
});
