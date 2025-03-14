/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  currentUser: any;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
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
    loginSuccess: (
      state,
      action: PayloadAction<{
        email: string;
        name: string;
        accessToken: string;
      }>,
    ) => {
      const {email, name, accessToken} = action.payload;
      state.currentUser = {
        email: email,
        name: name,
      };
      state.accessToken = accessToken;
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
