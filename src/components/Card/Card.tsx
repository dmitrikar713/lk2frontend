import React, { FC, useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from 'src/styles/icons/chevronDown';
import { ChevronUpIcon } from 'src/styles/icons/chevronUp';
import cx from 'classnames';

import styles from './Card.module.scss';

interface CardProps {
  title?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  styleWithBorder?: boolean;
  className?: string;
  rememberState?: boolean;
}

enum CollapsedStates {
  Open = 'open',
  Closed = 'closed',
}

export const Card: FC<CardProps> = ({
  title,
  collapsible,
  collapsed,
  styleWithBorder,
  className,
  children,
  rememberState,
}) => {
  enum TransitionType {
    Open = 'Open',
    Close = 'Close',
  }

  const cardBody = useRef<HTMLDivElement>(null);

  const [transitionType, setTransitionType] = useState<TransitionType | null>(
    null
  );

  const [cardCollapsed, setCardCollapsed] = useState<boolean>(
    Boolean(collapsed)
  );

  const storage = localStorage;

  const handleCollapse = () => {
    const cardBodyRef = cardBody.current;

    if (cardBodyRef) {
      const maxHeight = cardBodyRef.scrollHeight;
      cardBodyRef.style.maxHeight = maxHeight + 18 + 'px';
    }

    setTimeout(() => {
      setTransitionType(
        cardCollapsed ? TransitionType.Open : TransitionType.Close
      );
      rememberState &&
        title &&
        storage.setItem(
          title,
          cardCollapsed ? CollapsedStates.Open : CollapsedStates.Closed
        );
      setCardCollapsed(!cardCollapsed);
    }, 0);
  };

  const setInitOpen = () => {
    setCardCollapsed(false);
    setTransitionType(TransitionType.Open);
  };

  useEffect(() => {
    if (rememberState && title && storage.getItem(title)) {
      storage.getItem(title) === CollapsedStates.Open
        ? setInitOpen()
        : setTransitionType(TransitionType.Close);
    } else {
      setTransitionType(collapsed ? TransitionType.Close : TransitionType.Open);
    }
  }, []);

  return (
    <div className={cx(styles.Card, className)}>
      {styleWithBorder
        ? title && <div className={styles.CardTitleWithBorder}>{title}</div>
        : title && <div className={styles.CardTitle}>{title}</div>}
      <div
        ref={cardBody}
        className={cx(
          { [styles.CardBody]: title },
          transitionType && styles[transitionType]
        )}
      >
        {children}
      </div>
      {collapsible && (
        <div
          className={
            styleWithBorder
              ? styles.CardWrapIconWithBorder
              : styles.CardWrapIcon
          }
          onClick={handleCollapse}
        >
          {cardCollapsed ? <ChevronDownIcon /> : <ChevronUpIcon />}
        </div>
      )}
    </div>
  );
};
