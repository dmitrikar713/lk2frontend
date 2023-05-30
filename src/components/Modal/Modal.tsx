import React, { FC, useEffect, useState } from 'react';
import { CancelIcon } from 'src/styles/icons/cancel';
import cx from 'classnames';

import styles from './Modal.module.scss';

export interface ModalProps {
  isShown: boolean;
  title?: string;
  className?: string;
  onHide: () => void;
}

export const Modal: FC<ModalProps> = ({
  isShown,
  title,
  children,
  className,
  onHide,
}) => {
  enum TransitionType {
    Enter = 'Enter',
    Exit = 'Exit',
  }

  const [transitionType, setTransitionType] = useState<TransitionType | null>(
    null
  );

  const handleClose = () => {
    setTransitionType(TransitionType.Exit);
  };

  const handleTransitionEnd = () => {
    if (transitionType === TransitionType.Exit) {
      onHide();
    }
  };

  useEffect(() => {
    setTransitionType(isShown ? TransitionType.Enter : TransitionType.Exit);
  }, [isShown]);

  return (
    <>
      {isShown && (
        <>
          <div className={styles.ModalBackground} onClick={handleClose} />
          <div className={styles.ModalCentered}>
            <div
              className={cx(
                styles.Modal,
                className,
                transitionType && styles[transitionType]
              )}
              onTransitionEnd={handleTransitionEnd}
            >
              <div className={styles.ModalHeader}>
                <div className={styles.ModalHeading}>{title}</div>
                <div className={styles.ModalCloseBtn} onClick={handleClose}>
                  <CancelIcon />
                </div>
              </div>
              <div className={styles.ModalContent}>{children}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
