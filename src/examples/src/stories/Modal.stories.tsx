import type { Meta, StoryObj } from '@storybook/react';

import Modal from '../components/Modal';

const meta = {
	title: 'Example/useModal',
	component: Modal,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
