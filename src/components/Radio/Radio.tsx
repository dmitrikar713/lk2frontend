import React, { FC } from 'react';
import cx from 'classnames';

import styles from './Radio.module.scss';

export enum RadioSize {
  Large = 'Large',
  Medium = 'Medium',
  Small = 'Small',
}

export interface RadioProps {
  size?: RadioSize;
  selected?: boolean;
  disabled?: boolean;
  onClick: (value: number) => void;
  value: number;
}

export const Radio: FC<RadioProps> = ({
  children: label,
  size = RadioSize.Medium,
  selected = false,
  disabled = false,
  onClick,
  value,
}) => (
  <div className={styles.RadioWrapper} onClick={() => onClick(value)}>
    <div
      className={cx(styles.Radio, styles[size], {
        [styles.Selected]: selected,
        [styles.Disabled]: disabled,
      })}
    />
    <div className={styles.RadioLabel}>{label}</div>
  </div>
);
