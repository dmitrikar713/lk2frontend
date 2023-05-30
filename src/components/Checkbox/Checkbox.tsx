import React, { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import cx from 'classnames';

import styles from './Checkbox.module.scss';
import { FormData } from '../Form/Form';

export enum CheckboxSize {
  Large = 'Large',
  Medium = 'Medium',
  Small = 'Small',
}

export interface CheckboxProps {
  name?: string;
  label?: string;
  defaultValue?: boolean;
  size?: CheckboxSize;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  control?: Control<FormData>;
  onClick: () => void;
  hookControlled?: boolean;
  defaultRequired?: boolean;
  errors?: any;
}

export const Checkbox: FC<CheckboxProps> = ({
  name,
  label,
  defaultValue = false,
  size = CheckboxSize.Medium,
  checked = false,
  indeterminate = false,
  disabled = false,
  defaultRequired = false,
  control,
  onClick,
  hookControlled,
  errors,
}) => {
  return hookControlled ? (
    <Controller
      rules={{
        required: { value: defaultRequired, message: 'Обязательное поле' },
      }}
      render={({ field }) => (
        <>
          <label htmlFor={name} className={styles.CheckboxWrapper}>
            <input
              {...field}
              type="checkbox"
              id={name}
              disabled={disabled}
              defaultChecked={defaultValue}
              className={cx(styles.Checkbox, styles[size], {
                [styles.Checked]: field.value,
                [styles.Indeterminate]: indeterminate,
                [styles.Disabled]: disabled,
              })}
              onClick={onClick}
            />
            <span>{label}</span>
          </label>
          {name && errors[name] && !field.value && (
            <span className={styles.CheckboxError}>{errors[name].message}</span>
          )}
        </>
      )}
      control={control}
      name={name || 'checkbox'}
    />
  ) : (
    <label htmlFor={name} className={styles.CheckboxWrapper}>
      <input
        type="checkbox"
        id={name}
        checked={checked}
        className={cx(styles.Checkbox, styles[size], {
          [styles.Checked]: checked,
          [styles.Indeterminate]: indeterminate,
          [styles.Disabled]: disabled,
        })}
        onChange={onClick}
      />
      <span>{label}</span>
    </label>
  );
};
