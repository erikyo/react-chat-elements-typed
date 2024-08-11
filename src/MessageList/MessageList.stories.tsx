import type { StoryObj } from "@storybook/react";

import MessageList from "./MessageList";

import { randomMessage } from "../stories/example/components/RandomMessage";
import { systemMessage, textMessage } from "../stories/utils/MessageTypes";

const meta = {
	component: MessageList,
	parameters: {
		backgrounds: {
			default: "green",
			values: [
				{ name: "green", value: "#35A782" },
				{ name: "dark", value: "#aaa", default: true },
			],
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		dataSource: [
			{ ...systemMessage(), text: "system message", id: "system" },
			...Array.from({ length: 10 }).map((_, i) => {
				return textMessage(i);
			}),
		],
	},
};
