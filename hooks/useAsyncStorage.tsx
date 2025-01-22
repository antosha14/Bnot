import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAsyncStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState([]);

  useEffect(() => {
    const loadStoredValue = async () => {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setStoredValue(JSON.parse(value));
      } else {
        setStoredValue(JSON.parse(initialValue));
      }
    };
    loadStoredValue();
  });

  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (e) {
      alert(e);
    }
  };

  return [storedValue, setValue];
}
