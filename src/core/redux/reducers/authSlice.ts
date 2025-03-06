/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  currentUser: any;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        email: string;
        password: string;
      }>,
    ) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    loginFailed: (state, action: PayloadAction<string>) => {
      state.currentUser = null;
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: state => {
      state.currentUser = null;
    },
    registerUser: (
      state,
      action: PayloadAction<{
        name: string;
        email: string;
        password: string;
      }>,
    ) => {
      state.isLoading = true;
    },
    registerUserSuccess: state => {
      state.isLoading = false;
    },
    registerUserFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  login,
  logout,
  loginFailed,
  loginSuccess,
  registerUser,
  registerUserFailed,
  registerUserSuccess,
} = authSlice.actions;
export default authSlice.reducer;
