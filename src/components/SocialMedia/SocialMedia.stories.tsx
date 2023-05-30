import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SocialMedia, SocialMediaType } from './SocialMedia';

export default {
  title: 'MEC Design System/Atoms/SocialMedia',
  component: SocialMedia,
} as ComponentMeta<typeof SocialMedia>;

const Template: ComponentStory<typeof SocialMedia> = (args) => (
  <SocialMedia {...args} />
);

export const Default = Template.bind({});

Default.args = {
  type: SocialMediaType.VK,
};
