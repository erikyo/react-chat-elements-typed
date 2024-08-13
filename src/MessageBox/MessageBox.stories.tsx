import type { StoryObj } from "@storybook/react";

import MessageBox from "./MessageBox";
import type { MessageBoxType } from "../types";
import type { FC } from "react";
import {
	reply,
	audioMessage,
	fileMessage,
	locationMessage,
	meetingMessage,
	messageDefaultdata,
	messageWithReply,
	photoMessage,
	systemMessage,
	videoMessage,
	meetingLinkMessage,
} from "../stories/utils/MessageTypes";
import { getAvatar } from "../stories/utils/common";

const meta = {
	component: MessageBox satisfies FC<MessageBoxType>,
	parameters: {
		backgrounds: {
			default: "light",
			values: [
				{ name: "light", value: "#eeeae2" },
				{ name: "dark", value: "#565656", default: true },
			],
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		...messageDefaultdata(),
		type: "text",
		id: "1",
		title: "Title",
		titleColor: "rgba(0, 48, 255, 1)",
		text: "Text",
		content: null,
		status: "read",
		position: "left",
		focus: true,
		date: +new Date(),
		avatar: getAvatar("avatar1"),
		retracted: false,
		forwarded: true,
		replyButton: true,
		removeButton: true,
		EmojiButton: true,
		statusTitle: "Status Title",
		notch: true,
		className: "custom-classname",
	},
};

export const Simple = {
	args: {
		type: "text",
		id: "10",
		text: "Text",
	},
};

export const Reacted = {
	args: {
		type: "text",
		id: "10",
		text: "Text",
		EmojiButton: true,
		reactions: [
			{
				author: "me",
				emoji: "👍",
			},
			{
				author: "Pippo",
				emoji: "❤",
			},
		],
	},
};

export const customStyle = {
	args: {
		type: "text",
		id: "10",
		text: "Text",
		style: {
			fontFamily: "cursive",
			backgroundColor: "red",
			color: "white",
			fontSize: "20px",
			border: "2px solid orange",
			boxSizing: "border-box",
		},
		notchStyle: {
			fill: "orange",
		},
	},
};

export const Reply = {
	args: {
		...messageDefaultdata(),
		type: "text",
		reply: reply,
		forwarded: true,
		forwardedMessageText: "Reply",
		position: "left",
		text: "This is a reply",
	},
};

export const Retracted = {
	args: {
		...messageDefaultdata(),
		type: "text",
		id: "1",
		retracted: true,
		text: "Retracted Text",
		content: "Content",
		status: "read",
		position: "left",
	},
};

export const Photo = {
	args: {
		...photoMessage(),
		position: "left",
	},
};

export const Location = {
	args: {
		...locationMessage(),
		position: "left",
	},
};

export const FileMessage = {
	args: {
		...fileMessage(),
		position: "left",
		text: "File Message",
	},
};

export const AudioMessage = {
	args: {
		...audioMessage(),
		position: "left",
	},
};

export const Video = {
	args: {
		...videoMessage(),
		position: "left",
	},
};

export const System = {
	args: {
		...systemMessage(),
		position: "left",
	},
};

export const ReplyMessage = {
	args: {
		...messageWithReply(),
		position: "left",
		title: "Title",
	},
};

export const Meeting = {
	args: {
		...meetingMessage(),
		position: "left",
	},
};

export const MeetingLink = {
	args: {
		...meetingLinkMessage(),
		position: "left",
	},
};
