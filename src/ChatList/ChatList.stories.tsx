import type { Meta, StoryObj } from "@storybook/react";

import ChatList from "./ChatList";

const meta = {
	component: ChatList,
} satisfies Meta<typeof ChatList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
