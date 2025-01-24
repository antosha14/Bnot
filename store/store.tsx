import { configureStore } from '@reduxjs/toolkit';
import currentTripReducer from './currentTripSlice';

export const store = configureStore({
  reducer: { currentTrip: currentTripReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
