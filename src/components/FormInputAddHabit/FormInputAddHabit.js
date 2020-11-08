import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import css from './formInputAddHabit.module.css';
import habitsOperations from '../../redux/habits/habitsOperations';

const FormInputAddHabit = ({ setnewInput }) => {
  const dispatch = useDispatch();
  const [newHabit, setnewHabit] = useState('');

  const handleQueryChange = e => {
    setnewHabit(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(habitsOperations.createHabit(newHabit));
    setnewInput(false);
  };

  return (
    <>
      <form className={css.addInputForm} onSubmit={handleSubmit}>
        <input
          value={newHabit}
          autoFocus={true}
          onChange={handleQueryChange}
          placeholder="Только буквы и цифры..."
          type="text"
          className={css.input}
          pattern="[a-zA-Z0-9а-яА-Я/' ']+"
        />
      </form>
    </>
  );
};

export default FormInputAddHabit;
