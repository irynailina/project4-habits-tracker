import React from 'react';
import styles from './RegistrationPage.module.css';
// import RegistrationForm from './RegistrationForm';
import TempRegistrations from './TempRegistrations';

function RegistrationPage() {
  return (
    <div className={styles.page_container}>
      <header className={styles.header}></header>
      <section className={styles.section}>
        <div className={styles.formBox}>
          {/* <RegistrationForm /> */}
          <TempRegistrations />
        </div>
      </section>
    </div>
  );
}

export default RegistrationPage;
