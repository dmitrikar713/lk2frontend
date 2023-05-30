import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Request, RequestSize } from './Request';
import { RequestLogo } from './utils/RequestLogo';
import { StatusType } from 'src/components/Status/Status';

export default {
  title: 'MEC Design System/Molecules/Cards/Request',
  component: Request,
} as ComponentMeta<typeof Request>;

const Template: ComponentStory<typeof Request> = (args) => (
  <Request {...args} />
);

export const Default = Template.bind({});

Default.parameters = {
  controls: { include: ['status', 'size'] },
};
Default.args = {
  size: RequestSize.Large,
  date: '15.01.2021',
  title: `Возмещение затрат на
  продвижение товаров на
  маркетплейсах`,
  number: '0101201012',
  logo: <RequestLogo />,
  statusType: StatusType.Success,
  statusText: 'Успех',
};
