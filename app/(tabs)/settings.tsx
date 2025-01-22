import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store/store';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import { changeNotifyPosition, changeForegroundSong } from '@/store/settingsSlice';

const Settings = () => {
  const settings = useSelector((state: RootState) => state.settings);
  const [selectedFile, setSelectedFile] = useState(settings.foregroundSong);
  const [notificationPosition, setNotificationPosition] = useState(settings.notifyPosition);
  const dispatch = useDispatch();

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'audio/mpeg',
    });

    alert(result);
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.settingContainer}>
        <Text style={styles.inputLabel}>On what position app should notify you</Text>
        <Picker
          style={styles.searchBoxStyles}
          selectedValue={notificationPosition}
          onValueChange={itemValue => dispatch(changeNotifyPosition(itemValue))}
        >
          {[...Array(10).keys()].map(item => (
            <Picker.Item label={`${item + 1}`} value={item + 1} key={item + 1} />
          ))}
        </Picker>
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.inputLabel}>Select a song to play (plays only in foreground)</Text>
        <Pressable
          style={({ pressed }) => [styles.selectFileButton, { opacity: pressed ? 0.8 : 1 }]}
          onPress={() => {
            pickDocument();
          }}
        >
          <Text style={styles.buttonText}>Pick a file</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  pageContainer: { backgroundColor: '#4C4DDC', flex: 1, padding: 10 },
  settingContainer: { marginTop: 10 },
  inputLabel: { marginTop: 8, color: '#FFF', fontWeight: 600 },
  searchBoxStyles: { backgroundColor: '#FFF', marginTop: 4, borderRadius: 15 },
  selectFileButton: {
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
    marginTop: 5,
  },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: 600 },
});
