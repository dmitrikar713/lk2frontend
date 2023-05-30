import React, { FC, ReactElement } from 'react';
import cx from 'classnames';

import styles from './Label.module.scss';

export enum LabelType {
  Default = 'Default',
  WithEmoji = 'WithEmoji',
}

export enum LabelSize {
  Large = 'Large',
  Medium = 'Medium',
  Small = 'Small',
}

export interface LabelProps {
  type: LabelType;
  size?: LabelSize;
  icon?: ReactElement;
}

export const Label: FC<LabelProps> = ({
  children,
  type,
  size = LabelSize.Medium,
}) => (
  <span className={cx(styles.Label, styles[type], styles[size])}>
    {children}
  </span>
);
