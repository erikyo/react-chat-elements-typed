import type { Meta, StoryObj } from "@storybook/react";

import ChatList from "./ChatList";
import { chatListArray } from "../stories/example/utils/MessageTypes";

const meta = {
	component: ChatList,
} satisfies Meta<typeof ChatList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		dataSource: Array.from({ length: 10 }).map((_, i) => chatListArray()),
	},
};
