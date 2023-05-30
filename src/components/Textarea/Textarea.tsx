import React, { FC } from 'react';
import cx from 'classnames';

import styles from './Textarea.module.scss';

interface TextareaProps {
  value?: string;
  placeholder?: string;
  resizable?: boolean;
  onChange?: (event: React.ChangeEvent) => void;
}

export const Textarea: FC<TextareaProps> = ({
  value,
  placeholder,
  resizable,
  onChange,
}) => (
  <textarea
    value={value}
    placeholder={placeholder ? placeholder : 'Введите текст'}
    className={cx(styles.Textarea, { [styles.TextareaResizable]: resizable })}
    onChange={onChange}
  />
);
