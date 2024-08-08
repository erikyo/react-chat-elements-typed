import type { StoryObj } from "@storybook/react";

import MessageList from "./MessageList";
import {
	systemMessage,
	textMessage,
} from "../stories/example/utils/MessageTypes.ts";

import { randomMessage } from "../stories/example/components/RandomMessage";

const meta = {
	component: MessageList,
	parameters: {
		backgrounds: {
			default: "dark",
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
		downButton: true,
		dataSource: [
			systemMessage,
			...Array.from({ length: 10 }).map((_, i) => {
				return textMessage(i);
			}),
			...Array.from({ length: 5 }).map((_, i) => {
				return randomMessage("random", i);
			}),
		],
	},
};
