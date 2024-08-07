import type { Meta, StoryObj } from "@storybook/react";
import ChatItem from "./ChatItem";
import { chatListArray } from "../stories/example/utils/MessageTypes";

const meta = {
	component: ChatItem,
} satisfies Meta<typeof ChatItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		...chatListArray(),
	},
};
