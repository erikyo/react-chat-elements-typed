import type React from "react";
import { type JSX, useEffect, useState } from "react";
import "./ChatItem.css";

import Avatar from "../Avatar/Avatar";

import { format } from "timeago.js";

import classNames from "classnames";

import { MdVideoCall, MdVolumeOff, MdVolumeUp } from "react-icons/md";
import type { IChatItemProps } from "../type";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const ChatItem = ({
	avatarFlexible = false,
	date = new Date(),
	unread = 0,
	statusColorType = "badge",
	lazyLoadingImage = undefined,
	onAvatarError = () => void 0,
	...props
}: IChatItemProps): JSX.Element => {
	const [onHoverTool, setOnHoverTool] = useState(false);
	const [onDrag, setOnDrag] = useState(false);

	useEffect(() => {
		props.setDragStates?.(setOnDrag);
	}, [props.setDragStates]);

	const handleOnMouseEnter = () => {
		setOnHoverTool(true);
	};

	const handleOnMouseLeave = () => {
		setOnHoverTool(false);
	};

	const handleOnClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.preventDefault();

		if (onHoverTool) return;

		props?.onClick?.(e);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
		if (e.key === "Enter") {
			props?.onKeyDown?.(e);
		}
	};

	const onDragOver = (e: React.MouseEvent) => {
		e.preventDefault();
		if (props.onDragOver instanceof Function) props.onDragOver(e, props.id);
	};

	const onDragEnter = (e: React.MouseEvent) => {
		e.preventDefault();
		if (props.onDragEnter instanceof Function) props.onDragEnter(e, props.id);
		if (!onDrag) setOnDrag(true);
	};

	const onDragLeave = (e: React.MouseEvent) => {
		e.preventDefault();
		if (props.onDragLeave instanceof Function) props.onDragLeave(e, props.id);
		if (onDrag) setOnDrag(false);
	};

	const onDrop = (e: React.MouseEvent) => {
		e.preventDefault();
		if (props.onDrop instanceof Function) props.onDrop(e, props.id);
		if (onDrag) setOnDrag(false);
	};

	const onExpandItem = (
		e: React.MouseEvent | React.KeyboardEvent,
		id: string,
	) => {
		e.preventDefault();
		e.stopPropagation();
		if (props.onExpandItem instanceof Function) props.onExpandItem(e, id);
	};

	return (
		<div
			className={classNames("rce-container-citem", props.className)}
			onClick={handleOnClick}
			onKeyDown={(e) => handleKeyDown(e)}
			onContextMenu={props.onContextMenu}
		>
			<div
				className="rce-citem"
				onDragOver={onDragOver}
				onDragEnter={onDragEnter}
				onDragLeave={onDragLeave}
				onDrop={onDrop}
			>
				{typeof props.onDragComponent === "function" &&
					onDrag &&
					props.onDragComponent(props.id)}
				{((onDrag && !props.onDragComponent) || !onDrag) && [
					<div
						key={"avatar"}
						className={classNames("rce-citem-avatar", {
							"rce-citem-status-encircle": statusColorType === "encircle",
						})}
					>
						<Avatar
							src={props.avatar}
							alt={props.alt}
							className={
								statusColorType === "encircle"
									? "rce-citem-avatar-encircle-status"
									: ""
							}
							size={props.avatarSize || "large"}
							letterItem={props.letterItem}
							sideElement={
								props.statusColor ? (
									<span
										className="rce-citem-status"
										style={
											statusColorType === "encircle"
												? {
														border: `solid 2px ${props.statusColor}`,
													}
												: {
														backgroundColor: props.statusColor,
													}
										}
									>
										{props.statusText}
									</span>
								) : (
									<></>
								)
							}
							onError={onAvatarError}
							lazyLoadingImage={lazyLoadingImage}
							type={classNames("circle", { flexible: avatarFlexible })}
						/>
						{props.subList?.length && (
							<button
								type="button"
								className="rce-citem-expand-button"
								onClick={(e) => onExpandItem(e, props.id.toString())}
								onKeyDown={(e) => onExpandItem(e, props.id.toString())}
							>
								{props.expanded ? <FaArrowUp /> : <FaArrowDown />}
							</button>
						)}
					</div>,
					<div key={"rce-citem-body"} className="rce-citem-body">
						<div className="rce-citem-body--top">
							<div className="rce-citem-body--top-title">{props.title}</div>
							<div className="rce-citem-body--top-time">
								{date && (props.dateString || format(date))}
							</div>
						</div>

						<div className="rce-citem-body--bottom">
							<div className="rce-citem-body--bottom-title">
								{props.subtitle}
							</div>
							<div
								className="rce-citem-body--bottom-tools"
								onMouseEnter={handleOnMouseEnter}
								onMouseLeave={handleOnMouseLeave}
							>
								{props.showMute && (
									<div
										className="rce-citem-body--bottom-tools-item"
										onClick={props.onClickMute}
										onKeyDown={(e) => e.key === "Enter" && props?.onClickMute}
									>
										{props.muted === true && <MdVolumeOff />}
										{props.muted === false && <MdVolumeUp />}
									</div>
								)}
								{props.showVideoCall && (
									<div
										className="rce-citem-body--bottom-tools-item"
										onClick={props.onClickVideoCall}
										onKeyDown={(e) =>
											e.key === "Enter" && props?.onClickVideoCall
										}
									>
										<MdVideoCall />
									</div>
								)}
							</div>
							<div className="rce-citem-body--bottom-tools-item-hidden-hover">
								{props.showMute && props.muted && (
									<div className="rce-citem-body--bottom-tools-item">
										<MdVolumeOff />
									</div>
								)}
							</div>
							<div className="rce-citem-body--bottom-status">
								{unread && unread > 0 ? <span>{unread}</span> : null}
							</div>
							{props.customStatusComponents?.length
								? props.customStatusComponents.map((item, index) => {
										return item;
									})
								: null}
						</div>
					</div>,
				]}
			</div>
		</div>
	);
};

export default ChatItem;
