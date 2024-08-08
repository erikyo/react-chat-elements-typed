import type { StoryObj } from "@storybook/react";

import SideBar from "./SideBar";

const meta = {
	component: SideBar,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		style: {
			width: "300px",
			height: "100vh",
		},
		top: <div>'TOP' area</div>,
		center: <div>'CENTER' area</div>,
		bottom: <div>'BOTTOM' area</div>,
	},
};

export const Dark = {
	args: {
		type: "dark",
		style: {
			width: "300px",
			height: "100vh",
		},
		top: <div>'TOP' area</div>,
		center: <div>'CENTER' area</div>,
		bottom: <div>'BOTTOM' area</div>,
	},
};

export const Light = {
	args: {
		type: "light",
		style: {
			width: "300px",
			height: "100vh",
		},
		top: <div>'TOP' area</div>,
		center: <div>'CENTER' area</div>,
		bottom: <div>'BOTTOM' area</div>,
	},
};
