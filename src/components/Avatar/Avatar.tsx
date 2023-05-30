import React, { FC } from 'react';
import cx from 'classnames';

import styles from './Avatar.module.scss';

export interface AvatarProps {
  placeholderLabel: string;
  src?: string;
  disabled?: boolean;
}

export const Avatar: FC<AvatarProps> = ({
  src,
  placeholderLabel,
  disabled,
}) => (
  <div className={cx(styles.AvatarContainer, { [styles.Disabled]: disabled })}>
    {src ? (
      <img alt="user_avatar" src={src} className={styles.Avatar} />
    ) : (
      <div className={styles.AvatarPlaceholder}>{placeholderLabel}</div>
    )}
  </div>
);
