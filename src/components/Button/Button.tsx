import React, { FC, ReactElement } from 'react';
import cx from 'classnames';

import styles from './Button.module.scss';
import Toast from '../Toast';
import { checkMobileScreen } from 'src/common/utils/checkMobileScreen';

export enum ButtonType {
  Primary = 'Primary',
  Secondary = 'Secondary',
  Text = 'Text',
}

export enum Type {
  Button = 'button',
  Submit = 'submit',
}

export enum ButtonSize {
  ExtraLarge = 'ExtraLarge',
  Large = 'Large',
  Medium = 'Medium',
  Small = 'Small',
}

export interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  icon?: ReactElement;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  buttonType?: Type;
  checkMobile?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children: label,
  type = ButtonType.Primary,
  size = ButtonSize.Medium,
  icon = null,
  disabled = false,
  className,
  onClick,
  buttonType = Type.Submit,
  checkMobile,
}) => {
  if (checkMobile && checkMobileScreen()) {
    onClick = () => {
      Toast(
        'Для подписания документов необходимо перейти в полную версию Личного кабинета с персонального компьютера',
        {
          type: 'error',
        }
      );
    };
  }

  return (
    <button
      className={cx(styles.Button, styles[type], styles[size], className)}
      disabled={disabled}
      onClick={onClick}
      type={buttonType}
    >
      {icon && <div className={styles.ButtonIcon}>{icon}</div>}
      {label}
    </button>
  );
};
