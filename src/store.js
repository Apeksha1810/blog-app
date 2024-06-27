import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from './features/blogs/blogsSlice';

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
