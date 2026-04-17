import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isLoading = false;
      state.error = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginFailure, logout } =
  userSlice.actions;

export default userSlice.reducer;
