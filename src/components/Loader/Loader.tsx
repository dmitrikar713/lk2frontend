import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import styles from './Loader.module.scss';

export const Loader: FC = () =>
  ReactDOM.createPortal(
    <div className={styles.Loader}>
      <div />
      <div />
    </div>,
    document.body
  );
