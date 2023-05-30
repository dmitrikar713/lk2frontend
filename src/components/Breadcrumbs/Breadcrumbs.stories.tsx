import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Breadcrumbs } from './Breadcrumbs';

export default {
  title: 'MEC Design System/Atoms/Breadcrumbs',
  component: Breadcrumbs,
} as ComponentMeta<typeof Breadcrumbs>;

const Template: ComponentStory<typeof Breadcrumbs> = (args) => (
  <Breadcrumbs {...args} />
);

export const Default = Template.bind({});

Default.args = {
  breadcrumbList: [
    {
      title: 'Раздел №1',
      path: '/path1',
    },
    {
      title: 'Раздел №2',
      path: '/path2',
    },
  ],
};
