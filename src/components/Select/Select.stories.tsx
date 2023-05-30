import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Select } from './Select';
import { DropDownItem } from '../DropDownItem/DropDownItem';

export default {
  title: 'MEC Design System/Atoms/Select',
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => (
  <Select {...args}>
    <DropDownItem role="option" value="1" key="1">
      {'Значение1'}
    </DropDownItem>
    <DropDownItem role="option" value="2" key="2">
      {'Значение2'}
    </DropDownItem>
  </Select>
);

export const Default: ComponentStory<typeof Select> = Template.bind({});

Default.parameters = {
  controls: { include: ['type', 'size'] },
};
Default.args = {
  value: 'Значение',
  renderInputValue: () => 'Выбрать',
  onChange: () => null,
};
