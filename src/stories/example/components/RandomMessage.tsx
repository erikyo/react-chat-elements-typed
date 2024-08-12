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
} from "../../utils/MessageTypes";
import { token } from "../../utils/common";

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
		][token(9) - 1];
	}
	switch (messageType) {
		case "photo":
			return photoMessage();
		case "file":
			return fileMessage();
		case "system":
			return systemMessage();
		case "location":
			return locationMessage();
		case "meeting":
			return meetingMessage();
		case "meetingLink":
			return meetingLinkMessage();
		case "video":
			return videoMessage();
		case "audio":
			return audioMessage();
		default:
			return textMessage();
	}
};
