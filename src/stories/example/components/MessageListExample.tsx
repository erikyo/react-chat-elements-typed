import React, { type MutableRefObject, useRef, useState } from "react";
import { token } from "../utils/common";
import {
	audioMessage,
	fileMessage,
	locationMessage,
	meetingLinkMessage,
	meetingMessage,
	photoMessage,
	spotifyMessage,
	systemMessage,
	textMessage,
	videoMessage,
} from "../utils/MessageTypes";
import Input from "../../../Input/Input";
import Button from "../../../Button/Button";
import MessageList from "../../../MessageList/MessageList";
import type { MessageType } from "../../../types";
import ChatListExample from "./ChatListExample";

export const randomMessage = (type = "random", index = 0): MessageType => {
	let messageType = type;
	if (type === "random") {
		messageType = [
			"text",
			"photo",
			"file",
			"system",
			"location",
			"spotify",
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
		case "spotify":
			return spotifyMessage;
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

const MessageListExample = () => {
	const [messageListArray, setMessageListArray] = useState<MessageType[]>([]);
	const [status, setStatus] = useState("");
	const [value, setValue] = useState(0);
	const messageListreference = useRef(null);
	const inputreference = useRef<HTMLInputElement | undefined>();

	const clearRef = (
		inputRef: MutableRefObject<HTMLInputElement | undefined>,
	) => {
		if (inputRef?.current) {
			(inputRef.current as HTMLInputElement).value = "";
		}
	};

	const forceUpdate = () => setValue(value + 1);

	const addMessage = (data: number, text = ""): void => {
		let Addmtype = "";
		switch (data) {
			case 0:
				Addmtype = "photo";
				setStatus("waiting");
				break;
			case 1:
				Addmtype = "file";
				setStatus("sent");
				break;
			case 2:
				Addmtype = "system";
				break;
			case 3:
				Addmtype = "location";
				setStatus("received");
				break;
			case 4:
				Addmtype = "spotify";
				setStatus("waiting");
				break;
			case 5:
				Addmtype = "meeting";
				setStatus("sent");
				break;
			case 6:
				Addmtype = "video";
				setStatus("read");
				break;
			case 7:
				Addmtype = "audio";
				break;
			case 8:
				Addmtype = "meetingLink";
				break;
			default:
				Addmtype = "text";
				setStatus("read");
				break;
		}

		setMessageListArray([
			...messageListArray,
			{ ...randomMessage(Addmtype), message: text } as MessageType,
		]);
		clearRef(inputreference);
		forceUpdate();
	};

	return (
		<div className="flex h-screen">
			<ChatListExample />
			<div className={"flex flex-col w-full justify-end bg-sky-400"}>
				<MessageList
					className="message-list w-full overflow-y-auto"
					reference={messageListreference}
					dataSource={messageListArray}
					lockable={true}
					downButton={true}
					downButtonBadge={10}
					sendMessagePreview={true}
				/>
				<Input
					className="rce-example-input"
					placeholder="Write your message here."
					defaultValue=""
					multiline={true}
					maxlength={300}
					onMaxLengthExceed={() => console.log("onMaxLengthExceed")}
					reference={inputreference}
					clear={() => clearRef(inputreference)}
					maxHeight={50}
					onKeyPress={(e) => {
						if (e.shiftKey && e.key === "Enter") {
							return true;
						}
						if (e.key === "Enter") {
							clearRef(inputreference);
							addMessage(token(), inputreference.current?.value);
						}
					}}
					rightButtons={
						<Button
							text="Submit"
							onClick={() => addMessage(token(), inputreference.current?.value)}
						/>
					}
				/>
			</div>
		</div>
	);
};

export default MessageListExample;
