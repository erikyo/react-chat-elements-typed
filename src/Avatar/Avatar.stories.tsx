import type { Meta, StoryObj } from "@storybook/react";

import Avatar from "./Avatar";
import { generateAvatar } from "../stories/utils";

const meta = {
	component: Avatar,
	render: (args) => (
		<div style={{ width: 250, height: 250 }}>
			<Avatar {...args} />
		</div>
	),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		...generateAvatar(24),
	},
};

export const small = {
	args: {
		...generateAvatar(1, { size: "small" }),
	},
};

export const big = {
	args: {
		...generateAvatar(1, { size: "xlarge" }),
	},
};
