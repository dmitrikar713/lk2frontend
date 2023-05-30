import React, { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ArrowBackIcon } from 'src/styles/icons/arrowBack';

import styles from './Breadcrumbs.module.scss';

interface Breadcrumb {
  title: string;
  path: string;
  withArrowBack?: boolean;
}

export interface BreadcrumbsProps {
  breadcrumbList: Array<Breadcrumb>;
  withArrowBack?: boolean;
  textColor?: string;
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  breadcrumbList,
  withArrowBack,
  textColor,
}) => (
  <span className={styles.Breadcrumbs}>
    {breadcrumbList.map((breadcrumb, index) => (
      <Fragment key={breadcrumb.title}>
        {index !== 0 && <span className={styles.BreadcrumbsDelimeter}>/</span>}
        {/^https?:\/\//.test(breadcrumb.path) ? (
          <a
            key={breadcrumb.title}
            href={breadcrumb.path}
            className={styles.BreadcrumbsItem}
            style={{ color: textColor }}
          >
            {withArrowBack && <ArrowBackIcon />}
            {breadcrumb.title}
          </a>
        ) : (
          <Link
            key={breadcrumb.path}
            to={breadcrumb.path}
            className={styles.BreadcrumbsItem}
          >
            {withArrowBack && <ArrowBackIcon />}
            {breadcrumb.title}
          </Link>
        )}
      </Fragment>
    ))}
  </span>
);
