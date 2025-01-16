import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';

const RegistrationNumberSearch = ({ unshownCars, setRegistrationNumber, placeholder, scrollRef }) => {
  const [text, onChangeText] = useState('');
  return (
    <View>
      <Text style={styles.moreCarsMessage}>
        {unshownCars > 0 && (
          <Text style={styles.moreCarsMessage}>
            And {<Text style={styles.boldText}>{unshownCars}</Text>} vehicles more.
          </Text>
        )}
        You can enter your registration number bellow
      </Text>

      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        onSubmitEditing={() => {
          scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
          });
          setRegistrationNumber(text);
        }}
        value={text}
        placeholder={placeholder || 'Enter your registration number'}
      />
    </View>
  );
};

export default RegistrationNumberSearch;

const styles = StyleSheet.create({
  input: { height: 40, padding: 10, backgroundColor: '#FFF', marginBottom: 10 },
  moreCarsMessage: { color: '#FFF', fontWeight: 600, marginTop: 8, marginBottom: 8 },
  boldText: {
    fontWeight: 800,
    textDecorationLine: 'underline',
  },
});
