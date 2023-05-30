import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Skeleton } from 'src/components/Skeleton/Skeleton';

export default {
  title: 'MEC Design System/Atoms/Skeleton',
  component: Skeleton,
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => (
  <Skeleton {...args} />
);

export const Default = Template.bind({});

Default.args = {
  rows: 2,
  withLogo: true,
  withTitle: true,
};
