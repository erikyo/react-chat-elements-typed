import type React from "react";
import type { Dispatch, Key, SetStateAction } from "react";
import classNames from "classnames";
import "./ChatList.css";

import ChatItem from "../ChatItem/ChatItem";
import type { IChatListProps, ChatListEvent, IChatItemProps } from "../type";
import type { JSX } from "react";

const list: Dispatch<SetStateAction<boolean>>[] = [];

const ChatList = (props: IChatListProps): JSX.Element => {
	const onClick = (
		item: IChatItemProps,
		index: number,
		event: React.MouseEvent<HTMLElement>,
	): void => {
		if (props.onClick instanceof Function) props.onClick(item, index, event);
	};

	const onContextMenu = (
		item: IChatItemProps,
		index: number,
		event: React.MouseEvent<HTMLElement>,
	): void => {
		if (props.onContextMenu instanceof Function)
			props.onContextMenu(item, index, event);
	};

	const onAvatarError = (
		item: IChatItemProps,
		index: number,
		event: React.MouseEvent<HTMLElement>,
	): void => {
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
				const key = x.id || `item-${i}`;
				return (
					<div key={key}>
						<ChatItem
							{...x}
							lazyLoadingImage={props.lazyLoadingImage}
							onAvatarError={(e) => onAvatarError(x, i, e)}
							onContextMenu={(e) => onContextMenu(x, i, e)}
							onClick={(e) => onClick(x, i, e)}
							onClickMute={(e) => props.onClickMute?.(x, i, e)}
							onClickVideoCall={(e) => props.onClickVideoCall?.(x, i, e)}
							onDragOver={(e, i) => props?.onDragOver}
							onDragEnter={(e, i) => props?.onDragEnter}
							onDrop={(e, i) => props.onDrop}
							onDragLeave={(e, i) => onDragLeaveMW}
							onDragComponent={props?.onDragComponent}
							setDragStates={setDragStates}
							onExpandItem={(e) => onExpand(x, i, e)}
							expanded={x.expanded}
						/>
						{x.subList?.length &&
							x.expanded &&
							x.subList.map((sub, j) => {
								return (
									<ChatItem
										{...sub}
										key={`${i}-${j.toString()}`}
										className="subitem"
										avatarSize="xsmall"
										lazyLoadingImage={props.lazyLoadingImage}
										onAvatarError={(e) => onAvatarError(sub, j, e)}
										onContextMenu={(e) => onContextMenu(sub, j, e)}
										onClick={(e) => onClick(sub, j, e)}
										onClickMute={(e) => props.onClickMute?.(sub, j, e)}
										onClickVideoCall={(e) =>
											props.onClickVideoCall?.(sub, j, e)
										}
										onDragOver={(e, i) => props?.onDragOver}
										onDragEnter={(e, i) => props?.onDragEnter}
										onDrop={(e, i) => props?.onDrop}
										onDragLeave={(e, i) => onDragLeaveMW}
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
