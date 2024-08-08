import { loremIpsum } from "lorem-ipsum";
import {
	getAvatar,
	getRandomColor,
	getRandomInRange,
	photo,
	token,
} from "./common";
import { MdOutlineVideoCall } from "react-icons/md";
import type { MessageType } from "../../../types";

export const getMessageId = (index: number) => {
	return index;
};

export const photoMessage: MessageType = {
	type: "photo",
	id: loremIpsum({ count: 1, units: "words" }),
	position: token() >= 1 ? "right" : "left",
	title: loremIpsum({ count: 2, units: "words" }),
	focus: true,
	date: +new Date(),
	forwarded: true,
	replyButton: true,
	removeButton: true,
	notch: true,
	retracted: false,
	text: loremIpsum({ count: 1, units: "sentences" }),
	titleColor: getRandomColor(),
	status: "waiting",
	statusTitle: token() >= 5 ? "Desktop" : "Mobile",
	data: {
		uri: photo(),
		status: {
			click: () => {},
			download: () => {},
			loading: false,
			error: false,
		},
		width: 300,
		height: 300,
	},
};

export const photoMessageMinimal: MessageType = {
	type: "photo",
	text: "photo text",
	title: "photo title",
	date: new Date(),
};

export const locationMessage: MessageType = {
	type: "location",
	markerColor: "",
	status: "received",
	statusTitle: token() >= 5 ? "Desktop" : "Mobile",
	id: loremIpsum({ count: 1, units: "words" }),
	position: token() >= 1 ? "right" : "left",
	text: loremIpsum({ count: 1, units: "sentences" }),
	title: loremIpsum({ count: 2, units: "words" }),
	date: +new Date(),
	dateString: "now",
	avatar: getAvatar(),
	zoom: "5",
	latitude: getRandomInRange(-90, 90, 5),
	longitude: getRandomInRange(-180, 180, 5),
};

export const fileMessage: MessageType = {
	type: "file",
	data: {
		status: {
			click: () => {},
			loading: true,
			download: () => {}, //item === "video",
			error: false,
		},
		size: "100MB",
	},
	status: "sent",
	statusTitle: token() >= 5 ? "Desktop" : "Mobile",
	id: loremIpsum({ count: 1, units: "words" }),
	position: token() >= 1 ? "right" : "left",
	text: loremIpsum({ count: 1, units: "sentences" }),
	title: loremIpsum({ count: 2, units: "words" }),
	focus: false,
	date: +new Date(),
	dateString: "now",
	avatar: getAvatar(),
	titleColor: getRandomColor(),
	forwarded: true,
	replyButton: true,
	removeButton: true,
	notch: true,
	copiableDate: true,
	retracted: false,
	forwardedMessageText: "Forwarded",
	className: "",
	reply:
		token() >= 1
			? {
					photoURL: token() >= 1 ? getAvatar() : undefined,
					title: loremIpsum({ count: 2, units: "words" }),
					titleColor: getRandomColor(),
					text: loremIpsum({ count: 1, units: "sentences" }),
				}
			: undefined,
};

export const systemMessage: MessageType = {
	type: "system",
	id: String(Math.random()),
	text: loremIpsum({ count: 2, units: "words" }),
	title: loremIpsum({ count: 2, units: "words" }),
	date: +new Date(),
};

export const videoMessage: MessageType = {
	type: "video",
	id: loremIpsum({ count: 1, units: "words" }),
	position: token() >= 1 ? "right" : "left",
	text: loremIpsum({ count: 1, units: "sentences" }),
	title: loremIpsum({ count: 2, units: "words" }),
	focus: true,
	date: +new Date(),
	dateString: "now",
	avatar: getAvatar(),
	titleColor: getRandomColor(),
	forwarded: true,
	replyButton: true,
	removeButton: true,
	controlsList: "",
	status: "read",
	forwardedMessageText: "Forwarded",
	statusTitle: token() >= 5 ? "Desktop" : "Mobile",
	data: {
		uri: getAvatar(`avatar${token()}`),
		videoURL:
			token() >= 1
				? "https://www.w3schools.com/html/mov_bbb.mp4"
				: "http://www.exit109.com/~dnn/clips/RW20seconds_1.mp4",
		status: {
			click: (e) => {
				console.log(e, "click");
			},
			loading: true,
			download: (e) => {
				console.log(e, "download");
			},
			error: false,
		},
		width: 300,
		height: 200,
	},
	notch: true,
	copiableDate: true,
	retracted: false,
	className: "",
	reply:
		token() >= 1
			? {
					photoURL: token() >= 1 ? photo() : undefined,
					title: loremIpsum({ count: 2, units: "words" }),
					titleColor: getRandomColor(),
					text: loremIpsum({ count: 1, units: "sentences" }),
				}
			: undefined,
};

export const audioMessage: MessageType = {
	type: "audio",
	id: loremIpsum({ count: 1, units: "words" }),
	position: token() >= 1 ? "right" : "left",
	text: loremIpsum({ count: 1, units: "sentences" }),
	title: loremIpsum({ count: 2, units: "words" }),
	focus: true,
	date: +new Date(),
	dateString: "now",
	avatar: getAvatar(),
	titleColor: getRandomColor(),
	forwarded: true,
	replyButton: true,
	removeButton: true,
	status: "received",
	statusTitle: token() >= 5 ? "Desktop" : "Mobile",
	notch: true,
	copiableDate: true,
	retracted: false,
	className: "",
	data: {
		audioURL: "https://www.w3schools.com/html/horse.mp3",
		audioType: "audio/mp3",
		controlsList: "nodownload",
	},
	reply:
		token() >= 1
			? {
					photoURL: token() >= 1 ? photo() : undefined,
					title: loremIpsum({ count: 2, units: "words" }),
					titleColor: getRandomColor(),
					text: loremIpsum({ count: 1, units: "sentences" }),
				}
			: undefined,
};

export const meetingMessage: MessageType = {
	type: "meeting",
	message: "asd",
	id: loremIpsum({ count: 1, units: "words" }),
	position: token() >= 1 ? "right" : "left",
	text: "text",
	title: loremIpsum({ count: 2, units: "words" }),
	focus: true,
	date: +new Date(),
	dateString: "now",
	avatar: getAvatar(),
	titleColor: getRandomColor(),
	forwarded: true,
	replyButton: true,
	removeButton: true,
	status: "received",
	statusTitle: token() >= 5 ? "Desktop" : "Mobile",
	notch: true,
	copiableDate: true,
	retracted: false,
	className: "",
	forwardedMessageText: "Forwarded",
	reply:
		token() >= 1
			? {
					photoURL: token() >= 1 ? photo() : undefined,
					title: loremIpsum({ count: 2, units: "words" }),
					titleColor: getRandomColor(),
					text: loremIpsum({ count: 1, units: "sentences" }),
				}
			: undefined,
	subject: loremIpsum({ count: 2, units: "words" }),
	collapseTitle: loremIpsum({ count: 2, units: "words" }),
	participants: Array(token() + 6)
		.fill(1)
		.map((x) => ({
			id: Math.floor((Math.random() * 10) % 7),
			title: loremIpsum({ count: 1, units: "words" }),
		})),
	dataSource: Array(token() + 5)
		.fill(1)
		.map((x) => ({
			type: "meeting",
			position: token() > 1 ? "right" : "left",
			text: loremIpsum({ count: 1, units: "sentences" }),
			focus: false,
			titleColor: getRandomColor(),
			forwarded: true,
			replyButton: true,
			removeButton: true,
			status: "received",
			notch: true,
			retracted: false,
			id: String(Math.random()),
			avatar: getAvatar("avatar   1"),
			message: loremIpsum({ count: 1, units: "sentences" }),
			title: loremIpsum({ count: 2, units: "words" }),
			avatarFlexible: true,
			date: +new Date(),
			event: {
				title: loremIpsum({ count: 2, units: "words" }),
				avatars: Array(token() + 2)
					.fill(1)
					.map((x) => ({
						src: getAvatar(`avatar${token()}`),
						title: "react, rce",
					})),
				avatarsLimit: 5,
			},
			record: {
				avatar: getAvatar(`avatar${token()}`),
				title: loremIpsum({ count: 1, units: "words" }),
				savedBy: `Kaydeden: ${loremIpsum({ count: 2, units: "words" })}`,
				time: new Date().toLocaleString(),
			},
		})),
};

export const meetingLinkMessage: MessageType = {
	data: {
		meetingID: "https://www.w3schools.com/html/horse.mp3",
		meetingLink: "https://www.w3schools.com/html/horse.mp3",
	},
	type: "meetingLink",
	actionButtons: [
		{
			onClickButton(id) {
				console.log(id);
			},
			Component: () => MdOutlineVideoCall({ size: "25px" }),
		},
		{
			onClickButton(id) {
				console.log(id);
			},
			Component: () => MdOutlineVideoCall({ size: "25px" }),
		},
	],
	meetingID: String(Math.random()),
	id: loremIpsum({ count: 1, units: "words" }),
	position: token() >= 1 ? "right" : "left",
	text: loremIpsum({ count: 1, units: "sentences" }),
	title: loremIpsum({ count: 2, units: "words" }),
	focus: true,
	date: +new Date(),
	dateString: "now",
	avatar: getAvatar(),
	titleColor: getRandomColor(),
	forwarded: true,
	replyButton: true,
	removeButton: true,
	status: "received",
	statusTitle: token() >= 5 ? "Desktop" : "Mobile",
	notch: true,
	copiableDate: true,
	retracted: false,
	className: "",
	reply:
		token() >= 1
			? {
					photoURL: token() >= 1 ? getAvatar() : undefined,
					title: loremIpsum({ count: 2, units: "words" }),
					titleColor: getRandomColor(),
					text: loremIpsum({ count: 1, units: "sentences" }),
				}
			: undefined,
} as MessageType;

export const textMessage = (index: number): MessageType =>
	({
		type: "text",
		id: loremIpsum({ count: 1, units: "words" }),
		position: token() >= 4 ? "right" : "left",
		text: loremIpsum({ count: 1, units: "sentences" }),
		title: loremIpsum({ count: 2, units: "words" }),
		focus: false,
		date: +new Date(),
		dateString: "now",
		avatar: getAvatar(),
		titleColor: getRandomColor(),
		forwarded: false,
		replyButton: false,
		removeButton: true,
		status: ["sent", "received", "received", "sent"][token()],
		statusTitle: token() >= 4 ? "Desktop" : "Mobile",
		notch: true,
		copiableDate: true,
		retracted: false,
		className: "",
		reply:
			token() >= 8
				? {
						src: token() >= 1 ? photo() : null,
						title: loremIpsum({ count: 2, units: "words" }),
						titleColor: getRandomColor(),
						text: loremIpsum({ count: 1, units: "sentences" }),
					}
				: undefined,
	}) as MessageType;

export const chatListArray = () => {
	const name = loremIpsum({ count: 2, units: "words" });
	return {
		id: loremIpsum({ count: 1, units: "words" }),
		avatar: getAvatar(),
		avatarFlexible: true,
		avatarSize: "default",
		statusColor: getRandomColor(),
		statusColorType:
			Math.floor((Math.random() * 100) % 2) === 1 ? "encircle" : undefined,
		alt: name,
		title: name,
		date: new Date(),
		subtitle: loremIpsum({ count: 1, units: "sentences" }),
		unread: Math.floor((Math.random() * 10) % 3),
		muted: Math.floor((Math.random() * 10) % 2) === 1,
		showMute: Math.floor((Math.random() * 10) % 2) === 1,
		showVideoCall: Math.floor((Math.random() * 10) % 2) === 1,
	};
};
