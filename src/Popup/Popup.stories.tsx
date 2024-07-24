import type { Meta, StoryObj } from "@storybook/react";

import Popup from "./Popup";

const meta = {
	component: Popup,
} satisfies Meta<typeof Popup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		popup: {},
		title: "Popup Title",
	},
};
