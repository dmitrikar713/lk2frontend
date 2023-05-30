import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Checkbox, CheckboxSize } from './Checkbox';

export default {
  title: 'MEC Design System/Atoms/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args}>Label</Checkbox>
);

export const Default = Template.bind({});

Default.parameters = { controls: { include: ['size'] } };
Default.args = {
  size: CheckboxSize.Medium,
};

export const Checked = Template.bind({});

Checked.parameters = { controls: { include: ['size', 'checked'] } };
Checked.args = {
  checked: true,
};

export const Indeterminate = Template.bind({});

Indeterminate.parameters = { controls: { include: ['size', 'indeterminate'] } };
Indeterminate.args = {
  indeterminate: true,
};

export const Disabled = Template.bind({});

Disabled.parameters = {
  controls: { include: ['size', 'checked'] },
};
Disabled.args = {
  checked: true,
  disabled: true,
};

export const Large = Template.bind({});

Large.parameters = { controls: { include: ['size'] } };
Large.args = {
  size: CheckboxSize.Large,
  checked: true,
};
