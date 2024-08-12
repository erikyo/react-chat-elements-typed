import type { StoryObj } from "@storybook/react";

import ChatList from "./ChatList";
import { chatListArray } from "../stories/utils/MessageTypes";
import { token } from "../stories/utils/common";

const meta = {
	component: ChatList,
};

export default meta;

type Story = StoryObj<typeof meta>;

const chatList = Array(token(4) + 4)
	.fill(0)
	.map((e, i) => chatListArray(i));

export const Default = {
	args: {
		dataSource: chatList,
	},
};
