import React, { FC, ReactElement, useState } from 'react';
import cx from 'classnames';

import styles from './Tooltip.module.scss';

export enum TooltipType {
  Default = 'Default',
  WithEmoji = 'WithEmoji',
}

export enum TooltipSize {
  Large = 'Large',
  Medium = 'Medium',
  Small = 'Small',
}

export interface TooltipProps {
  type: TooltipType;
  title: string | undefined;
  size?: TooltipSize;
  icon?: ReactElement;
}

export const Tooltip: FC<TooltipProps> = ({
  children,
  type,
  title,
  size = TooltipSize.Medium,
}) => {
  const [active, setActive] = useState<boolean>(false);
  return (
    <div
      className={styles.TooltipWrapper}
      onMouseEnter={() => (title !== undefined ? setActive(true) : null)}
      onMouseLeave={() => (title !== undefined ? setActive(false) : null)}
    >
      {children}
      {active && (
        <div className={cx(styles.Tooltip, styles[type], styles[size])}>
          <div className={styles.TooltipArrow} />
          <div className={styles.TooltipInner}>{title}</div>
        </div>
      )}
    </div>
  );
};
