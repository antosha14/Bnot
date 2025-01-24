import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export function useAsyncStorage(key: string, initialValue: any) {
  const [storedValue, setStoredValue] = useState(initialValue);
  const historyUpdated = useSelector((state: RootState) => state.currentTrip.historyUpdated);

  useEffect(() => {
    const loadStoredValue = async () => {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setStoredValue(JSON.parse(value));
      } else {
        setStoredValue(JSON.parse(String(initialValue)));
      }
    };
    loadStoredValue();
  }, [key, historyUpdated, initialValue]);

  const setValue = (value: string | Function) => {
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
