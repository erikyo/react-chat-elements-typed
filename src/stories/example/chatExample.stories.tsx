import type { Meta, StoryObj } from "@storybook/react";

import Index from "./components";

const meta = {
	component: Index,
	parameters: {
		layout: "fullscreen",
	},
	argTypes: {
		theme: {
			control: "select",
			options: ["light", "dark"],
		},
		toolbar: {
			control: false,
		},
	},
} satisfies Meta<typeof Index>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
