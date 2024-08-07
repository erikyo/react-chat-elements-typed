import type { Meta, StoryObj } from "@storybook/react";

import MessageListExample from "./components/MessageListExample";

const meta = {
	component: MessageListExample,
	parameters: {
		layout: "fullscreen",
	},
} satisfies Meta<typeof MessageListExample>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
