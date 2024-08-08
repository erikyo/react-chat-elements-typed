import type { Meta, StoryObj } from "@storybook/react";

import Navbar from "./Navbar";
import { IconEmoji } from "../SvgIcon/IconEmoji";

const meta = {
	component: Navbar,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		left: "left",
		right: "right",
		center: (
			<>
				<IconEmoji />
				<IconEmoji />
				<IconEmoji />
				<IconEmoji />
			</>
		),
		style: {},
	},
};

export const Light = {
	args: {
		left: "left",
		right: "right",
		center: "center",
		type: "light",
		style: {},
	},
};

export const Dark = {
	args: {
		left: "left",
		right: "right",
		center: "center",
		type: "dark",
		style: {},
	},
};
