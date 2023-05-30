import React, { FC } from 'react';
import cx from 'classnames';

import styles from './Rating.module.scss';

interface RatingProps {
  value: number;
  onClick: (value: number) => void;
}

export const Rating: FC<RatingProps> = ({ value, onClick }) => (
  <div className={styles.Rating}>
    {[...Array(5)].map((_, index) => {
      return (
        <span
          key={index.toString()}
          onClick={() => onClick(index + 1)}
          className={cx(styles.RatingStar, {
            [styles.RatingStarActive]: value > index,
          })}
        >
          &#9733;
        </span>
      );
    })}
  </div>
);
