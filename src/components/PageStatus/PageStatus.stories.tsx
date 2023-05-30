import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PageStatus } from './PageStatus';
import { StatusCode } from 'src/api/StatusCode';

export default {
  title: 'MEC Design System/Atoms/PageStatus',
  component: PageStatus,
} as ComponentMeta<typeof PageStatus>;

const Template: ComponentStory<typeof PageStatus> = (args) => (
  <PageStatus {...args} />
);

export const PageNotFound = Template.bind({});

// PageNotFound.parameters = { controls: { include: ['size'] } };
PageNotFound.args = {
  status: StatusCode.NotFound,
};

export const WithoutButton = Template.bind({});

// PageNotFound.parameters = { controls: { include: ['size'] } };
WithoutButton.args = {
  status: StatusCode.NotFound,
  homeButton: false,
};
