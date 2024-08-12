import type React from "react";
import type { ReactElement } from "react";
import "./ChatItem.css";
import Avatar from "../Avatar/Avatar";
import classNames from "classnames";
import { MdVideoCall, MdVolumeOff, MdVolumeUp } from "react-icons/md";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import type { IChatItemProps } from "../types";
import { cloneElement, useState } from "react";
import { relativeDateFormat } from "../MeetingItem/MeetingItem";
import Button from "../Button/Button";
import Badge from "../Badge/Badge";

const ChatItem: React.FC<IChatItemProps> = ({
	avatarFlexible = false,
	date = new Date(),
	statusColor,
	showVideoCall = false,
	showMute = false,
	avatar = undefined,
	...rest
}) => {
	const [isExpanded, setIsExpanded] = useState<boolean>(rest.expanded || false);
	const [attributes, setAttributes] = useState<IChatItemProps>(rest);

	function getStatusItem() {
		if (attributes?.statusColorType === "badge") {
			return (
				<Badge
					backgroundColor={statusColor}
					value={attributes?.statusText}
					position={"top-right"}
				/>
			);
		}
		if (attributes?.statusColorType === "encircle") {
			return (
				<span
					className="rce-citem-status encircle"
					style={{ borderColor: statusColor ?? "var(--rce-color-green)" }}
				/>
			);
		}
		return null;
	}

	return (
		<div
			className={classNames("rce-container-citem", attributes.className)}
			onClick={(ev) => attributes?.onClick?.(ev, attributes, setAttributes)}
			onContextMenu={(ev) =>
				attributes?.onContextMenu?.(ev, attributes, setAttributes)
			}
			onKeyDown={(ev) => attributes?.onKeyDown?.(ev, attributes, setAttributes)}
		>
			<div className="rce-citem">
				<div
					className={classNames("rce-citem-avatar", {
						"rce-citem-status-encircle":
							attributes?.statusColorType === "encircle",
					})}
				>
					<Avatar
						src={avatar}
						alt={attributes.alt}
						title={attributes.title}
						className={
							attributes?.statusColorType === "encircle"
								? "rce-citem-avatar-encircle-status"
								: undefined
						}
						size={attributes.avatarSize || "default"}
						letterItem={attributes.letterItem}
						sideElement={getStatusItem()}
						onError={attributes.onAvatarError}
						type={classNames("circle", { flexible: avatarFlexible })}
					/>
					{attributes?.subList?.length && (
						<>
							<button
								type="button"
								className="rce-citem-expand-button"
								onClick={() => setIsExpanded(!isExpanded)}
							>
								{attributes.expanded ? <FaArrowUp /> : <FaArrowDown />}
							</button>

							<div
								className={"mce-citem-sublist"}
								style={{ display: attributes.expanded ? "block" : "none" }}
							>
								{attributes.subList?.map((sub, i) => (
									<ChatItem
										{...sub}
										className={"subitem"}
										avatarSize={"xsmall"}
										key={`subitem-${i.toString()}`}
									/>
								))}
							</div>
						</>
					)}
				</div>
				<div key="rce-citem-body" className="rce-citem-body">
					<div className="rce-citem-body--top">
						<div className="rce-citem-body--top-title">{attributes.title}</div>
						<div className="rce-citem-body--top-time">
							{date && (attributes.dateString || relativeDateFormat(date))}
						</div>
					</div>
					<div className="rce-citem-body--bottom">
						<div className="rce-citem-body--bottom-title">
							{attributes.subtitle}
						</div>
						<div className={"rce-citem-body--bottom-elements"}>
							<div
								className="rce-citem-body--bottom-tools"
								onMouseEnter={attributes?.handleOnMouseEnter}
								onMouseLeave={attributes?.handleOnMouseLeave}
							>
								{showMute ? (
									<Button
										link
										className="rce-citem-body--bottom-tools-item"
										onClick={(ev) =>
											attributes?.onMuteToggle?.(ev, attributes, setAttributes)
										}
										icon={{
											component: attributes?.muted ? (
												<MdVolumeOff />
											) : (
												<MdVolumeUp />
											),
										}}
									/>
								) : null}
								{"showVideoCall" in attributes ? (
									<Button
										link
										className="rce-citem-body--bottom-tools-item"
										onClick={(ev) =>
											attributes?.onVideoCall?.(ev, attributes, setAttributes)
										}
										icon={{ component: <MdVideoCall /> }}
									/>
								) : null}
							</div>
							<div className="rce-citem-body--bottom-tools-item-hidden-hover">
								{showMute && attributes?.muted && (
									<div className="rce-citem-body--bottom-tools-item">
										<MdVolumeOff />
									</div>
								)}
							</div>
							{attributes?.unread ? (
								<Badge
									className={"rce-citem-body--bottom-status"}
									value={attributes.unread}
								/>
							) : null}
							{attributes?.customStatusComponents?.map(
								(el: ReactElement, index: number) => {
									return cloneElement(el, { key: index.toString() });
								},
							) ?? null}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatItem;
