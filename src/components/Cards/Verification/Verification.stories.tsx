import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Verification } from './Verification';
import { StatusType } from '../../Status/Status';

export default {
  title: 'MEC Design System/Molecules/Cards/Verification',
  component: Verification,
} as ComponentMeta<typeof Verification>;

const Template: ComponentStory<typeof Verification> = (args) => (
  <Verification {...args} />
);

export const Default = Template.bind({});

Default.args = {
  date: '15.01.2021',
  decsription: `Копии отчетных форм, представляемых
  претендентом в Федеральную службу
  государственной статистики и (или) налоговые
  органы, и (или) государственные внеб...`,
  documentName: 'Documnet123.pdf',
  statusType: StatusType.Attention,
  statusText: 'Есть вопросы',
};
