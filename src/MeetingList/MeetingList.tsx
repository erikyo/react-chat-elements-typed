import type { FC, Key, LegacyRef } from "react";
import "./MeetingList.css";

import MeetingItem from "../MeetingItem/MeetingItem";
import classNames from "classnames";
import type { IMeetingListProps, MeetingListEvent } from "../types";

const MeetingList: FC<IMeetingListProps> = (props) => {
	const onClick: MeetingListEvent = (item, index, event) => {
		if (props.onClick instanceof Function) props.onClick(item, index, event);
	};

	const onContextMenu: MeetingListEvent = (item, index, event) => {
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
			ref={props.cmpRef as LegacyRef<HTMLDivElement>}
			className={classNames("rce-container-mtlist", props.className)}
		>
			{props.dataSource?.map((x, i: number) => (
				<MeetingItem
					{...x}
					key={i as Key}
					lazyLoadingImage={props.lazyLoadingImage}
					onAvatarError={(e) => onAvatarError(x, i, e)}
					onContextMenu={(e) => onContextMenu(x, i, e)}
					onClick={(e) => onClick(x, i, e)}
					onMeetingClick={(e) => onMeetingClick(x, i, e)}
					onShareClick={(e) => onShareClick(x, i, e)}
					onCloseClick={(e) => onCloseClick(x, i, e)}
				/>
			))}
		</div>
	);
};

export default MeetingList;
