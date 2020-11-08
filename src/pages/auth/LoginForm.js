import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import styles from './RegistrationForm.module.css';
import { useDispatch } from 'react-redux';
// temp!!!
import authOperations from '../../redux/auth/authOperations';
import { css } from '@emotion/core';
import RingLoader from 'react-spinners/RingLoader';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const initialState = {
  email: '',
  password: '',
  isemailOnFocus: false,
  ispasswordOnFocus: false,
  // isLoading: false,
};

function LoginForm({ history }) {
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const [isLoading, setisLoading] = useState(false);
  const emailInputId = uuidv4();
  const passwordInputId = uuidv4();

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { isemailOnFocus, ispasswordOnFocus, ...user } = state;
    // setisLoading((prev) => {
    //   return {isLoading: !prev.isLoading}
    // })
    // .then(console.log(1111))
    // console.log('isLoading111', isLoading);

    // setState(prev => ({...prev, isLoading: true}))
    // console.log('state.isLoading111', state.isLoading)
    // state.isLoading = true;
    // console.log('isLoading!!!', state.isLoading);
    console.log('state', state);
    // console.log('user', user);

    dispatch(authOperations.login(user));
    setisLoading(true);

    // .then(setisLoading(true))
    // .then(console.log('isLoading111', isLoading)).then(setisLoading(false)).then(console.log('isLoading222', isLoading))

    // .then(setState((prev) => ({...prev, isLoading: false})))
    // console.log('state.isLoading222', state.isLoading)

    // .then((prev) => ({...prev, isLoading: false
    // }));
    // console.log('state.isLoading222', state.isLoading)

    // setState({ isLoading: true });
    // state.isLoading = false;
    // console.log('this.state.isLoading', state.isLoading);
    reset();
    // history.replace('/home');
  };

  const reset = () => {
    setState({ email: '', password: '' });
  };

  const inputFocused = e => {
    const { name } = e.currentTarget;
    setState(prev => ({ ...prev, [`is${name}OnFocus`]: true }));
  };
  const inputBlured = e => {
    const { name } = e.currentTarget;
    setState(prev => ({ ...prev, [`is${name}OnFocus`]: false }));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Трекер привычек</h2>
      <p className={styles.title_description}>
        Попробуй прокачать 3 привычки бесплатно, мы знаем ты можешь!
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        {isLoading && (
          <div className="sweet-loading">
            <RingLoader
              css={override}
              size={35}
              color={'#ff6c00'}
              loading={isLoading}
            />
          </div>
        )}
        <label htmlFor={emailInputId} className={styles.nameLabel}>
          <input
            value={state.email}
            name="email"
            type="email"
            id={emailInputId}
            className={styles.input}
            placeholder={!state.isemailOnFocus ? 'Эл. почта' : ''}
            onChange={handleChange}
            onFocus={inputFocused}
            onBlur={inputBlured}
          />
          {state.isemailOnFocus ? <span>E-mail</span> : null}
        </label>
        <label htmlFor={passwordInputId} className={styles.nameLabel}>
          <input
            value={state.password}
            name="password"
            type="password"
            id={passwordInputId}
            className={styles.input}
            placeholder={!state.ispasswordOnFocus ? 'Пароль' : ''}
            onChange={handleChange}
            onFocus={inputFocused}
            onBlur={inputBlured}
          />
          {state.ispasswordOnFocus ? <span>Пароль</span> : null}
        </label>
        <button type="submit" className={styles.registration_btn}>
          Войти
        </button>
      </form>

      <p className={styles.form_description}>
        Еще нет аккаунта?<NavLink to="/"> Зарегистрироваться</NavLink>
      </p>
    </div>
  );
}

export default LoginForm;
