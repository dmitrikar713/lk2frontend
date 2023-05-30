import React from "react";
import { addDecorator } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'MEC',
    values: [
      {
        name: 'White',
        value: '#ffffff',
      },
      {
        name: 'Figma',
        value: '#e5e5e5',
      },
      {
        name: 'MEC',
        value: '#f2f2f2',
      },
    ],
  }
}