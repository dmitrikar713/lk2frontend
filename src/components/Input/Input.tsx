import React, { FC, useState } from 'react';
import cx from 'classnames';

import styles from './Input.module.scss';
import { Controller } from 'react-hook-form';
import { EyeIcon } from 'src/styles/icons/eye';
import { SearchIcon } from 'src/styles/icons/search';

export enum InputType {
  Text = 'Text',
  Password = 'Password',
  Phone = 'Phone',
  Email = 'Email',
  Search = 'Search',
  Float = 'Number',
}

export enum InputSize {
  Large = 'Large',
  Medium = 'Medium',
  Small = 'Small',
}

export interface InputProps {
  name: string;
  label: string;
  defaultValue?: string;
  type?: InputType;
  size?: InputSize;
  disabled?: boolean;
  errors?: any;
  control?: any;
  required?: boolean;
  readOnly?: boolean;
  className?: string;
}

export const Input: FC<InputProps> = ({
  name,
  type = InputType.Text,
  size = InputSize.Medium,
  label,
  defaultValue = '',
  disabled = false,
  errors,
  control,
  required = true,
  readOnly,
  className,
}) => {
  const [visible, setVisible] = useState(() => type !== InputType.Password);

  const [focused, setFocused] = useState<boolean>(false);

  const handlePhone = (
    value: string,
    nextValue: string,
    onChange: (nextValue: string) => void
  ): void => {
    const phoneNumber = nextValue.replace('+7', '').replace(/[(, ), -]/g, '');

    if (Number.isNaN(Number(phoneNumber)) || phoneNumber.length > 10) {
      return;
    }

    if (nextValue === value.slice(0, -1) && value.indexOf('+7') >= 0) {
      return onChange(nextValue);
    }

    const formatValue = Array.from(phoneNumber)
      .map((e, i) => {
        if (i === 0) {
          return '+7 (' + e;
        }
        if (i === 3) {
          return ') ' + e;
        }
        if (i === 6 || i == 8) {
          return '-' + e;
        }
        return e;
      })
      .join('');

    onChange(formatValue);
  };

  return (
    <span
      className={cx(styles.InputWrapper, className, {
        [styles.Focused]: focused,
        [styles.Error]: errors[name],
      })}
    >
      <span className={styles.InputContent}>
        <Controller
          rules={{
            required: { value: required, message: 'поле не заполнено' },
            ...(type === InputType.Email && {
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'некорректный email',
              },
            }),
            ...(type === InputType.Phone && {
              pattern: {
                value: /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/,
                message: 'некорректный телефон',
              },
            }),
            ...(type === InputType.Float && {
              pattern: {
                value: /^\d{1,12}(?:\.\d{1,2})?$/,
                message: 'число с плавающей точкой',
              },
            }),
          }}
          render={({ field: { value, onChange } }) => {
            const handleChange = (nextValue: string) => {
              if (type === InputType.Phone) {
                handlePhone(value, nextValue, onChange);
              } else {
                onChange(nextValue);
              }
            };

            return (
              <>
                {(value || errors[name]) && (
                  <span className={styles.InputLabel}>
                    {label}{' '}
                    {errors[name] && (
                      <span className={styles.Message}>
                        ({errors[name].message})
                      </span>
                    )}
                  </span>
                )}
                <input
                  type={
                    type === InputType.Password && !visible
                      ? 'password'
                      : type === InputType.Float
                      ? 'number'
                      : 'text'
                  }
                  step={'0.1'}
                  required={required}
                  value={value}
                  disabled={disabled}
                  placeholder={errors[name] ? '' : label}
                  className={cx(styles.Input, styles[type], styles[size])}
                  onChange={(e) => handleChange(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  readOnly={readOnly}
                />
              </>
            );
          }}
          control={control}
          name={name}
          defaultValue={defaultValue}
        />
      </span>
      {(type === InputType.Password || type === InputType.Search) && (
        <span
          className={styles.InputSuffix}
          onClick={() => setVisible(!visible)}
        >
          {type === InputType.Password ? (
            <EyeIcon open={visible} />
          ) : (
            <SearchIcon />
          )}
        </span>
      )}
    </span>
  );
};
