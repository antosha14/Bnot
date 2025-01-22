import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = { foregroundSong: '../assets/alarm/song.mp3', notifyPosition: 5 };

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    changeForegroundSong: (state, action: PayloadAction<string>) => {
      state.foregroundSong = action.payload;
    },
    changeNotifyPosition: (state, action: PayloadAction<number>) => {
      state.notifyPosition = action.payload;
    },
  },
});

export const { changeForegroundSong, changeNotifyPosition } = settingSlice.actions;
export default settingSlice.reducer;
