import React, { FC, SyntheticEvent } from 'react';
import cx from 'classnames';

import styles from './ThreeDots.module.scss';

interface ThreeDotsProps {
  className?: string;
  onClick?: (e: SyntheticEvent) => void;
}

export const ThreeDots: FC<ThreeDotsProps> = ({ className, onClick }) => {
  const handleClick = (e: SyntheticEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <div className={cx(styles.ExtraActions, className)} onClick={handleClick}>
      <div className={styles.Dot} />
      <div className={styles.Dot} />
      <div className={styles.Dot} />
    </div>
  );
};
