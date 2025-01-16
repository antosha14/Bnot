import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { QueueEntreeOpen, QueueEntreeClose } from '../constants/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = { opened: false, сurrentTrip: {} };

const addHistoryItem = async (car: QueueEntreeClose) => {
  try {
    let currentHistory = await AsyncStorage.getItem('history');
    if (!currentHistory) {
      await AsyncStorage.setItem('history', JSON.stringify([car]));
    } else {
      let currentHistoryArray = JSON.parse(currentHistory);
      await AsyncStorage.setItem('history', JSON.stringify([...currentHistoryArray, car]));
    }
  } catch (e) {
    alert(e);
  }
};

export const currentTripSlice = createSlice({
  name: 'currentTrip',
  initialState,
  reducers: {
    launch: (state, action: PayloadAction<QueueEntreeOpen>) => {
      state.opened = true;
      state.currentTrip = action.payload;
    },
    close: (state, action: PayloadAction<QueueEntreeClose>) => {
      state.opened = false;
      addHistoryItem(action.payload);
      state.currentTrip = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { launch, close } = currentTripSlice.actions;

export default currentTripSlice.reducer;
