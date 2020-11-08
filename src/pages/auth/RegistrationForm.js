import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import LoadingOverlay from 'react-loading-overlay';
import styles from './RegistrationForm.module.css';
import { useDispatch } from 'react-redux';
// temp!!!
import authOperations from '../../redux/auth/authOperations';
import RingLoader from 'react-spinners/RingLoader';
import { css } from '@emotion/core';

// import { notice} from '@pnotify/core';
// import '@pnotify/core/dist/PNotify.css';
// import '@pnotify/core/dist/BrightTheme.css';

// import { css } from '@emotion/core';
// import RingLoader from 'react-spinners/RingLoader';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const initialState = {
  name: '',
  email: '',
  password: '',
  isnameOnFocus: false,
  isemailOnFocus: false,
  ispasswordOnFocus: false,
  isLoading: false,
};

function RegistrationForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  // class RegistrationForm extends Component {
  // state = {
  //   name: '',
  //   email: '',
  //   password: '',
  //   isnameOnFocus: false,
  //   isemailOnFocus: false,
  //   ispasswordOnFocus: false,
  //   isLoading: false,
  // };
  // ============= temp!!! =========
  const nameInputId = uuidv4();
  const emailInputId = uuidv4();
  const passwordInputId = uuidv4();

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // setState({
    //   isLoading: true,
    // });
    const {
      isnameOnFocus,
      isemailOnFocus,
      ispasswordOnFocus,
      isLoading,
      ...user
    } = state;
    state.isLoading = true;
    console.log('state.isLoading1111', state.isLoading);
    // запрос на бэк
    console.log('state', state);
    // console.log('user', user);
    // console.log('authOperations.registration', authOperations.registration());

    dispatch(authOperations.registration(user)).then(() => {
      state.isLoading = false;
      console.log('state.isLoading222', state.isLoading);
    });
    reset();
    history.replace('/login');
  };

  const reset = () => {
    setState({ name: '', email: '', password: '' });
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
        {state.isLoading && (
          <div className="sweet-loading">
            <RingLoader
              css={override}
              size={35}
              color={'#ff6c00'}
              loading={state.isLoading}
            />
            {/* <LoadingOverlay
              active={state.isLoading}
              spinner
              text="Секундочку..."
            ></LoadingOverlay> */}
          </div>
        )}
        <label htmlFor={nameInputId} className={styles.nameLabel}>
          <input
            value={state.name}
            name="name"
            type="name"
            id={nameInputId}
            className={styles.input}
            placeholder={!state.isnameOnFocus ? 'Имя' : ''}
            onChange={handleChange}
            onFocus={inputFocused}
            onBlur={inputBlured}
          />
          {state.isnameOnFocus ? <span>Имя</span> : null}
        </label>
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
          Зарегистрироваться
        </button>
      </form>
      <p className={styles.form_description}>
        Уже есть аккаунт?{' '}
        <NavLink activeClassName="grey" to="/login" className="link">
          Войти
        </NavLink>
      </p>
    </div>
  );
}

export default RegistrationForm;
