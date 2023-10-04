import React, {
  useState,
  HTMLAttributes,
  useRef,
  isValidElement,
  cloneElement,
  Children,
  MouseEvent,
  KeyboardEvent,
  forwardRef,
  ReactElement,
  ReactNode,
} from 'react';
import { PositionInPortal } from './PositionInPortal';

import styles from './Select.module.scss';
import cx from 'classnames';
import { refSetter } from 'src/common/utils/refSetter';
import { useClickOutside } from 'src/common/hooks/useClickOutside';
import { DropDownMenu } from 'src/components/DropDown/DropDown';
import { keyboardKey } from 'src/common/utils/keyboardKey';

export type SelectDimension = 'xl' | 'm' | 's';

export interface SelectProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Отключение селекта */
  disabled?: boolean;
  /** Размер Меню */
  dimension?: SelectDimension;
  /** Значение селекта */
  value: string;
  // Поля для компонента Form
  name?: string;
  label?: string;
  type?: string;
  /** Функция, которая возвращает реакт-компонент
   *  с контентом для отображения в cелекте */
  renderInputValue: (value: string) => string | ReactNode;
  /** Обработчик для изменения состояния селекта */
  onChange: (value: string) => void;
}

// eslint-disable-next-line react/display-name
export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      children,
      renderInputValue,
      className,
      disabled = false,
      dimension = 'm',
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [focused, setFocused] = useState(false);

    const refWrapper = useRef<HTMLDivElement>(null);

    const handleKeyDownItem = (e: KeyboardEvent) => {
      const code = keyboardKey.getCode(e);
      e.preventDefault();
      const value =
        (e?.currentTarget as HTMLElement).getAttribute('value') ?? '';
      if (code === keyboardKey.Enter || code === keyboardKey[' ']) {
        setOpen(false);
        onChange && onChange(value);
        (refWrapper.current as HTMLElement).focus();
      } else if (code === keyboardKey.Escape || code === keyboardKey.Tab) {
        setOpen(false);
        (refWrapper.current as HTMLElement).focus();
      }
    };
    const handleClickItem = (e: MouseEvent, disabled: boolean) => {
      const value =
        (e?.currentTarget as HTMLElement).getAttribute('value') ?? '';
      !disabled && onChange && onChange(value);
    };

    let detectedSubGroup = false;

    const renderChildrenDropDown = () => {
      return Children.map(children, (child: React.ReactNode) => {
        if (!isValidElement(child)) {
          return null;
        }

        detectedSubGroup = child.props.children?.some?.(
          (element: ReactElement) => Array.isArray(element)
        );

        if (detectedSubGroup) {
          return child.props.children.flat().map((child: ReactElement) => {
            return cloneElement(child, {
              disabled: disabled || child?.props?.disabled,
              onMouseDown: (e: MouseEvent) =>
                handleClickItem(e, child.props.disabled),
              onTouchStart: (e: MouseEvent) => {
                e.stopPropagation();
              },
              onKeyDown: handleKeyDownItem,
              dimension: dimension === 'xl' ? 'l' : dimension,
              selected: value?.toString() === child.props.value?.toString(),
              ...child.props,
            });
          });
        }

        return cloneElement(child, {
          disabled: disabled || child.props.disabled,
          onMouseDown: (e: MouseEvent) =>
            handleClickItem(e, child.props.disabled),
          onTouchStart: (e: MouseEvent) => {
            e.stopPropagation();
          },
          onKeyDown: handleKeyDownItem,
          dimension: dimension === 'xl' ? 'l' : dimension,
          selected: value?.toString() === child.props.value?.toString(),
          ...child.props,
        });
      });
    };

    const clickOutside = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName !== 'UL') {
        setOpen(false);
        setFocused(false);
      }
    };

    useClickOutside([refWrapper.current], clickOutside);

    const Icon = open ? (
      <i className="mi-chevron-up" />
    ) : (
      <i className="mi-chevron-down" />
    );

    const hendleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      const code = keyboardKey.getCode(e);
      if (code === keyboardKey[' '] && !disabled && !open) {
        setOpen(true);
        setFocused(true);
        e.preventDefault();
      } else if (code === keyboardKey.Tab) {
        if (!open) {
          setFocused(false);
        }
      }
      props.onKeyDown?.(e);
    };

    const onClick = (e: MouseEvent<HTMLDivElement>) => {
      if (!disabled) {
        setOpen(!open);
        setFocused(true);
      }
      props.onClick?.(e);
    };

    const renderSelectValue = () =>
      props.placeholder && !value ? (
        <div className={cx(styles.Placeholder)}>{props.placeholder}</div>
      ) : (
        renderInputValue(value)
      );

    const clickWrapperIcon = (e: MouseEvent) => {
      if (!disabled) {
        e.preventDefault();
        setOpen(!open);
        setFocused(true);
        e.stopPropagation();
      }
    };

    const getDimensionClass = (d: SelectDimension) => {
      switch (d) {
        case 'm':
          return styles.SizeM;
        case 's':
          return styles.SizeS;
        case 'xl':
        default:
          return styles.SizeXL;
      }
    };

    return (
      <div
        className={cx(
          styles.SelectWrapper,
          className,
          disabled && styles.Disabled,
          focused && styles.Focused,
          getDimensionClass(dimension)
        )}
        ref={refSetter(ref, refWrapper)}
        role="button"
        {...props}
        onKeyDown={hendleKeyDown}
        tabIndex={disabled ? -1 : 0}
        onClick={onClick}
      >
        <div className={cx(styles.Select)}>
          <div className={styles.SelectValue}>{renderSelectValue()}</div>
          <div
            className={cx(styles.WrapperIcon)}
            onMouseDown={clickWrapperIcon}
          >
            {Icon}
          </div>
        </div>
        {open && (
          <PositionInPortal open={open} targetRef={refWrapper}>
            <DropDownMenu
              className={cx(styles.DropDown, 'select-list')}
              role="listbox"
              tabIndex={-1}
            >
              {renderChildrenDropDown()}
            </DropDownMenu>
          </PositionInPortal>
        )}
      </div>
    );
  }
);
