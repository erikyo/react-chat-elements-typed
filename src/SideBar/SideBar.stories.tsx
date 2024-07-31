import type { Meta, StoryObj } from "@storybook/react";

import SideBar from "./SideBar";

const meta = {
	component: SideBar,
} satisfies Meta<typeof SideBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		style: {
			width: "300px",
			height: "100vh",
		},
		data: {
			top: <div>'TOP' area</div>,
			center: <div>'CENTER' area</div>,
			bottom: <div>'BOTTOM' area</div>,
		},
	},
};

export const Light: Story = {
	args: {
		type: "light",
		style: {
			width: "300px",
			height: "100vh",
		},
		data: {
			top: <div>'TOP' area</div>,
			center: <div>'CENTER' area</div>,
			bottom: <div>'BOTTOM' area</div>,
		},
	},
};
