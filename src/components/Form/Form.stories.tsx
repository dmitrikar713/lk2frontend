import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Form, FormData } from './Form';
import { Input } from '../Input/Input';
import { SubmitHandler } from 'react-hook-form';

export default {
  title: 'MEC Design System/Molecules/Form',
  component: Form,
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = (args) => {
  const onSubmit: SubmitHandler<FormData> = (data) => null;

  return (
    <Form {...args} onSubmit={onSubmit}>
      <Input name="firstName" label="Имя" />
      <Input name="secondName" label="Фамилия" />
    </Form>
  );
};

export const SimpleForm = Template.bind({});
