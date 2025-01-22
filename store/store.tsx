import { configureStore } from '@reduxjs/toolkit';
import currentTripReducer from './currentTripSlice';
import settingsReducer from './settingsSlice';

export const store = configureStore({
  reducer: { currentTrip: currentTripReducer, settings: settingsReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
