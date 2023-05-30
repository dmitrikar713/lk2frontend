import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThreeDots } from 'src/components/ThreeDots/ThreeDots';

export default {
  title: 'MEC Design System/Atoms/ThreeDots',
  component: ThreeDots,
} as ComponentMeta<typeof ThreeDots>;

const Template: ComponentStory<typeof ThreeDots> = (args) => (
  <ThreeDots {...args} />
);

export const Default: ComponentStory<typeof ThreeDots> = Template.bind({});

Default.parameters = {
  controls: { include: ['type', 'size'] },
};
Default.args = {
  onClick: () => null,
};
