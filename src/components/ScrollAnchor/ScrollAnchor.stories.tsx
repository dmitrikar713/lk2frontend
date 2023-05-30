import React, { useRef } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ScrollAnchor } from './ScrollAnchor';

export default {
  title: 'MEC Design System/Atoms/ScrollAnchor',
  component: ScrollAnchor,
} as ComponentMeta<typeof ScrollAnchor>;

const Template: ComponentStory<typeof ScrollAnchor> = () => {
  const mainSectionRef = useRef<HTMLDivElement | null>(null);
  return (
    <>
      <ScrollAnchor title={'Заголовок'} anchorRef={mainSectionRef} />
      <div style={{ marginTop: '1000px' }} ref={mainSectionRef}>
        <p>Контент</p>
      </div>
    </>
  );
};

export const Default = Template.bind({});
