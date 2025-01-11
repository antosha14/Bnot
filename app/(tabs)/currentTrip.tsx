import { Text, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const CurrentTrip = () => {
  return (
    <SafeAreaView style={styles.pageContainer}>
      <Text>CurrentTrip</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: '#4C4DDC',
    flex: 1,
  },
});

export default CurrentTrip;
