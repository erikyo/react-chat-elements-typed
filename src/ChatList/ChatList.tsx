import type React from "react";
import type { Dispatch, Key, SetStateAction } from "react";
import classNames from "classnames";
import "./ChatList.css";

import ChatItem from "../ChatItem/ChatItem";
import type { IChatListProps, ChatListEvent, IChatItemProps } from "../type";

const list: Dispatch<SetStateAction<boolean>>[] = [];

const ChatList: React.FC<IChatListProps> = (props) => {
	const onClick: (
		item: IChatItemProps,
		index: number,
		event: React.MouseEvent<HTMLElement>,
	) => void = (
		item: IChatItemProps,
		index: number,
		event: React.MouseEvent<HTMLElement>,
	) => {
		if (props.onClick instanceof Function) props.onClick(item, index, event);
	};

	const onContextMenu: (
		item: IChatItemProps,
		index: number,
		event: React.MouseEvent<HTMLElement>,
	) => void = (
		item: IChatItemProps,
		index: number,
		event: React.MouseEvent<HTMLElement>,
	) => {
		event.preventDefault();
		if (props.onContextMenu instanceof Function)
			props.onContextMenu(item, index, event);
	};

	const onAvatarError: ChatListEvent = (
		item: IChatItemProps,
		index: number,
		event: React.MouseEvent<HTMLElement>,
	) => {
		if (props.onAvatarError instanceof Function)
			props.onAvatarError(item, index, event);
	};

	const setDragStates = (state: Dispatch<SetStateAction<boolean>>) => {
		list.push(state);
	};

	const onDragLeaveMW = (
		e: React.MouseEvent<HTMLElement>,
		id: number | string,
	) => {
		if (list.length > 0)
			for (const item of list) {
				item(false);
			}
		props.onDragLeave?.(e, id);
	};

	const onExpand: ChatListEvent = (item, index, event) => {
		if (props.onExpand instanceof Function) props.onExpand(item, index, event);
	};

	return (
		<div className={classNames("rce-container-clist", props.className)}>
			{props.dataSource?.map((x, i) => {
				if (!x) return null;
				const key = x.id || i;
				return (
					<div key={key}>
						<ChatItem
							{...x}
							lazyLoadingImage={props.lazyLoadingImage}
							onAvatarError={(e: React.MouseEvent<HTMLElement>) =>
								onAvatarError(x, i, e)
							}
							onContextMenu={(e: React.MouseEvent<HTMLElement>) =>
								onContextMenu(x, i, e)
							}
							onClick={(e: React.MouseEvent<HTMLElement>) => onClick(x, i, e)}
							onClickMute={(e: React.MouseEvent<HTMLElement>) =>
								props.onClickMute?.(x, i, e)
							}
							onClickVideoCall={(e: React.MouseEvent<HTMLElement>) =>
								props.onClickVideoCall?.(x, i, e)
							}
							onDragOver={props?.onDragOver}
							onDragEnter={props?.onDragEnter}
							onDrop={props.onDrop}
							onDragLeave={onDragLeaveMW}
							onDragComponent={props?.onDragComponent}
							setDragStates={setDragStates}
							onExpandItem={(e: React.MouseEvent<HTMLElement>) =>
								onExpand(x, i, e)
							}
							expanded={x.expanded}
						/>
						{x.subList &&
							x.subList.length > 0 &&
							x.expanded &&
							x.subList.map((sub, j) => {
								return (
									<ChatItem
										{...sub}
										className="subitem"
										avatarSize="xsmall"
										lazyLoadingImage={props.lazyLoadingImage}
										onAvatarError={(e: React.MouseEvent<HTMLElement>) =>
											onAvatarError(sub, j, e)
										}
										onContextMenu={(e: React.MouseEvent<HTMLElement>) =>
											onContextMenu(sub, j, e)
										}
										onClick={(e: React.MouseEvent<HTMLElement>) =>
											onClick(sub, j, e)
										}
										onClickMute={(e: React.MouseEvent<HTMLElement>) =>
											props.onClickMute?.(sub, j, e)
										}
										onClickVideoCall={(e: React.MouseEvent<HTMLElement>) =>
											props.onClickVideoCall?.(sub, j, e)
										}
										onDragOver={props?.onDragOver}
										onDragEnter={props?.onDragEnter}
										onDrop={props.onDrop}
										onDragLeave={onDragLeaveMW}
										onDragComponent={props.onDragComponent}
										setDragStates={setDragStates}
									/>
								);
							})}
					</div>
				);
			})}
		</div>
	);
};

export default ChatList;
