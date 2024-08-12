import type { FC } from "react";
import "./MeetingItem.css";

import { MdCall, MdLink, MdVideoCall } from "react-icons/md";

import Avatar from "../Avatar/Avatar";

import { formatDistance, parse, subDays } from "date-fns";

import classNames from "classnames";
import type { IMeetingItemProps } from "../types";
import type { IAvatarProps } from "../types";
import { useState } from "react";

/**
 * Format date using date-fns relative format (eg. 3 days ago)
 * @param {Date} date the date object or string or number
 * @return {string} formatted date
 */
export const relativeDateFormat = (
	date: Date | number | string = new Date(),
): string => {
	let dateObject: Date;
	try {
		if (date instanceof Date) {
			dateObject = date;
		} else {
			dateObject = new Date(date);
		}
	} catch (error) {
		dateObject = new Date();
		console.error("the date provided is not valid", error);
	}

	return formatDistance(dateObject, new Date(), {
		addSuffix: true,
	}).replace("less than a minute ago", "now");
};

const MeetingItem: FC<IMeetingItemProps> = (props) => {
	const [attributes, setAttributes] = useState<IMeetingItemProps>({
		subjectLimit: 60,
		avatarFlexible: false,
		date: new Date(),
		avatarLimit: 5,
		avatars: [] as IAvatarProps[],
		audioMuted: true,
		dateString: props.dateString ?? relativeDateFormat(props.date),
		...props,
	});

	const subject =
		attributes.subject &&
		attributes.subjectLimit &&
		attributes.subject.substring(0, attributes.subjectLimit) +
			(attributes.subject.length > attributes.subjectLimit ? "..." : "");

	return (
		<div className={classNames("rce-container-mtitem", attributes.className)}>
			<audio
				autoPlay
				loop
				muted={attributes.audioMuted}
				src={attributes.audioSource}
			/>

			<div className="rce-mtitem">
				<div className="rce-mtitem-top">
					<div className="rce-mtitem-subject">{subject}</div>
					<div
						className="rce-mtitem-share"
						onClick={(event) =>
							attributes?.onShare?.(event, attributes, setAttributes)
						}
						onKeyDown={(event) =>
							attributes?.onShare?.(event, attributes, setAttributes)
						}
					>
						<MdLink />
					</div>
				</div>
				<div className="rce-mtitem-body">
					<div className="rce-mtitem-body--avatars">
						{attributes.avatars
							?.slice(0, attributes.avatarLimit)
							.map((x, i) => (
								<Avatar
									key={i.toString()}
									title={x.title}
									src={x.src}
									alt={x.alt}
									className={
										x.statusColorType === "encircle"
											? "rce-mtitem-avatar-encircle-status"
											: ""
									}
									size={"small"}
									letterItem={x.letterItem}
									sideElement={
										x.statusColor ? (
											<span
												className="rce-mtitem-status"
												style={
													x.statusColorType === "encircle"
														? {
																boxShadow: `inset 0 0 0 2px ${x.statusColor}, inset 0 0 0 5px #FFFFFF`,
															}
														: {
																backgroundColor: x.statusColor,
															}
												}
											>
												{x.statusText}
											</span>
										) : null
									}
									onError={attributes.onAvatarError}
									type={classNames("circle", {
										flexible: attributes.avatarFlexible,
									})}
								/>
							))}

						{attributes.avatars &&
							attributes.avatarLimit &&
							attributes.avatars.length > attributes.avatarLimit && (
								<div className="rce-avatar-container circle small rce-mtitem-letter">
									<span>{`+${
										attributes.avatars.length - attributes.avatarLimit
									}`}</span>
								</div>
							)}
					</div>
					<div className="rce-mtitem-body--functions">
						{attributes.closable && (
							<div
								className="rce-mtitem-closable"
								onClick={(ev) =>
									attributes.onClose?.(ev, attributes, setAttributes)
								}
								onKeyDown={(ev) =>
									attributes.onClose?.(ev, attributes, setAttributes)
								}
							>
								<MdCall />
							</div>
						)}
						<div
							className="rce-mtitem-button"
							onClick={(ev) =>
								attributes.onMeeting?.(ev, attributes, setAttributes)
							}
							onKeyDown={(ev) =>
								attributes.onMeeting?.(ev, attributes, setAttributes)
							}
						>
							<MdVideoCall />
						</div>
					</div>
				</div>
				<div className="rce-mtitem-footer">
					<span className="rce-mtitem-date">{attributes.dateString}</span>
				</div>
			</div>
		</div>
	);
};

export default MeetingItem;
