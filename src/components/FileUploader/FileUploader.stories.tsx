import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FileUploader } from './FileUploader';

export default {
  title: 'MEC Design System/Atoms/FileUploader',
  component: FileUploader,
} as ComponentMeta<typeof FileUploader>;

const Template: ComponentStory<typeof FileUploader> = (args) => (
  <FileUploader {...args} />
);

export const Default = Template.bind({});

const handleUpload = (fList: FileList) => {
  return;
};

Default.args = {
  onUpload: handleUpload,
};
