import { StyleSheet, View } from 'react-native';
import React from 'react';

const StripedBackground = () => {
  return (
    <View style={styles.backgroundContainer}>
      {[...Array(4)].map((item, index) => (
        <View style={styles.secondaryDiv} key={index}></View>
      ))}
    </View>
  );
};

export default StripedBackground;

const styles = StyleSheet.create({
  secondaryDiv: {
    backgroundColor: '#FFF',
    opacity: 0.1,
    zIndex: 2,
    width: 1000,
    height: 100,
    margin: 100,
    transform: [{ rotate: '45deg' }],
  },
  backgroundContainer: {
    flex: 1,
    position: 'absolute',
  },
});
