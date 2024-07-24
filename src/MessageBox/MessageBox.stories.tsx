import type { Meta, StoryObj } from '@storybook/react';

import MessageBox from './MessageBox';

const meta = {
  component: MessageBox,
} satisfies Meta<typeof MessageBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};