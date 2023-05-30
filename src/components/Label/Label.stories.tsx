import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Label, LabelType } from './Label';

export default {
  title: 'MEC Design System/Atoms/Label',
  component: Label,
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = (args) => (
  <Label {...args}>Новости 🔥</Label>
);

export const Default = Template.bind({});

Default.parameters = { controls: { include: ['size'] } };
Default.args = {
  type: LabelType.Default,
};
