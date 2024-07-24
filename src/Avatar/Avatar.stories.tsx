import type { Meta, StoryObj } from "@storybook/react";

import Avatar from "./Avatar";
import { generateAvatar } from "../stories/utils";

const meta = {
	component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		...generateAvatar(),
	},
};
