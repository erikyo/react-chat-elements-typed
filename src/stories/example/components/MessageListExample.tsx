import React, { type MutableRefObject, useRef, useState } from "react";
import { getAvatar, token } from "../utils/common";
import Input from "../../../Input/Input";
import Button from "../../../Button/Button";
import MessageList from "../../../MessageList/MessageList";
import type { MessageType } from "../../../types";
import ChatListExample from "./ChatListExample";
import { IconEmoji } from "../../../SvgIcon/IconEmoji";
import { IconPlus } from "../../../SvgIcon/IconPlus";
import { IconSend } from "../../../SvgIcon/IconSend";
import Navbar from "../../../Navbar/Navbar";
import { IconMenu } from "../../../SvgIcon/IconMenu";
import Avatar from "../../../Avatar/Avatar";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { randomMessage } from "./RandomMessage";
import { loremIpsum } from "lorem-ipsum";

const MessageListExample = () => {
	const [messageListArray, setMessageListArray] = useState<MessageType[]>([]);
	const [showEmojis, setShowEmojis] = useState(false);
	const [inputValue, setInputValue] = useState<string>("");

	const messageListreference = useRef(null);
	const inputreference = useRef<HTMLInputElement | undefined>();

	const addMessage = (data: number, text = ""): void => {
		let Addmtype = "";
		const message = text ? text : loremIpsum({ count: 1, units: "sentences" });
		switch (data) {
			case 0:
				Addmtype = "photo";
				break;
			case 1:
				Addmtype = "file";
				break;
			case 2:
				Addmtype = "system";
				break;
			case 3:
				Addmtype = "location";
				break;
			case 5:
				Addmtype = "meeting";
				break;
			case 6:
				Addmtype = "video";
				break;
			case 7:
				Addmtype = "audio";
				break;
			case 8:
				Addmtype = "meetingLink";
				break;
			default:
				Addmtype = "text";
				break;
		}

		setMessageListArray([
			...messageListArray,
			{ ...randomMessage(Addmtype), text: message } as MessageType,
		]);

		if (inputreference.current) {
			clearRef(inputreference.current);
		}
	};

	const clearRef = (inputRef: HTMLInputElement | undefined) => {
		if ("value" in inputreference.current) {
			inputreference.current.value = "";
		}
		setInputValue("");
		setShowEmojis(false);
	};

	return (
		<div
			className={"flex flex-col h-screen overflow-hidden"}
			style={{ height: "100vh", maxHeight: "100vh" }}
		>
			<Navbar
				style={{ padding: "0px", height: "50px" }}
				left={
					<div
						style={{
							width: "300px",
							padding: "8px",
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
							<Avatar
								src={getAvatar("me")}
								size={"small"}
								style={{ backgroundColor: "white" }}
							/>
							<p>Me</p>
						</div>
						<IconPlus style={{ color: "#54656f" }} />
					</div>
				}
				right={
					<Button
						backgroundColor={"transparent"}
						color={"#54656f"}
						icon={{
							component: <IconMenu />,
						}}
						onClick={() => {
							addMessage(token(), inputreference.current?.value || "");
						}}
					/>
				}
			/>
			<div className="flex" style={{ height: "calc(100% - 50px)" }}>
				<ChatListExample />
				<div className={"flex flex-col w-full justify-end bg-sky-400 relative"}>
					<MessageList
						className="message-list w-full overflow-y-auto"
						reference={messageListreference}
						dataSource={messageListArray}
						lockable={true}
						downButton={true}
						downButtonBadge={10}
						sendMessagePreview={true}
					/>
					{showEmojis && (
						<div className={"rce-emoji-picker"}>
							<Picker
								data={data}
								onEmojiSelect={(e) => {
									const newValue = inputreference.current?.value + e.native;
									setInputValue(newValue);
								}}
							/>
						</div>
					)}
					<Input
						className="rce-example-input"
						placeholder="Write your message here."
						maxlength={300}
						value={inputValue}
						onChange={(e) => {
							const currentValue: string = inputreference.current
								?.value as string;
							console.log(currentValue);
							setInputValue(currentValue);
						}}
						onSubmit={(e) => {
							if ("value" in inputreference.current) {
								addMessage(token(), inputreference.current.value);
								clearRef(inputreference.current);
							}
						}}
						onMaxLengthExceed={() => console.log("Message is too long")}
						reference={inputreference}
						autoHeight={true}
						multiline={false}
						maxHeight={50}
						onKeyDown={(e) => {
							if (e.shiftKey && e.key === "Enter") {
								return true;
							}
							if (e.ctrlKey && e.key === "Enter") {
								addMessage(token(), inputreference.current?.value);
								clearRef(inputreference.current);
							}
						}}
						leftButtons={
							<Button
								circle
								backgroundColor={"transparent"}
								style={{ display: "flex", gap: 10, justifyContent: "center" }}
								onClick={() => setShowEmojis(!showEmojis)}
								icon={{ component: <IconEmoji style={{ color: "#566570" }} /> }}
							/>
						}
						rightButtons={
							<Button
								type={"submit"}
								circle
								icon={{
									component: <IconSend style={{ color: "#566570" }} />,
									title: "Send",
								}}
								backgroundColor={"transparent"}
							/>
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default MessageListExample;
