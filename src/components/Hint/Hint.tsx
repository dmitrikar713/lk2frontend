import React, { FC } from 'react';
import { QuotesIcon } from 'src/styles/icons/quotes';

import styles from './Hint.module.scss';

export const Hint: FC = ({ children }) => (
  <div className={styles.Hint}>
    <QuotesIcon /> {children}
  </div>
);
