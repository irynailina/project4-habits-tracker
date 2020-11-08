import axios from 'axios';
import { authSlice } from './authReducer';
import { notice, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

axios.defaults.baseURL = 'https://api-habit.herokuapp.com';

const registrationEndpoint = '/auth/registration';
const loginEndpoint = '/auth/login';

const registration = userData => async dispatch => {
  dispatch(authSlice.actions.setIsLoading());
  try {
    const responseRegistration = await axios.post(
      registrationEndpoint,
      userData,
    );
    if (responseRegistration.status === 201) {
      const name = JSON.parse(responseRegistration.config.data).name;
      dispatch(authSlice.actions.authRegister(name));
      notice({
        title: 'Please confirm your email',
        text: 'Check your email (inbox or spam)',
      });
    }
  } catch (err) {
    error({
      title: 'Oh No!',
      text: err.response.data,
    });
    console.log('error===', err.response.data);
  }
  dispatch(authSlice.actions.resetIsLoading());
};

const login = userData => async (dispatch, getState) => {
  dispatch(authSlice.actions.setIsLoading());
  try {
    const responseLogin = await axios.post(loginEndpoint, userData);
    dispatch(authSlice.actions.authSignIn(responseLogin.data.access_token));
  } catch (err) {
    error({
      title: 'Oh No!',
      text: err.response.data,
    });
    console.log('error', err);
  }
  dispatch(authSlice.actions.resetIsLoading());
};

const signOut = () => async dispatch => {
  dispatch(authSlice.actions.authSignOut());
};

export default { registration, login, signOut };
