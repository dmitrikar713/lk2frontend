import React, { FC } from 'react';

import styles from './NavItem.module.scss';

export interface NavItemProps {
  className?: string;
  icon?: any;
  onClick?: (arg: any) => void;
  isShown?: boolean;
}

export const NavItem: FC<NavItemProps> = ({
  className,
  icon,
  onClick,
  children,
  isShown,
}) => (
  <div className={styles.NavItemWrapper}>
    <span className={styles.NavItem} onClick={onClick}>
      {icon}
    </span>
    {isShown && <>{children}</>}
  </div>
);
