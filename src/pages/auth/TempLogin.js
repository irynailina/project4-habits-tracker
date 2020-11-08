import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import styles from './RegistrationForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
// temp!!!
import authOperations from '../../redux/auth/authOperations';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
//loader
import RingLoader from 'react-spinners/RingLoader';
import { css } from '@emotion/core';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

// interface IinitialState  {
//   email: string;
//   password:  string;
//   isemailOnFocus: boolean;
//   ispasswordOnFocus: boolean;
// };

// interface IState {
//   userName: string;
//   access_token: string;
//   isAuth:  boolean;
//   isLoading:  boolean;
// };

// interface Props {
//   replace: (path: string) => string;
// }

const initialState = {
  email: '',
  password: '',
  isemailOnFocus: false,
  ispasswordOnFocus: false,
};

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(16, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

function LoginForm({ history: { replace } }) {
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  // const { isLoading } = useSelector((state: IState) => state.auth);
  const { isLoading } = useSelector(state => state.auth);
  const emailInputId = uuidv4();
  const passwordInputId = uuidv4();

  // const handleSubmit = (values: IinitialState) => {
  const handleSubmit = values => {
    const { isemailOnFocus, ispasswordOnFocus, ...user } = values;
    dispatch(authOperations.login(user));
    reset();
    // history.replace('/home');
    replace('/home');
  };

  const reset = () => {
    setState(initialState);
  };

  // const inputFocused = (e: React.ChangeEvent<HTMLInputElement>) => {
  const inputFocused = e => {
    const { name } = e.currentTarget;
    setState(prev => ({ ...prev, [`is${name}OnFocus`]: true }));
  };

  // const inputBlured = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: '35%',
            left: '45%',
            zIndex: 200,
          }}
        >
          <RingLoader
            size={220}
            color={'#ff6c00'}
            css={override}
            loading={isLoading}
          />
        </div>
      )}
      <Formik
        onSubmit={values => handleSubmit(values)}
        validationSchema={SignupSchema}
        initialValues={{
          email: '',
          password: '',
          isemailOnFocus: false,
          ispasswordOnFocus: false,
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <label htmlFor={emailInputId} className={styles.nameLabel}>
              <Field
                className={styles.input}
                placeholder={!state.isemailOnFocus ? 'Эл. почта' : ''}
                name="email"
                type="email"
                onFocus={inputFocused}
                onBlur={inputBlured}
              />
              {state.isemailOnFocus ? <span>E-mail</span> : null}
              {errors.email && touched.email ? (
                <div className={styles.errVerification}>{errors.email}</div>
              ) : null}
            </label>
            <label htmlFor={passwordInputId} className={styles.nameLabel}>
              <Field
                placeholder={
                  !state.ispasswordOnFocus ? 'Пароль: от 8 до 16 символов' : ''
                }
                className={styles.input}
                onFocus={inputFocused}
                onBlur={inputBlured}
                name="password"
                type="password"
                pattern="[a-zA-Z0-9а-яА-Я]+"
              />
              {state.ispasswordOnFocus ? <span>Пароль</span> : null}
              {errors.password && touched.password ? (
                <div className={styles.errVerification}>{errors.password}</div>
              ) : null}
            </label>
            <button type="submit" className={styles.registration_btn}>
              Войти
            </button>
          </Form>
        )}
      </Formik>
      <p className={styles.form_description}>
        Еще нет аккаунта?<NavLink to="/"> Зарегистрироваться</NavLink>
      </p>
    </div>
  );
}

export default LoginForm;
