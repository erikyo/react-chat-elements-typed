import type { StoryObj } from "@storybook/react";
import ChatItem from "./ChatItem";
import { chatListArray } from "../stories/utils/MessageTypes";

const meta = {
	component: ChatItem,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: chatListArray(),
};
