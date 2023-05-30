import React, { useRef, useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import useInterval from 'src/common/hooks/useInterval';
import observeRect from 'src/common/utils/observeRect';

import cx from 'classnames';
import styles from './PositionInPortal.module.scss';

const POSITIONS = ['top', 'bottom'];
type Position = typeof POSITIONS[number];

interface PositionInPortalProps {
  targetRef: React.RefObject<HTMLElement>;
  open: boolean;
}

export const PositionInPortal = ({
  targetRef,
  children,
  open,
}: React.PropsWithChildren<PositionInPortalProps>) => {
  const positionedPortalContainerRef = useRef<HTMLDivElement>(null);
  const [dropDownDisplay, setDropDownDisplay] = useState<Position>('bottom');
  const wrapperDropDown = useRef<HTMLDivElement>(null);

  const dropDownContainerRef = useCallback(
    (node: HTMLElement | null) => {
      if (open && node) {
        setDropDownDisplay('bottom');
      }
    },
    [open]
  );

  const checkDropDownOpenPosition = useCallback(
    (
      wrapperDropDown: React.RefObject<HTMLDivElement>,
      dropDownDisplay: Position,
      setDropDownDisplay: React.Dispatch<React.SetStateAction<Position>>
    ) => {
      if (wrapperDropDown?.current && setDropDownDisplay) {
        const node = wrapperDropDown.current;
        const rect = node.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        if (dropDownDisplay === 'bottom' && viewportHeight - rect.bottom < 0) {
          setDropDownDisplay('top');
        } else if (
          dropDownDisplay === 'top' &&
          viewportHeight - rect.bottom - rect.height - 100 > 0
        ) {
          setDropDownDisplay('bottom');
        }
      }
    },
    []
  );

  useEffect(() => {
    const node = positionedPortalContainerRef.current;
    if (node && targetRef.current) {
      const observer = observeRect(targetRef.current, (rect) => {
        if (rect) {
          const { x, y, height, width } = rect;
          const { style } = node;
          style.top = `${y}px`;
          style.left = `${x}px`;
          style.height = `${height}px`;
          style.width = `${width}px`;
        }
      });
      observer.observe();
      return () => {
        observer.unobserve();
      };
    }
  }, [targetRef.current, positionedPortalContainerRef.current]);

  useInterval(
    checkDropDownOpenPosition,
    500,
    wrapperDropDown,
    dropDownDisplay,
    setDropDownDisplay
  );

  const getPositionClass = (position: string) => {
    switch (position) {
      case 'top':
        return styles.TopDropDownPosition;
      case 'bottom':
      default:
        return styles.BottomDropDownPosition;
    }
  };

  return createPortal(
    <div
      className={styles.PositionedPortalContainer}
      ref={positionedPortalContainerRef}
    >
      <div
        className={cx(
          styles.DropDownContainer,
          getPositionClass(dropDownDisplay)
        )}
        ref={dropDownContainerRef}
      >
        <div className={styles.DropDownWrapper} ref={wrapperDropDown}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
