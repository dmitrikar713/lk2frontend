import React, { FC, MutableRefObject } from 'react';

import styles from './ScrollAnchor.module.scss';

export interface ScrollAnchorProps {
  title: string;
  anchorRef: MutableRefObject<HTMLDivElement | null>;
}

export const ScrollAnchor: FC<ScrollAnchorProps> = ({ title, anchorRef }) => (
  <div
    onClick={() =>
      anchorRef.current?.scrollIntoView({
        behavior: 'smooth',
      })
    }
    className={styles.ScrollAnchor}
  >
    <span className={styles.ScrollAnchorTitle}>{title}</span>
    <span className={styles.ScrollAnchorArrow}>↓</span>
  </div>
);
