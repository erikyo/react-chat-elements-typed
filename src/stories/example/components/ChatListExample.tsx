import { loremIpsum } from "lorem-ipsum";
import type { ReactNode } from "react";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { BsListTask } from "react-icons/bs";
import type { IChatItemProps } from "../../../types";
import SideBar from "../../../SideBar/SideBar";
import ChatList from "../../../ChatList/ChatList";
import { getAvatar, token } from "../utils/common";

const Test: ReactNode = (
	<div
		className="rce-citem-body--bottom-status-icon"
		onClick={(e) => console.log(e, "clicked")}
		onKeyDown={console.log}
	>
		<span
			style={{
				fontSize: "10px",
				position: "absolute",
				padding: "2px",
				right: "-12px",
				top: "-6px",
				color: "white",
				borderRadius: "100%",
				width: "12px",
				height: "12px",
				textAlign: "center",
			}}
		>
			{Math.ceil(Math.random() * 9) + 1}
		</span>
		<BsListTask />
	</div>
);

function ChatListExample() {
	const photo = useCallback((size: number | undefined) => {
		return getAvatar(loremIpsum({ count: 1, units: "words" }));
	}, []);

	const [chatListArray, setChatListArray] = useState<IChatItemProps[]>([
		{
			id: String(Math.random()),
			avatar: getAvatar(`avatar${Math.random().toString()}`),
			avatarFlexible: true,
			statusColor: "lightgreen",
			statusColorType:
				Math.floor((Math.random() * 100) % 2) === 1 ? "encircle" : undefined,
			alt: loremIpsum({ count: 2, units: "words" }),
			title: loremIpsum({ count: 2, units: "words" }),
			date: new Date(),
			subtitle: loremIpsum({ count: 1, units: "sentences" }),
			unread: token(10),
			muted: token(2) > 1,
			showMute: token(2) > 1,
			showVideoCall: token(2) > 1,
			customStatusComponents: [Test],
		} as IChatItemProps,
	]);

	useEffect(() => {
		if (chatListArray.length === 5) return;

		const getRandomLiteChat = () => {
			return {
				id: String(Math.random()),
				avatar: getAvatar(`avatar${Math.random().toString()}`),
				avatarFlexible: true,
				title: loremIpsum({ count: 2, units: "words" }),
				subtitle: loremIpsum({ count: 1, units: "sentences" }),
				date: new Date(),
				unread: Math.floor((Math.random() * 10) % 3),
			};
		};

		const getRandomChat = (nested = true) => {
			return {
				id: String(Math.random()),
				avatar: getAvatar(`avatar${Math.random().toString()}`),
				avatarFlexible: true,
				statusColor: "lightgreen",
				statusColorType:
					Math.floor((Math.random() * 100) % 2) === 1 ? "encircle" : undefined,
				alt: loremIpsum({ count: 2, units: "words" }),
				title: loremIpsum({ count: 2, units: "words" }),
				subtitle: loremIpsum({ count: 1, units: "sentences" }),
				date: new Date(),
				unread: Math.floor((Math.random() * 10) % 3),
				muted: Math.floor((Math.random() * 10) % 2) === 1,
				showMute: Math.floor((Math.random() * 10) % 2) === 1,
				showVideoCall: Math.floor((Math.random() * 10) % 2) === 1,
				customStatusComponents: [Test],
			} as IChatItemProps;
		};

		const randomChat: IChatItemProps = getRandomChat();
		setChatListArray([...chatListArray, randomChat]);
	}, [chatListArray]);

	return (
		<SideBar
			type={"default"}
			style={{
				width: "300px",
				height: "100vh",
				padding: "0px",
			}}
			data={{
				top: (
					<ChatList
						id={"chatlist"}
						dataSource={chatListArray}
						onClickMute={({ ...props }) => console.log(props)}
						onClickVideoCall={({ ...props }) => console.log(props)}
						onDragEnter={(e, id) => console.log(e, id, "onDragEnter")}
						onDragLeave={(e, id) => console.log(e, id, "onDragLeave")}
						onDrop={(e, id) => console.log(e, id, "onDrop")}
						onDragComponent={
							<div className="on-drag-mlist">
								{loremIpsum({ count: 4, units: "words" })}
							</div>
						}
					/>
				),
			}}
		/>
	);
}

export default ChatListExample;
