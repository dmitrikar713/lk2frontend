import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Notification, NotificationSize } from './Notification';

export default {
  title: 'MEC Design System/Atoms/Notification',
  component: Notification,
} as ComponentMeta<typeof Notification>;

const Template: ComponentStory<typeof Notification> = (args) => (
  <Notification {...args}>
    Moscow.Business — сайт Департамента предпринимательства и инновационного
    развития города Москвы. Для предпринимателей, зарегистрированных в Москве,
    здесь 50+ сервисов по поддержке бизнеса — от субсидий до помощи с выходом на
    внешние рынки, и подробные инструкции по работе с московскими властями. Наше
    медиа о тех, кто делает бизнес в столице.
  </Notification>
);

export const Default = Template.bind({});

Default.parameters = {
  controls: { include: ['size'] },
};
Default.args = {
  size: NotificationSize.SizeS,
};

export const WithPreview = Template.bind({});

WithPreview.args = {
  size: NotificationSize.SizeS,
  shorthand: true,
};
