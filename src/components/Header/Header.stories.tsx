import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Header } from './Header';

export default {
  title: 'MEC Design System/Molecules/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});

Default.parameters = {
  controls: { include: [] },
};
Default.args = {};
