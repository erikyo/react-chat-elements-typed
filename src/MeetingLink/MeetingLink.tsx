import type { FC } from "react";
import "./MeetingLink.css";

import type {
	IMeetingLinkMessageProps,
	MeetingLinkActionButtons,
} from "../types";

const MeetingLink: FC<IMeetingLinkMessageProps> = (props) => {
	return (
		<div className="rce-mtlink">
			<div className="rce-mtlink-content">
				<div className="rce-mtlink-item">
					<div className="rce-mtlink-title">{props.text}</div>
				</div>
				<div className="rce-mtlink-btn">
					{props?.actionButtons?.map(
						(Item: MeetingLinkActionButtons, index) => {
							return (
								<div
									key={`${props?.id}-${index.toString()}`}
									className="rce-mtlink-btn-content"
									onClick={() => Item.onClickButton(props?.meetingID ?? "")}
									onKeyDown={console.log}
								>
									{Item.Component}
								</div>
							);
						},
					)}
				</div>
			</div>
		</div>
	);
};

export default MeetingLink;
