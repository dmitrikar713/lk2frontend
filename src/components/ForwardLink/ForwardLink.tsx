import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'src/styles/icons/arrowRight';

import styles from './ForwardLink.module.scss';

interface ForwardLinkProps {
  title: string;
  path: string;
}

export const ForwardLink: FC<ForwardLinkProps> = ({ title, path }) => (
  <Link to={path} className={styles.ForwardLink}>
    <span className={styles.ForwardLinkTitle}>{title}</span> <ArrowRightIcon />
  </Link>
);
