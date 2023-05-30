import React, { FC, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cx from 'classnames';

import styles from './NavBar.module.scss';

interface NavBarItemProps {
  title: string;
  path: string;
  mobileIcon: ReactNode;
  className?: string;
  customRender?: any;
}

export interface NavBarProps {
  sections: Array<NavBarItemProps>;
}

export const NavBar: FC<NavBarProps> = ({ sections }) => {
  const location = useLocation();
  return (
    <div className={cx(styles.NavBar, 'navbarMenu')}>
      {sections.map((section: NavBarItemProps, index: number) => (
        <Link
          key={section.title}
          to={section.path}
          className={cx(
            styles.NavBarLink,
            {
              [styles.NavBarLinkActive]: section.path === location.pathname,
            },
            section.className
          )}
        >
          <div className={styles.NavBarMobileIcon}>{section.mobileIcon}</div>
          {section.title}
        </Link>
      ))}
    </div>
  );
};
