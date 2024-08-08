import type { Meta, StoryObj } from "@storybook/react";

import ChatList from "./ChatList";
import { chatListArray } from "../stories/example/utils/MessageTypes";

const meta = {
	component: ChatList,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		dataSource: Array.from({ length: 10 }).map((_, i) => chatListArray()),
	},
};
