import type { FC, Key, LegacyRef } from "react";
import "./MeetingList.css";

import MeetingItem from "../MeetingItem/MeetingItem";
import classNames from "classnames";
import type { IMeetingListProps } from "../types";

const MeetingList: FC<IMeetingListProps> = (props) => {
	return (
		<div
			ref={props.cmpRef as LegacyRef<HTMLDivElement>}
			className={classNames("rce-container-mtlist", props.className)}
		>
			{props.dataSource?.map((x, i: number) => (
				<MeetingItem {...x} key={i as Key} />
			))}
		</div>
	);
};

export default MeetingList;
