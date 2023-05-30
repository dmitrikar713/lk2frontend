import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Footer } from './Footer';

export default {
  title: 'MEC Design System/Molecules/Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;

export const Default = Template.bind({});

Default.parameters = {
  controls: { include: [] },
};
Default.args = {};

export const Mobile = Template.bind({});

Mobile.args = {
  isMobile: true,
};
