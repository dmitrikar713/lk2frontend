import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Tooltip, TooltipType } from './Tooltip';
import { Button, ButtonSize } from 'src/components/Button/Button';

export default {
  title: 'MEC Design System/Atoms/Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => (
  <div style={{ textAlign: 'center' }}>
    <Tooltip {...args}>
      <Button size={ButtonSize.ExtraLarge}>Наведи на меня курсор</Button>
    </Tooltip>
  </div>
);

export const Default = Template.bind({});

Default.parameters = { controls: { include: ['size'] } };
Default.args = {
  type: TooltipType.Default,
  title:
    'Рейтинг, основанный на оценке ваших комментариев другими пользователями.',
};
