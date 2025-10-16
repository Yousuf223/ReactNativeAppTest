import {createSlice} from '@reduxjs/toolkit';

// Initial state
const initialState = {
  user: null,
  token: null,
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Merge old user with new user data
    setAuth(state, action) {
      state.user = {
        ...(state.user || {}),
        ...(action.payload.user || {}),
      };
      if (action.payload.token) {
        state.token = action.payload.token;
      }
    },
    clearAuth(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const {setAuth, clearAuth} = authSlice.actions;

export default authSlice.reducer;
