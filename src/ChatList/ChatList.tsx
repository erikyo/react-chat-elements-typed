import type { FC, SetStateAction } from "react";
import classNames from "classnames";
import "./ChatList.css";

import ChatItem from "../ChatItem/ChatItem";
import Loader from "../Loader/Loader";
import type { IChatListProps } from "../types";

const ChatList: FC<IChatListProps> = ({ dataSource, ...props }) => {
	return (
		<div className={classNames("rce-container-clist", props.className)}>
			{dataSource?.map((el, index) => (
				<ChatItem key={`chat-item-${index.toString()}`} {...el} />
			)) ?? <Loader />}
		</div>
	);
};

export default ChatList;
