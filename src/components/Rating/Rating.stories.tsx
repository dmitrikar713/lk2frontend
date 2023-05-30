import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Rating } from 'src/components/Rating/Rating';

export default {
  title: 'MEC Design System/Atoms/Rating',
  component: Rating,
} as ComponentMeta<typeof Rating>;

const Template: ComponentStory<typeof Rating> = (args) => {
  return <Rating {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  value: 4,
  onClick: (value) => null,
};
