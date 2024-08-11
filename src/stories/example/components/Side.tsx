import { loremIpsum } from "lorem-ipsum";
import type React from "react";
import type { ReactElement } from "react";
import { BsListTask } from "react-icons/bs";
import type { IChatItemProps } from "../../../types";
import SideBar from "../../../SideBar/SideBar";
import ChatList from "../../../ChatList/ChatList";
import { getAvatar, getRandomColor, token } from "../../utils/common";

const Test: ReactElement = (
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

const getUserItem = () =>
	({
		avatar: token(2) > 1 ? getAvatar() : undefined,
		avatarFlexible: true,
		statusColor: ["green", "red", getRandomColor()][token(10) - 1],
		alt: loremIpsum({ count: 2, units: "words" }),
		title: loremIpsum({ count: 2, units: "words" }),
		subtitle: loremIpsum({ count: 1, units: "sentences" }),
		date: new Date(),
		unread: token(2) - 1,
		muted: token(2) < 1,
		showMute: token(2) < 1,
		showVideoCall: token(2) < 1,
		customStatusComponents: [Test],
	}) as IChatItemProps;

export const buildUsersList = (count = 8) => {
	return Array.from({ length: count }).map(() =>
		getUserItem(),
	) as IChatItemProps[];
};

function Side(props: { dataSource: IChatItemProps[] }) {
	return (
		<SideBar
			style={{
				width: "300px",
				padding: "0",
			}}
			top={<ChatList dataSource={props.dataSource} />}
		/>
	);
}

export default Side;
