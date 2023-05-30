import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DocumentUploader } from 'src/components/DocumentUploader/DocumentUploader';

export default {
  title: 'MEC Design System/Atoms/DocumentUploader',
  component: DocumentUploader,
} as ComponentMeta<typeof DocumentUploader>;

const Template: ComponentStory<typeof DocumentUploader> = (args) => (
  <div style={{ width: '300px' }}>
    <DocumentUploader {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  documentName: 'Документ',
};
