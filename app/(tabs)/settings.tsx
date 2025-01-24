import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { useAsyncStorage } from '@/hooks/useAsyncStorage';

const Settings = () => {
  const [notifyPosition, setNotifyPosition] = useAsyncStorage('notifyPosition', 5);
  return (
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.settingContainer}>
        <Text style={styles.inputLabel}>On what position app should notify you</Text>
        <Picker
          style={styles.searchBoxStyles}
          selectedValue={notifyPosition}
          onValueChange={itemValue => {
            setNotifyPosition(itemValue);
          }}
        >
          {[...Array(10).keys()].map(item => (
            <Picker.Item label={`${item + 1}`} value={item + 1} key={item + 1} />
          ))}
        </Picker>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  pageContainer: { backgroundColor: '#4C4DDC', flex: 1, padding: 10 },
  settingContainer: { marginTop: 10 },
  inputLabel: { marginTop: 8, color: '#FFF', fontWeight: '600' },
  searchBoxStyles: { backgroundColor: '#FFF', marginTop: 4, borderRadius: 15 },
});
