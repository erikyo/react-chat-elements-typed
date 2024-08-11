import React, { useEffect } from "react";
import { useRef, useState } from "react";
import Input from "../../../Input/Input";
import Button from "../../../Button/Button";
import MessageList from "../../../MessageList/MessageList";
import type { IChatItemProps, MessageType } from "../../../types";
import Side from "./Side";
import { buildUsersList } from "./Side";
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
import { getAvatar, token } from "../../utils/common";

const Index = () => {
	const [messageListArray, setMessageListArray] = useState<MessageType[]>([]);
	const [showEmojis, setShowEmojis] = useState(false);
	const [inputValue, setInputValue] = useState<string>("");
	const [users, setUsers] = useState<IChatItemProps[]>([]);

	const messageListReference = useRef(null);
	const inputReference = useRef<HTMLInputElement | undefined>();

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
			{
				...randomMessage(Addmtype),
				text: message,
				id: `message-${messageListArray.length}`,
			} as MessageType,
		]);

		if (inputReference.current) {
			clearRef(inputReference.current);
		}
	};

	const clearRef = (inputRef: HTMLInputElement | undefined) => {
		if (inputReference.current && "value" in inputReference.current) {
			inputReference.current.value = "";
		}
		setInputValue("");
		setShowEmojis(false);
	};

	useEffect(() => {
		const newUsers = buildUsersList();
		setUsers(newUsers);
	}, []);

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
								title={"me"}
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
							addMessage(token(), inputReference.current?.value || "");
						}}
					/>
				}
			/>
			<div className="flex" style={{ height: "calc(100% - 50px)" }}>
				<Side dataSource={users} />
				<div className={"flex flex-col w-full justify-end bg-sky-400 relative"}>
					<MessageList
						className="message-list w-full overflow-y-auto"
						reference={messageListReference}
						dataSource={messageListArray}
						lockable={true}
						downButton={true}
						downButtonBadge={messageListArray.length}
						sendMessagePreview={true}
					/>
					{showEmojis && (
						<div className={"rce-emoji-picker"}>
							<Picker
								data={data}
								onEmojiSelect={(e: { native: string }) => {
									const newValue = inputReference.current?.value + e.native;
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
						onChange={() => {
							const currentValue: string = inputReference.current
								?.value as string;
							setInputValue(currentValue);
						}}
						onSubmit={(e) => {
							if (inputReference.current && "value" in inputReference.current) {
								addMessage(token(), inputReference.current.value);
								clearRef(inputReference.current);
							}
						}}
						onMaxLengthExceed={() => console.log("Message is too long")}
						reference={inputReference}
						autoHeight={true}
						multiline={false}
						maxHeight={50}
						onKeyDown={(e) => {
							if (e.shiftKey && e.key === "Enter") {
								return true;
							}
							if (e.ctrlKey && e.key === "Enter") {
								addMessage(token(), inputReference.current?.value);
								clearRef(inputReference.current);
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

export default Index;
