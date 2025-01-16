import { configureStore } from '@reduxjs/toolkit';
import currentTripReducer from './currentTripSlice';

export const store = configureStore({
  reducer: { currentTrip: currentTripReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
