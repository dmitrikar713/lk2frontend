import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Input, InputProps, InputType } from './Input';
import { Form } from 'src/components/Form/Form';

export default {
  title: 'MEC Design System/Atoms/Input',
  component: Input,
  parameters: {
    backgrounds: {
      default: 'White',
    },
    controls: { include: [] },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args: InputProps) => (
  <Form onSubmit={() => null} isDisabledOriginally readonly>
    <Input {...args} />
  </Form>
);

export const Text = Template.bind({});

Text.args = {
  name: 'Text',
  label: 'Label',
};

export const Password = Template.bind({});

Password.args = {
  name: 'Password',
  type: InputType.Password,
  label: 'Password',
};

export const Search = Template.bind({});

Search.args = {
  name: 'Search',
  type: InputType.Search,
  label: 'Search',
};

export const Phone = Template.bind({});

Phone.args = {
  name: 'Phone',
  type: InputType.Phone,
  label: 'Phone',
};
