import axios from 'axios';
import { store } from '../redux/store';

const instance = axios.create({
  baseURL: 'https://api-habit.herokuapp.com',
});

instance.interceptors.request.use(
  function (config) {
    config.headers = {
      Authorization: store.getState().auth.access_token,
      'content-type': 'application/json',
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default instance;
