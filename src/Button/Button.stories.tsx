import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "adasdasdsadsadas",
    title: "asdasdsadasdsadasdsads",
    backgroundColor: "#0b5ebf",
    color: "#f6f6f6"
  }
};