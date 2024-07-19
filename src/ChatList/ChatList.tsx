import type { FC, Dispatch, SetStateAction, MouseEvent } from "react";
import classNames from "classnames";
import "./ChatList.css";

import ChatItem from "../ChatItem/ChatItem.js";
import type {
	IChatListProps,
	ChatListEvent,
	ChatListElement,
} from "../type.js";

const list: SetStateAction<boolean>[] = [];

const ChatList: FC<IChatListProps> = (props) => {
	const onClick: ChatListEvent = (item, index, event): void => {
		if (props?.onClick) {
			props?.onClick(item, index, event);
		}
	};

	const onContextMenu: ChatListEvent = (item, index, event): void => {
		if (props.onContextMenu instanceof Function)
			props.onContextMenu(item, index, event);
	};

	const onAvatarError: ChatListEvent = (item, index, event): void => {
		if (props.onAvatarError instanceof Function)
			props.onAvatarError(item, index, event);
	};

	const setDragStates: (state: SetStateAction<boolean>) => void = (state) => {
		list.push(state);
	};

	const onDragLeaveMW = (e: MouseEvent, id: number | string) => {
		if (list.length > 0)
			for (const item of list) {
				item instanceof Function && item(false);
			}
		props.onDragLeave?.(e, id.toString());
	};

	const onExpand: ChatListElement = (item, index, event) => {
		if (props.onExpand instanceof Function) props.onExpand(item, index, event);
	};

	return (
		<div className={classNames("rce-container-clist", props.className)}>
			{props.dataSource
				? props.dataSource.map((x, i: number) => (
						<div key={i.toString()}>
							<ChatItem
								{...x}
								lazyLoadingImage={props?.lazyLoadingImage}
								onAvatarError={(e) => onAvatarError(x, i, e)}
								onContextMenu={(e) => onContextMenu(x, i, e)}
								onClick={(e) => onClick(x, i, e)}
								onClickMute={(e) => props.onClickMute?.(x, i, e)}
								onClickVideoCall={(e) => props.onClickVideoCall?.(x, i, e)}
								onDragOver={props?.onDragOver}
								onDragEnter={props?.onDragEnter}
								onDrop={props.onDrop}
								onDragLeave={(e) => onDragLeaveMW(e, i)}
								onDragComponent={props.onDragComponent}
								setDragStates={setDragStates}
								onExpandItem={(e) => onExpand(x, i, e)}
								expanded={x.expanded}
							/>
							{x.subList && x.subList.length > 0 && (
								<>
									{x.expanded &&
										x.subList.map((sub, j) => (
											<ChatItem
												{...sub}
												className={"subitem"}
												avatarSize={"xsmall"}
												key={`${i}-${j.toString()}`}
												lazyLoadingImage={props?.lazyLoadingImage}
												onAvatarError={(e) => onAvatarError(sub, j, e)}
												onContextMenu={(e) => onContextMenu(sub, j, e)}
												onClick={(e) => onClick(sub, j, e)}
												onClickMute={(e) => props.onClickMute?.(sub, j, e)}
												onClickVideoCall={(e) =>
													props.onClickVideoCall?.(sub, j, e)
												}
												onDragOver={props?.onDragOver}
												onDragEnter={props?.onDragEnter}
												onDrop={props.onDrop}
												onDragLeave={onDragLeaveMW}
												onDragComponent={props.onDragComponent}
												setDragStates={setDragStates}
											/>
										))}
								</>
							)}
						</div>
					))
				: null}
		</div>
	);
};

export default ChatList;
