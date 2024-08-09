import type { StoryObj } from "@storybook/react";

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
		...generateAvatar(),
	},
};

export const Small = {
	args: {
		...generateAvatar({ size: "small" }),
	},
};

export const Big = {
	args: {
		...generateAvatar({ size: "xlarge" }),
	},
};

export const Letter = {
	args: {
		title: "Pippo Goofy",
	},
};
