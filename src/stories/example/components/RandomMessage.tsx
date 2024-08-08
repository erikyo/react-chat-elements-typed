import type { MessageType } from "../../../types";
import {
	audioMessage,
	fileMessage,
	locationMessage,
	meetingLinkMessage,
	meetingMessage,
	photoMessage,
	systemMessage,
	textMessage,
	videoMessage,
} from "../utils/MessageTypes";

export const randomMessage = (type = "random", index = 0): MessageType => {
	let messageType = type;
	if (type === "random") {
		messageType = [
			"text",
			"photo",
			"file",
			"system",
			"location",
			"meeting",
			"video",
			"audio",
			"meetingLink",
		][Math.floor(Math.random() * 10) % 10];
	}
	switch (messageType) {
		case "photo":
			return photoMessage;
		case "file":
			return fileMessage;
		case "system":
			return systemMessage;
		case "location":
			return locationMessage;
		case "meeting":
			return meetingMessage;
		case "video":
			return videoMessage;
		case "audio":
			return audioMessage;
		case "meetingLink":
			return meetingLinkMessage;
		default:
			return textMessage(index);
	}
};
