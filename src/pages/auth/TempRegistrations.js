import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import styles from './RegistrationForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
// temp!!!
import authOperations from '../../redux/auth/authOperations';
// formik
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import RingLoader from 'react-spinners/RingLoader';
import { css } from '@emotion/core';

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
};

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(16, 'Too Long!')
    .required('Required'),
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(8, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

function RegistrationForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.auth);
  const [state, setState] = useState(initialState);
  const nameInputId = uuidv4();
  const emailInputId = uuidv4();
  const passwordInputId = uuidv4();

  const handleSubmit = values => {
    const {
      isnameOnFocus,
      isemailOnFocus,
      ispasswordOnFocus,
      ...user
    } = values;
    dispatch(authOperations.registration(user));
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
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: '35%',
            left: '45%',
            zIndex: '200',
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
          name: '',
          email: '',
          password: '',
          isnameOnFocus: false,
          isemailOnFocus: false,
          ispasswordOnFocus: false,
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <label htmlFor={nameInputId} className={styles.nameLabel}>
              <Field
                className={styles.input}
                placeholder={!state.isnameOnFocus ? 'Имя: от 2 до 8 букв' : ''}
                name="name"
                type="text"
                onFocus={inputFocused}
                onBlur={inputBlured}
                pattern="[a-zA-Zа-яА-Я]+"
              />
              {state.isnameOnFocus ? <span>Имя</span> : null}
              {errors.name && touched.name ? (
                <div className={styles.errVerification}>{errors.name}</div>
              ) : null}
            </label>
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
                // onSubmit={()=>console.log(111)}
                placeholder={
                  !state.ispasswordOnFocus ? 'Пароль: от 8 до 16 символов' : ''
                }
                className={styles.input}
                // onChange={handleChange}
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
            <button
              type="submit"
              // onClick={handleSubmit}
              className={styles.registration_btn}
            >
              Зарегистрироваться
            </button>
          </Form>
        )}
      </Formik>

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
