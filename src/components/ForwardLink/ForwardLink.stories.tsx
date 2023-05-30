import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ForwardLink } from 'src/components/ForwardLink/ForwardLink';

export default {
  title: 'MEC Design System/Atoms/ForwardLink',
  component: ForwardLink,
} as ComponentMeta<typeof ForwardLink>;

const Template: ComponentStory<typeof ForwardLink> = (args) => (
  <ForwardLink {...args} />
);

export const Default = Template.bind({});

Default.args = {
  title: 'Ссылка',
  path: '/',
};
