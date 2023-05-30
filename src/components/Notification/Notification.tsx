import React, { FC, useState } from 'react';
import cx from 'classnames';

import styles from './Notification.module.scss';

export enum NotificationSize {
  SizeL = 'SizeL',
  SizeM = 'SizeM',
  SizeS = 'SizeS',
  SizeXS = 'SizeXS',
}

export interface NotificationProps {
  children: string;
  size: NotificationSize;
  shorthand?: boolean;
}

export const Notification: FC<NotificationProps> = ({
  children,
  size,
  shorthand = false,
}) => {
  const [visible, setVisible] = useState<boolean>(true);
  const [showMore, setShowMore] = useState<boolean>(false);
  let preview: string | null = null;
  const sentences = children.split('. ');

  if (sentences.length > 1) {
    preview = sentences[0].concat('.');
  }

  return (
    <>
      {visible && (
        <div className={cx(styles.Notification, styles[size])}>
          {shorthand && sentences.length > 1 ? (
            <span>
              {showMore ? children : preview}
              <span
                className={styles.ShowMore}
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? 'Скрыть' : 'Показать ещё'}
              </span>
            </span>
          ) : (
            children
          )}
          <div className={styles.CloseIcon} onClick={() => setVisible(false)} />
        </div>
      )}
    </>
  );
};
