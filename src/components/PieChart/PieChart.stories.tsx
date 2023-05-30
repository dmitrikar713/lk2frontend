import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PieChart } from './PieChart';

export default {
  title: 'MEC Design System/Atoms/PieChart',
  component: PieChart,
} as ComponentMeta<typeof PieChart>;

const Template: ComponentStory<typeof PieChart> = (args) => (
  <PieChart {...args} />
);

export const Default = Template.bind({});

Default.args = {
  size: 100,
  lineWidth: 17.5,
  colors: ['#ff4361', '#aaaaaa'],
  data: [40, 60],
};
