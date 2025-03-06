import type { Meta, StoryObj } from '@storybook/react';

import Once from '../components/Once.tsx';

const meta = {
  title: 'Example/useOnce',
  component: Once,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // tags: ['autodocs'],
} satisfies Meta<typeof Once>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
