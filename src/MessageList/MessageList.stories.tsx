import type { Meta, StoryObj } from '@storybook/react';

import MessageList from './MessageList';

const meta = {
  component: MessageList,
} satisfies Meta<typeof MessageList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};