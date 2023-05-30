import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Radio, RadioSize } from './Radio';

export default {
  title: 'MEC Design System/Atoms/Radio',
  component: Radio,
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = (args) => (
  <Radio {...args}>Label</Radio>
);

export const Default = Template.bind({});

Default.parameters = { controls: { include: ['size'] } };
Default.args = {};

export const Selected = Template.bind({});

Selected.parameters = { controls: { include: ['size'] } };
Selected.args = {
  selected: true,
};

export const Disabled = Template.bind({});

Disabled.parameters = {
  controls: { include: ['size', 'selected'] },
};
Disabled.args = {
  selected: true,
  disabled: true,
};

export const Large = Template.bind({});

Large.parameters = { controls: { include: ['size'] } };
Large.args = {
  size: RadioSize.Large,
  selected: true,
};
