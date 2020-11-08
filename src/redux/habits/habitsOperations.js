import axios from '../../api/axios';
import { habitsSlice } from './habitsReducer';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const getHabit = newHabit => async (dispatch, getState) => {
  dispatch(habitsSlice.actions.setIsLoading());
  try {
    const responseGet = await axios.get('/habits');
    dispatch(habitsSlice.actions.getAllHabits(responseGet.data));
  } catch (err) {
    error({
      title: 'Oh No!',
      text: err.response.data,
    });
    console.log('error', err);
  }
  dispatch(habitsSlice.actions.resetIsLoading());
};

const createHabit = newHabit => async (dispatch, getState) => {
  dispatch(habitsSlice.actions.setIsLoading());
  try {
    const responseCreate = await axios.post('/habits', { name: newHabit });
    dispatch(habitsSlice.actions.addHabit(responseCreate.data));
  } catch (err) {
    error({
      title: 'Oh No!',
      text: err.response.data,
    });
    console.log('error', err);
  }
  dispatch(habitsSlice.actions.resetIsLoading());
};

const deleteHabit = habitId => async dispatch => {
  dispatch(habitsSlice.actions.setIsLoading());
  try {
    const deletedHabit = await axios.delete(`/habits/${habitId}`);
    if (deletedHabit.statusText === 'OK') {
      dispatch(
        habitsSlice.actions.deleteHabit({
          habitId,
          total: deletedHabit.data.total,
        }),
      );
    }
  } catch (err) {
    error({
      title: 'Oh No!',
      text: err.response.data,
    });
    console.log('error', err);
  }
  dispatch(habitsSlice.actions.resetIsLoading());
};

const updateHabitName = (name, id) => async (dispatch, getState) => {
  dispatch(habitsSlice.actions.setIsLoading());
  const dataObj = { id, name };
  try {
    const updateHabit = await axios.patch('/habits', dataObj);
    dispatch(habitsSlice.actions.updateHabitData(updateHabit.data));
  } catch (err) {
    error({
      title: 'Oh No!',
      text: err.response.data,
    });
    console.log('error', err);
  }
  dispatch(habitsSlice.actions.resetIsLoading());
};

const updateHabitData = (id, data) => async dispatch => {
  dispatch(habitsSlice.actions.setIsLoading());
  const dataObj = { id, data };
  try {
    const updateHabit = await axios.patch('/habits', dataObj);
    dispatch(habitsSlice.actions.updateHabitData(updateHabit.data));
  } catch (err) {
    error({
      title: 'Oh No!',
      text: err.response.data,
    });
    console.log('error', err);
  }
  dispatch(habitsSlice.actions.resetIsLoading());
};

export default {
  getHabit,
  createHabit,
  deleteHabit,
  updateHabitName,
  updateHabitData,
};
