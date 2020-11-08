import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './LoginPage.module.css';
// import LoginForm from './LoginForm';
import TempLogin from './TempLogin';

function LoginPage() {
  const history = useHistory();
  return (
    <div className={styles.page_container}>
      <header className={styles.header}></header>
      <section className={styles.section}>
        <div className={styles.formBox}>
          <TempLogin history={history} />
          {/* <LoginForm history={history} /> */}
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
