import { configureStore } from '@reduxjs/toolkit';
import postsSlice from './slices/postsSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
	reducer: { postsSlice, userSlice }
});
