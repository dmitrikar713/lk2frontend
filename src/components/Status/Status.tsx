import React, { FC } from 'react';
import cx from 'classnames';

import styles from './Status.module.scss';

export enum StatusSize {
  Large = 'Large',
  Normal = 'Normal',
}

export enum StatusType {
  Pending = 'Pending',
  Attention = 'Attention',
  Reject = 'Reject',
  Success = 'Success',
  Draft = 'Draft',
}

export interface StatusProps {
  size?: StatusSize;
  type: StatusType;
  text: string;
  filled?: boolean;
}

export const Status: FC<StatusProps> = ({
  size = StatusSize.Normal,
  type,
  text,
  filled = false,
}) => (
  <div
    className={cx(styles.Status, styles[size], styles[type], {
      [styles.Filled]: filled,
    })}
  >
    <div className={styles.StatusIcon} />
    <span className={styles.StatusText}>{text}</span>
  </div>
);
