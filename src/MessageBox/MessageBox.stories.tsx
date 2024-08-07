import type { StoryObj } from "@storybook/react";

import MessageBox from "./MessageBox";
import type { MessageBoxType } from "../types";
import type { FC } from "react";
import { getAvatar, photo } from "../stories/example/utils/common";

const meta = {
	component: MessageBox satisfies FC<MessageBoxType>,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		type: "text",
		id: "1",
		title: "Title",
		titleColor: "rgba(0, 48, 255, 1)",
		text: "Text",
		content: null,
		status: "read",
		position: "left",
		focus: false,
		date: +new Date(),
		dateString: "now",
		avatar: getAvatar("avatar1"),
		retracted: false,
		forwarded: false,
		replyButton: false,
		removeButton: false,
		statusTitle: "Status",
		notch: true,
		copiableDate: true,
		className: "custom-classname",
		letterItem: null,
		reply: null,
		actionButtons: null,
	},
};

export const Simple = {
	args: {
		type: "text",
		id: "10",
		text: "Text",
	},
};

export const Reply = {
	args: {
		type: "text",
		id: "1",
		title: "Title",
		titleColor: "red",
		content: "Content",
		status: "waiting",
		position: "left",
		text: "Text",
		reply: {
			src: photo(),
			title: "Reply title",
			message: "Reply text",
			titleColor: "blue",
		},
		message: "Message text",
		replyButton: true,
	},
};

export const Forwarded = {
	args: {
		type: "text",
		id: "1",
		title: "Title",
		forwardedMessageText: "Forwarded",
		titleColor: "red",
		text: "Text",
		content: "Content",
		status: "read",
	},
};

export const Retracted = {
	args: {
		type: "text",
		id: "1",
		retracted: true,
		text: "Text",
		content: "Content",
		status: "read",
	},
};
