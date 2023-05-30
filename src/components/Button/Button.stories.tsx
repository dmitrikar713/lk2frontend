import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button, ButtonSize, ButtonType } from './Button';

export default {
  title: 'MEC Design System/Atoms/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Button Title</Button>
);

export const Primary = Template.bind({});

Primary.parameters = { controls: { include: ['size'] } };
Primary.args = {
  type: ButtonType.Primary,
  disabled: false,
};

export const Secondary = Template.bind({});

Secondary.parameters = { controls: { include: ['size'] } };
Secondary.args = {
  type: ButtonType.Secondary,
  disabled: false,
};

export const Text = Template.bind({});

Text.parameters = { controls: { include: ['size'] } };
Text.args = {
  type: ButtonType.Text,
  disabled: false,
};

export const Disabled = Template.bind({});

Disabled.parameters = { controls: { include: ['type', 'size'] } };
Disabled.args = {
  type: ButtonType.Primary,
  disabled: true,
};

export const Large = Template.bind({});

Large.parameters = { controls: { include: ['size'] } };
Large.args = {
  type: ButtonType.Primary,
  size: ButtonSize.Large,
};

export const WithIcon = Template.bind({});

WithIcon.parameters = { controls: { include: ['size'] } };
WithIcon.args = {
  type: ButtonType.Primary,
  disabled: false,
  icon: (
    <svg
      width="24"
      height="23"
      viewBox="0 0 24 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.88084 14.5975L5.52717 21.7865L11.6854 18.5388L17.7801 21.9999L16.8777 14.8642L22 9.88256L15.1109 8.64882L12.0794 1.99994L8.93359 8.48877L2 9.35573L6.88084 14.5975Z"
        stroke="white"
        strokeMiterlimit="10"
      />
    </svg>
  ),
};
