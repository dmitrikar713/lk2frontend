import React, { useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Modal } from './Modal';
import { Button } from '../Button/Button';

export default {
  title: 'MEC Design System/Atoms/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => {
  const [isShown, setShown] = useState(false);
  return (
    <>
      <Button onClick={() => setShown(true)}>Open modal</Button>
      <Modal
        title="Modal Title"
        isShown={isShown}
        onHide={() => setShown(false)}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque deserunt
        ipsum, dignissimos incidunt quo quis! Blanditiis laborum incidunt
        possimus animi, eius dignissimos dolorem dolores asperiores molestiae
        hic adipisci repellendus debitis!
      </Modal>
    </>
  );
  return <Modal {...args} />;
};

export const Default = Template.bind({});

Default.args = {};
