import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('posts');
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    console.error("Could not load state from localStorage", e);
    return [];
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('posts', serializedState);
  } catch (e) {
    console.error("Could not save state to localStorage", e);
  }
};

const initialState = {
  posts: loadState(),
};

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
      saveState(state.posts);
    },
    editPost: (state, action) => {
      const { id, content, title, image } = action.payload;
      const post = state.posts.find(post => post.id === id);
      if (post) {
        post.content = content;
        post.title = title;
        post.image = image;
        saveState(state.posts);
      }
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
      saveState(state.posts);
    },
  },
});

export const { addPost, editPost, deletePost } = blogsSlice.actions;
export default blogsSlice.reducer;
