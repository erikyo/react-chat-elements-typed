import React, {
	type MutableRefObject,
	type RefObject,
	useRef,
	useState,
} from "react";
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

	const addMessage = (data: number): void => {
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

		setMessageListArray([...messageListArray, randomMessage(Addmtype)]);
		clearRef(inputreference);
		forceUpdate();
	};

	const randomMessage = (type: string): MessageType => {
		switch (type) {
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
				return textMessage;
		}
	};

	return (
		<div className="right-panel rce-example-messageList">
			<MessageList
				className="message-list"
				reference={messageListreference}
				dataSource={messageListArray}
				lockable={true}
				downButton={true}
				downButtonBadge={10}
				sendMessagePreview={true}
			/>

			<div
				style={{
					position: "fixed",
					bottom: 0,
					right: 0,
					left: 0,
					margin: "0 auto 1rem auto",
					width: "60%",
				}}
			>
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
						if (e.shiftKey && e.charCode === 13) {
							return true;
						}
						if (e.charCode === 13) {
							clearRef(inputreference);
							addMessage(token());
						}
					}}
					rightButtons={
						<Button text="Submit" onClick={() => addMessage(token())} />
					}
				/>
			</div>
		</div>
	);
};

export default MessageListExample;
