import { createSlice } from '@reduxjs/toolkit';

const state = {
  userName: null,
  access_token: null,
  isAuth: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: state,
  reducers: {
    authRegister: (state, { payload }) => ({
      ...state,
      userName: payload,
    }),
    authSignIn: (state, { payload }) => ({
      ...state,
      access_token: payload,
      isAuth: true,
    }),
    authSignOut: (state, { payload }) => ({
      ...state,
      isAuth: false,
      access_token: null,
    }),
    setIsLoading: (state, { payload }) => ({
      ...state,
      isLoading: true,
    }),
    resetIsLoading: (state, { payload }) => ({
      ...state,
      isLoading: false,
    }),
  },
});
