import React, {
  HTMLAttributes,
  MutableRefObject,
  useRef,
  ReactNode,
  useCallback,
  useLayoutEffect,
  forwardRef,
  useEffect,
} from 'react';
import { moveFocus, nextItem, previousItem } from './utils';
import { refSetter } from 'src/common/utils/refSetter';
import { keyboardKey } from 'src/common/utils/keyboardKey';
import styles from './DropDown.module.scss';
import cx from 'classnames';

export type DropDownDimensions = 'l' | 'm' | 's';

export interface DropDownMenuProps extends HTMLAttributes<HTMLUListElement> {
  /** Размер Меню */
  dimension?: DropDownDimensions;
  /** Элементы содержимого */
  children: ReactNode;
}

// eslint-disable-next-line react/display-name
export const DropDownMenu = forwardRef<
  HTMLUListElement | null,
  DropDownMenuProps
>(({ children, dimension = 'm', ...props }, ref) => {
  const menuRef: MutableRefObject<HTMLUListElement | null> = useRef(null);

  const handleKeyDown = useCallback(
    (e) => {
      const focusedOption = (
        (menuRef.current && menuRef.current.ownerDocument) ||
        document
      ).activeElement;
      const code = keyboardKey.getCode(e);
      if (code === keyboardKey.ArrowDown) {
        moveFocus(menuRef.current, focusedOption, nextItem, true);
        e.preventDefault();
      } else if (code === keyboardKey.ArrowUp) {
        moveFocus(menuRef.current, focusedOption, previousItem, true);
        e.preventDefault();
      } else if (e.keyCode === 32) {
        e.preventDefault();
      } else if (code === keyboardKey.Home) {
        e.preventDefault();
        moveFocus(menuRef.current, null, nextItem);
      } else if (code === keyboardKey.End) {
        e.preventDefault();
        moveFocus(menuRef.current, null, previousItem);
      }
      props?.onKeyDown?.(e);
    },
    [menuRef.current, previousItem, nextItem]
  );

  useLayoutEffect(() => {
    if (menuRef.current !== document.activeElement) {
      menuRef?.current?.focus();
    }
    const focusedOption = (
      (menuRef.current && menuRef.current.ownerDocument) ||
      document
    ).activeElement;

    moveFocus(menuRef.current, focusedOption, nextItem);
  }, [menuRef, nextItem, moveFocus]);

  useEffect(() => {
    menuRef.current?.addEventListener('keydown', handleKeyDown);
    return () => {
      menuRef.current?.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuRef.current]);

  const getSizeClass = (d: DropDownDimensions) => {
    switch (d) {
      case 'm':
        return styles.SizeM;
      case 's':
        return styles.SizeS;
      case 'l':
      default:
        return styles.SizeL;
    }
  };

  return (
    <ul
      {...props}
      className={cx(
        styles.MenuList,
        props.className,
        getSizeClass(dimension),
        styles.MenuList
      )}
      ref={refSetter(ref, menuRef)}
    >
      {children}
    </ul>
  );
});
