import React, { FC, useRef, useState } from 'react';

import styles from './ScrollWithShadow.module.scss';
import cx from 'classnames';

export interface ScrollWithShadowProps {
  className?: string;
}

export const ScrollWithShadow: FC<ScrollWithShadowProps> = ({
  children,
  className,
}) => {
  const anchorsRef = useRef<HTMLDivElement>(null);

  const scrollAtEnd = () =>
    anchorsRef.current && anchorsRef.current.scrollLeft === 0 ? false : true;

  const scrollAtBeginning = () =>
    anchorsRef.current &&
    anchorsRef.current.scrollLeft === anchorsRef.current.scrollHeight
      ? false
      : true;

  const [rightShadow, setRightShadow] = useState<boolean>(scrollAtEnd);
  const [leftShadow, setLeftShadow] = useState<boolean>(scrollAtBeginning);

  const scrollAnchors = () => {
    setRightShadow(scrollAtEnd);
    setLeftShadow(scrollAtBeginning);
  };

  return (
    <div
      ref={anchorsRef}
      onScroll={scrollAnchors}
      className={cx(
        className,
        rightShadow && styles.RightShadow,
        leftShadow && styles.LeftShadow
      )}
    >
      {children}
    </div>
  );
};
