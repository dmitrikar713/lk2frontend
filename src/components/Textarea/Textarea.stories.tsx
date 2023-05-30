import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Textarea } from 'src/components/Textarea/Textarea';

export default {
  title: 'MEC Design System/Atoms/Textarea',
  component: Textarea,
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = (args) => (
  <Textarea {...args} />
);

export const Default: ComponentStory<typeof Textarea> = Template.bind({});

Default.args = {
  value: `Lorem ipsum dolor sit amet consectetur adipisicing elit`,
  resizable: true,
};
