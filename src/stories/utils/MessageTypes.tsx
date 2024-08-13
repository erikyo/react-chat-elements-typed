import { loremIpsum } from "lorem-ipsum";
import {
	getAvatar,
	getRandomColor,
	getRandomImage,
	getRandomInRange,
	getRandomStatus,
	photo,
	token,
} from "./common";
import { MdOutlineVideoCall } from "react-icons/md";
import type { IChatItemProps, MessageType } from "../../types";

export const messageDefaultdata = () =>
	({
		id: loremIpsum({ count: 1, units: "words" }),
		position: token(2) > 1 ? "right" : "left",
		date: +new Date(),
		type: "text",
		//date
		dateString: undefined,
		forwarded: false,
		forwardedMessageText: "Forwarded",
		// props
		notch: true,
		focus: false,
		replyButton: true,
		removeButton: true,
		emojiButton: true,
		retracted: false,
		copiableDate: true,
		// content
		text: loremIpsum({ count: 1, units: "sentences" }),
		title: loremIpsum({ count: 2, units: "words" }),
		titleColor: getRandomColor(),
		// status
		status: getRandomStatus(),
		statusTitle: loremIpsum({ count: 1, units: "words" }),
	}) as MessageType;

export const avatar = {
	avatar: photo(),
	avatarFlexible: true,
};

export const reply =
	token() >= 1
		? {
				photoURL: token() >= 1 ? getAvatar() : undefined,
				title: loremIpsum({ count: 2, units: "words" }),
				titleColor: getRandomColor(),
				text: loremIpsum({ count: 1, units: "sentences" }),
			}
		: undefined;

export const photoMessage = () =>
	({
		...messageDefaultdata(),
		type: "photo",
		data: {
			uri: getRandomImage(),
			status: {
				click: (e) => console.log("click", e),
				download: (e) => console.log("download", e),
				loading: false,
				error: false,
			},
			width: 300,
			height: 300,
		},
	}) as MessageType;

export const locationMessage = () =>
	({
		...messageDefaultdata(),
		type: "location",
		avatar: getAvatar(),
		latitude: Number(getRandomInRange(-90, 90, 5)),
		longitude: Number(getRandomInRange(-180, 180, 5)),
		zoom: 5,
		marker: {
			latLng: {
				lat: Number(getRandomInRange(-90, 90, 5)),
				lng: Number(getRandomInRange(-180, 180, 5)),
			},
			markerColor: "red",
			markerText: "",
		},
	}) as MessageType;

export const fileMessage = () =>
	({
		...messageDefaultdata(),
		type: "file",
		data: {
			status: {
				loading: true,
				error: false,
				click: (e) => console.log(e),
				download: (e) => console.log(e),
			},
			size: `${token(100)}MB`,
			extension: "pdf",
			name: `${loremIpsum({ count: 1, units: "words" })}.pdf`,
		},
	}) as MessageType;

export const messageWithReply = () =>
	({
		...avatar,
		...messageDefaultdata(),
		type: "text",
		reply: reply,
	}) as MessageType;

export const systemMessage = () =>
	({
		...messageDefaultdata(),
		type: "system",
	}) as MessageType;

export const videoMessage = () =>
	({
		...messageDefaultdata(),
		type: "video",
		controlsList: "",
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
			width: 400,
			height: 250,
		},
	}) as MessageType;

export const audioMessage = () =>
	({
		...messageDefaultdata(),
		type: "audio",
		data: {
			audioURL: "https://www.w3schools.com/html/horse.mp3",
			audioType: "audio/mp3",
			controlsList: "nodownload",
		},
	}) as MessageType;

export const meetingMessage = () =>
	({
		...messageDefaultdata(),
		type: "meeting",
		subject: loremIpsum({ count: 2, units: "words" }),
		collapseTitle: loremIpsum({ count: 1, units: "words" }),
		participants: Array(token(6))
			.fill(1)
			.map((x) => ({
				id: token(3),
				title: loremIpsum({ count: 1, units: "words" }),
			})),
		actionButtons: [
			{
				onClickButton(id: string) {
					console.log(id);
				},
				Component: <MdOutlineVideoCall size="25px" />,
			},
			{
				onClickButton(id: string) {
					console.log(id);
				},
				Component: <MdOutlineVideoCall size="25px" />,
			},
		],
		dataSource: Array(token(5))
			.fill(1)
			.map(() => ({
				...messageDefaultdata(),
				type: "meeting",
				date: +new Date(),
				event: {
					title: loremIpsum({ count: 2, units: "words" }),
					avatars: Array(token(2))
						.fill(1)
						.map((x) => ({
							src: getAvatar(`avatar${token()}`),
							title: "react, rce",
						})),
					avatarsLimit: 5,
				},
				record: {
					cover: getRandomImage(),
					title: loremIpsum({ count: 1, units: "words" }),
					savedBy: `Saved by: ${loremIpsum({ count: 2, units: "words" })}`,
					time: new Date().toLocaleString(),
				},
			})),
	}) as MessageType;

export const meetingLinkMessage = () =>
	({
		...messageDefaultdata(),
		type: "meetingLink",
		actionButtons: [
			{
				onClickButton(id) {
					console.log(id);
				},
				Component: <MdOutlineVideoCall size="25px" />,
			},
			{
				onClickButton(id) {
					console.log(id);
				},
				Component: <MdOutlineVideoCall size="25px" />,
			},
		],
		meetingID: String(Math.round(Math.random() * 10)),
	}) as MessageType;

export const textMessage = () =>
	({
		...messageDefaultdata(),
		avatar: getAvatar(`avatar${token()}`),
		type: "text",
	}) as MessageType;

export const chatListArray = (i = 0) => {
	const name = loremIpsum({ count: 2, units: "words" });
	return {
		id: loremIpsum({ count: 1, units: "words" }) + i,
		avatar: getAvatar(name),
		statusColor: token(2) === 1 ? undefined : getRandomColor(),
		statusColorType: [undefined, "encircle", "badge"][token(3)],
		alt: name,
		title: name,
		date: new Date(),
		subtitle: loremIpsum({ count: 1, units: "sentences" }),
		unread: Math.floor((Math.random() * 10) % 3),
		muted: Math.floor((Math.random() * 10) % 2) === 1,
		showMute: Math.floor((Math.random() * 10) % 2) === 1,
		showVideoCall: Math.floor((Math.random() * 10) % 2) === 1,
	} as IChatItemProps;
};
