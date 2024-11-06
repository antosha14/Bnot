import { View, Text, StyleSheet, Button } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const HomePage = () => {
  return (
    <View className="flex-1 items-center justify-center mr-4 ml-4">
      <Text className="text-5xl mb-5">Hello there!</Text>
      <Text style={styles.greetingMessage}>Here is your personal border notification app for Belarus!</Text>
      <View style={styles.directionButtonsContainer}>
        <Button title="Arriving to Belarus" />
        <Text style={styles.directionButton}>Leaving Belarus</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  directionButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  greetingMessage: {
    fontSize: 20,
    marginBottom: 60,
  },
  directionButton: {
    fontSize: 18,
    marginRight: 8,
    marginLeft: 8,
    backgroundColor: 'crimson',
    padding: 8,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default HomePage;
