import React, { FC } from 'react';
import { Card } from '../Card/Card';

import styles from './Skeleton.module.scss';

export interface SkeletonProps {
  rows?: number;
  withLogo?: boolean;
  withTitle?: boolean;
}

export const Skeleton: FC<SkeletonProps> = ({
  rows = 3,
  withLogo = false,
  withTitle = false,
}) => (
  <Card>
    {withLogo && <div className={styles.SkeletonLogo} />}
    {withTitle && <div className={styles.SkeletonTitle} />}
    {Array.from(Array(rows)).map((el, index) => (
      <div key={el + index.toString()} className={styles.SkeletonRow} />
    ))}
  </Card>
);
