import React from 'react';
import styles from './stylesNotFound.module.scss';
import { Link } from 'react-router-dom';

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.h1__404}>404</h1>
      <div className={styles.cloak__wrapper}>
        <div className={styles.cloak__container}>
          <div className={styles.cloak}></div>
        </div>
      </div>
      <div className={styles.info}>
        <h2 className={styles.h2__404}>We can't find that page</h2>
        <p className={styles.p__404}>
          We're fairly sure that page used to be here, but seems to have gone missing. We do
          apologies on it's behalf.
        </p>
        <Link to="/">
          <button className={styles.linkToHome}>Home</button>
        </Link>
      </div>
    </div>
  );
};
