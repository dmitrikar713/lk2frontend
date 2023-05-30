import React, { ReactNode, Children, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StringObject } from 'src/entities/BaseTypes';
import { Button, Type } from '../Button/Button';

import styles from './Form.module.scss';

export interface FormData {
  [key: string]: any;
}

export interface FormProps {
  defaultValues?: FormData;
  children: Array<JSX.Element> | JSX.Element;
  onSubmit: SubmitHandler<FormData>;
  draftRequest?: boolean;
  submitTitle?: string;
  isDisabledOriginally?: boolean;
  readonly?: boolean;
  checkedVales?: any;
  isCheckedAll?: boolean;
  dataToChange?: StringObject;
  changeTracking?: boolean;
}

export const Form = ({
  defaultValues,
  children,
  onSubmit,
  draftRequest,
  submitTitle,
  isDisabledOriginally = false,
  readonly,
  checkedVales,
  isCheckedAll,
  dataToChange,
  changeTracking,
}: FormProps) => {
  const { formState, handleSubmit, control, setValue } = useForm<FormData>({
    defaultValues,
    mode: 'onChange',
  });

  // const formValue = getValues();

  // const [buttonDisabled, setButtonDisabled] =
  //   useState<boolean>(isDisabledOriginally);

  // useEffect(() => {
  //   changeTracking &&
  //   JSON.stringify(defaultValues) === JSON.stringify(formValue)
  //     ? setButtonDisabled(true)
  //     : setButtonDisabled(false);
  // }, [formValue]);

  useEffect(() => {
    checkedVales &&
      checkedVales.map((section: any) => {
        section && section.map((input: any) => setValue(input, isCheckedAll));
      });
  }, [isCheckedAll]);

  useEffect(() => {
    dataToChange &&
      Object.keys(dataToChange).map((field) => {
        dataToChange[field] && setValue(field, dataToChange[field]);
      });
  }, [dataToChange]);

  const hydrateInput = (item: any) => ({
    ...item,
    props: {
      ...item.props,
      key: item.props.name,
      control,
      errors: formState.errors,
    },
  });

  const bypassChildren = (children: ReactNode): ReactNode =>
    Children.map(Children.toArray(children), (child: any) => {
      if (child.props && child.props.children) {
        return {
          ...child,
          props: {
            ...child.props,
            children: bypassChildren(child.props.children),
          },
        };
      }
      if (child.props?.name) return hydrateInput(child);
      return child;
    });

  return (
    <form className={styles.Form}>
      {bypassChildren(children)}
      {!readonly && (
        <Button
          onClick={() => handleSubmit(onSubmit)().then(() => formState.isValid)}
          buttonType={Type.Button}
          className={styles.FormSubmit}
          disabled={false}
        >
          {submitTitle || 'Сохранить'}
        </Button>
      )}
    </form>
  );
};
