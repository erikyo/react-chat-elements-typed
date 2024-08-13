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
	date = new Date(),
	...props
}) => {
	const [isExpanded, setIsExpanded] = useState<boolean>(
		props.expanded || false,
	);

	function getStatusItem() {
		if (props?.statusColorType === "badge") {
			return (
				<Badge
					backgroundColor={props?.statusColor}
					value={props?.statusText}
					position={"top-right"}
				/>
			);
		}
		if (props?.statusColorType === "encircle") {
			return (
				<span
					className="rce-citem-status encircle"
					style={{
						borderColor: props?.statusColor ?? "var(--rce-color-green)",
					}}
				/>
			);
		}
		return null;
	}

	return (
		<div className={classNames("rce-container-citem", props.className)}>
			<div className="rce-citem">
				<div
					className={classNames("rce-citem-avatar", {
						"rce-citem-status-encircle": props?.statusColorType === "encircle",
					})}
				>
					<Avatar
						src={props?.avatar}
						alt={props.alt}
						title={props.title}
						className={
							props?.statusColorType === "encircle"
								? "rce-citem-avatar-encircle-status"
								: undefined
						}
						size={props.avatarSize || "default"}
						letterItem={props.letterItem}
						sideElement={getStatusItem()}
						onError={props.onAvatarError}
						type={classNames("circle", {
							flexible: props?.avatarFlexible === true,
						})}
					/>
					{props?.subList?.length && (
						<>
							<Button
								link
								className="rce-citem-expand-button"
								onClick={() => setIsExpanded(!isExpanded)}
								icon={{
									component: isExpanded ? <FaArrowUp /> : <FaArrowDown />,
								}}
							/>

							<div
								className={"mce-citem-sublist"}
								style={{ display: props.expanded ? "block" : "none" }}
							>
								{props.subList?.map((sub, i) => (
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
						<div className="rce-citem-body--top-title">{props.title}</div>
						<div className="rce-citem-body--top-time">
							{date && (props.dateString || relativeDateFormat(date))}
						</div>
					</div>
					<div className="rce-citem-body--bottom">
						<div className="rce-citem-body--bottom-title">{props.subtitle}</div>
						<div className={"rce-citem-body--bottom-elements"}>
							<div
								className="rce-citem-body--bottom-tools"
								onMouseEnter={props?.handleOnMouseEnter}
								onMouseLeave={props?.handleOnMouseLeave}
							>
								{props.showMute ? (
									<Button
										link
										className="rce-citem-body--bottom-tools-item"
										onClick={(ev) => props?.onMuteToggle?.(ev, props)}
										icon={{
											component: props?.muted ? (
												<MdVolumeOff />
											) : (
												<MdVolumeUp />
											),
										}}
									/>
								) : null}
								{props?.showVideoCall ? (
									<Button
										link
										className="rce-citem-body--bottom-tools-item"
										onClick={(ev) => props?.onVideoCall?.(ev, props)}
										icon={{ component: <MdVideoCall /> }}
									/>
								) : null}
							</div>
							<div className="rce-citem-body--bottom-tools-item-hidden-hover">
								{props?.showMute && props?.muted && (
									<Button
										link
										className="rce-citem-body--bottom-tools-item"
										onClick={(e) => props?.onMuteToggle?.(e, props)}
									>
										<MdVolumeOff />
									</Button>
								)}
							</div>
							{props?.unread ? (
								<Badge
									className={"rce-citem-body--bottom-status"}
									value={props.unread}
								/>
							) : null}
							{props?.customStatusComponents?.map(
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
