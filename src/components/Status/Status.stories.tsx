import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Status, StatusSize, StatusType } from './Status';

export default {
  title: 'MEC Design System/Atoms/Status',
  component: Status,
} as ComponentMeta<typeof Status>;

const Template: ComponentStory<typeof Status> = (args) => <Status {...args} />;

export const Default: ComponentStory<typeof Status> = Template.bind({});

Default.parameters = {
  controls: { include: ['type', 'size'] },
};
Default.args = {
  size: StatusSize.Normal,
  type: StatusType.Pending,
  text: 'В процессе обработки',
};

export const Filled = Template.bind({});

Filled.parameters = {
  controls: { include: ['type', 'filled'] },
};
Filled.args = {
  size: StatusSize.Normal,
  type: StatusType.Draft,
  text: 'Черновик',
  filled: true,
};
