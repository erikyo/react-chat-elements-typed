import type { Dispatch, FC, SetStateAction, SyntheticEvent } from "react";
import type React from "react";
import classNames from "classnames";
import "./ChatList.css";

import ChatItem from "../ChatItem/ChatItem";
import type { ChatListEvent, IChatItemProps, IChatListProps } from "../type";

const list: Dispatch<SetStateAction<boolean>>[] = [];

const ChatList: FC<IChatListProps> = (props): React.ReactElement => {
	const onClicked = (
		item: IChatItemProps,
		index: number,
		event: React.MouseEvent<HTMLElement, MouseEvent>,
	): void => {
		if (props?.onClicked) {
			props?.onClicked(item, index, event);
		}
	};

	const onContextMenuHandler = (
		item: IChatItemProps,
		index: number,
		event: React.MouseEvent<HTMLElement, MouseEvent>,
	): void => {
		if (props.onContextMenuHandler instanceof Function)
			props.onContextMenuHandler(item, index, event);
	};

	const onAvatarError = (
		item: IChatItemProps,
		index: number,
		event?: SyntheticEvent<Element>,
	): void => {
		if (props.onAvatarError instanceof Function)
			props.onAvatarError(item, index, event);
	};

	const setDragStates = (state: Dispatch<SetStateAction<boolean>>) => {
		list.push(state);
	};

	const onDragLeaveMW = (event: React.DragEvent<HTMLElement>) => {
		if (list.length > 0)
			for (const item of list) {
				item(false);
			}
		if (props?.onDragLeave) {
			props?.onDragLeave(event);
		}
	};

	const onExpand: ChatListEvent = (item, index, event) => {
		if (props.onExpand instanceof Function) props.onExpand(item, index, event);
	};

	return (
		<div className={classNames("rce-container-clist", props.className)}>
			{props.dataSource?.map((x: IChatItemProps, i: number) => {
				const key = x.id || `item-${i}`;
				return (
					<div key={key}>
						<ChatItem
							{...x}
							lazyLoadingImage={props.lazyLoadingImage}
							onAvatarError={(e: React.MouseEvent) => onAvatarError(x, i, e)}
							onContextMenuHandler={(e) => onContextMenuHandler(x, i, e)}
							onClick={(e) => onClicked(x, i, e)}
							onClickMute={(e) => props.onClickMute?.(x, i, e)}
							onClickVideoCall={(e) => props.onClickVideoCall?.(x, i, e)}
							onDragOver={props?.onDragOver}
							onDragEnter={props?.onDragEnter}
							onDrop={props?.onDrop}
							onDragLeave={onDragLeaveMW}
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
										onContextMenu={(e) => onContextMenuHandler(sub, j, e)}
										onClick={(e) => onClicked(sub, j, e)}
										onClickMute={(e) =>
											props.onClickMute ? props.onClickMute(sub, j, e) : null
										}
										onClickVideoCall={(e) =>
											props.onClickVideoCall?.(sub, j, e)
										}
										onDragOver={props?.onDragOver}
										onDragEnter={props?.onDragEnter}
										onDrop={props?.onDrop}
										onDragLeave={(e) => onDragLeaveMW}
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
