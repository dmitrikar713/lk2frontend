import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ProfileInfo } from './ProfileInfo';

export default {
  title: 'MEC Design System/Molecules/Cards/ProfileInfo',
  component: ProfileInfo,
} as ComponentMeta<typeof ProfileInfo>;

const Template: ComponentStory<typeof ProfileInfo> = (args) => (
  <ProfileInfo {...args} />
);

export const Default = Template.bind({});

Default.args = {};
