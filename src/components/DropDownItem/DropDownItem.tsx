import React, { HTMLAttributes, forwardRef } from 'react';
import cx from 'classnames';
import styles from './DropDownItem.module.scss';

export type DropDownItemDimension = 'l' | 'm' | 's';
export interface DropDownItemProps extends HTMLAttributes<HTMLLIElement> {
  /** Отключение секции */
  disabled?: boolean;
  /** Размер DropDownItems */
  dimension?: DropDownItemDimension;
  /** Активная секция DropDownItems */
  selected?: boolean;
  /** Значение DropDownItems */
  value?: string | number | undefined;
}

// eslint-disable-next-line react/display-name
export const DropDownItem = forwardRef<HTMLLIElement, DropDownItemProps>(
  (
    { children, disabled = false, dimension = 'm', selected = false, ...props },
    ref
  ) => {
    const getDimensionClass = (d: DropDownItemDimension) => {
      switch (d) {
        case 'l':
          return styles.SizeL;
        case 'm':
        default:
          return styles.SizeM;
        case 's':
          return styles.SizeS;
      }
    };

    return (
      <li
        className={cx(
          styles.Item,
          disabled && styles.Disabled,
          selected && styles.Selected,
          getDimensionClass(dimension)
        )}
        ref={ref}
        tabIndex={props.tabIndex ? props.tabIndex : -1}
        {...props}
      >
        {children}
      </li>
    );
  }
);
