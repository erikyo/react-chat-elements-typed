import type React from "react";
import type { FC } from "react";
import "./MeetingList.css";

import MeetingItem from "../MeetingItem/MeetingItem";
import classNames from "classnames";
import type {
	IMeetingItemProps,
	IMeetingListProps,
	MeetingListEvent,
} from "../type";

const MeetingList: FC<IMeetingListProps> = (props) => {
	const onClick: MeetingListEvent = (
		item: IMeetingItemProps,
		index: number,
		event: React.MouseEvent<HTMLElement>,
	) => {
		if (props.onClick instanceof Function) props.onClick(item, index, event);
	};

	const onContextMenu: MeetingListEvent = (
		item: IMeetingItemProps,
		index: number,
		event: React.MouseEvent<HTMLElement>,
	) => {
		event.preventDefault();
		if (props.onContextMenu instanceof Function)
			props.onContextMenu(item, index, event);
	};

	const onAvatarError: MeetingListEvent = (item, index, event) => {
		if (props.onAvatarError instanceof Function)
			props.onAvatarError(item, index, event);
	};

	const onMeetingClick: MeetingListEvent = (item, index, event) => {
		if (props.onMeetingClick instanceof Function)
			props.onMeetingClick(item, index, event);
	};

	const onShareClick: MeetingListEvent = (item, index, event) => {
		if (props.onShareClick instanceof Function)
			props.onShareClick(item, index, event);
	};

	const onCloseClick: MeetingListEvent = (item, index, event) => {
		if (props.onCloseClick instanceof Function)
			props.onCloseClick(item, index, event);
	};

	return (
		<div
			ref={props.cmpRef}
			className={classNames("rce-container-mtlist", props.className)}
		>
			{props.dataSource?.map((x, i) => {
				return (
					<MeetingItem
						{...x}
						key={`meeting-item-${i.toString()}`}
						lazyLoadingImage={props.lazyLoadingImage}
						onAvatarError={(e: React.MouseEvent<HTMLElement>) =>
							onAvatarError(x, i, e)
						}
						onContextMenu={(e: React.MouseEvent<HTMLElement>) =>
							onContextMenu(x, i, e)
						}
						onClick={(e: React.MouseEvent<HTMLElement>) => onClick(x, i, e)}
						onMeetingClick={(e: React.MouseEvent<HTMLElement>) =>
							onMeetingClick(x, i, e)
						}
						onShareClick={(e: React.MouseEvent<HTMLElement>) =>
							onShareClick(x, i, e)
						}
						onCloseClick={(e: React.MouseEvent<HTMLElement>) =>
							onCloseClick(x, i, e)
						}
					/>
				);
			})}
		</div>
	);
};

export default MeetingList;
