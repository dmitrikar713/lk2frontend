import React, { FC, useEffect, useState } from 'react';
import styles from './DropdownList.module.scss';
import cx from 'classnames';

export interface DropdownListProps {
  isShown: boolean;
  onHide: () => void;
  className?: string;
}

export const DropdownList: FC<DropdownListProps> = ({
  isShown,
  onHide,
  children,
  className,
}) => {
  enum TransitionType {
    Enter = 'Enter',
    Exit = 'Exit',
  }

  const [transitionType, setTransitionType] = useState<TransitionType | null>(
    null
  );

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
          <div
            className={styles.DropdownListBackground}
            onClick={() => setTransitionType(TransitionType.Exit)}
          />
          <div className={cx(styles.DropdownList, className)}>
            <div>
              <div
                className={cx(
                  styles.DropdownListWrap,
                  transitionType && styles[transitionType]
                )}
                onTransitionEnd={handleTransitionEnd}
              >
                <div
                  className={styles.DropdownListLinksBlock}
                  onClick={() => setTransitionType(TransitionType.Exit)}
                >
                  <>{children}</>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
