import type React, {ReactElement} from "react";
import type { MouseEventHandler } from "react";
import { useEffect, useState } from "react";
import "./ChatItem.css";
import Avatar from "../Avatar/Avatar";
import { format } from "date-fns";
import classNames from "classnames";
import { MdVideoCall, MdVolumeOff, MdVolumeUp } from "react-icons/md";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import type {
	ChatItemDragEvent,
	ChatItemEvent,
	IChatItemProps,
} from "../types";
import {Browser} from "leaflet";
import retina = Browser.retina;

const ChatItem: React.FC<IChatItemProps> = ({
	avatarFlexible = false,
	date = new Date(),
	unread = 0,
	statusColorType = "badge",
	lazyLoadingImage = undefined,
	onAvatarError = () => void 0,
	...props
}) => {
	const [onHoverTool, setOnHoverTool] = useState(false);
	const [onDrag, setOnDrag] = useState(false);

	useEffect(() => {
		if (typeof props.setDragStates === "function") {
			props.setDragStates(!onDrag);
		}
	}, [props.setDragStates, onDrag]);

	const handleOnMouseEnter = () => setOnHoverTool(true);
	const handleOnMouseLeave = () => setOnHoverTool(false);

	const handleOnClick: MouseEventHandler = (e) => {
		e.preventDefault();
		if (onHoverTool) return;
		if (typeof props.onClick === "function") {
			props.onClick(e);
		}
	};

	const onDragOver: ChatItemEvent = (e, id) => {
		if (typeof props.onDragOver === "function") {
			props.onDragOver(e, id);
		}
	};

	const onDragEnter: ChatItemEvent = (e, id) => {
		if (typeof props.onDragEnter === "function") {
			props.onDragEnter(e, id);
		}
		if (!onDrag) {
			setOnDrag(true);
		}
	};

	const onDragLeave: ChatItemEvent = (e, id) => {
		if (typeof props.onDragLeave === "function") {
			props.onDragLeave(e, id);
		}
		if (onDrag) {
			setOnDrag(false);
		}
	};

	const onDrop: ChatItemDragEvent = (e, id) => {
		if (typeof props.onDrop === "function") {
			props.onDrop(e, id);
		}
		if (onDrag) {
			setOnDrag(false);
		}
	};

	const onExpandItem: ChatItemEvent = (e, id) => {
		e.preventDefault();
		e.stopPropagation();
		if (typeof props.onExpandItem === "function") {
			props.onExpandItem(e, id);
		}
	};

	return (
		<div
			key={props.id}
			className={classNames("rce-container-citem", props.className)}
			onClick={handleOnClick}
			onKeyDown={console.log}
			onContextMenu={props.onContextMenu}
		>
			<div
				className="rce-citem"
				onDragOver={(e) => onDragOver(e, props.id)}
				onDragEnter={(e) => onDragEnter(e, props.id)}
				onDragLeave={(e) => onDragLeave(e, props.id)}
				onDrop={(e) => onDrop(e, props.id)}
			>
				{props.onDragComponent && onDrag && props.onDragComponent}
				{((onDrag && !props.onDragComponent) || !onDrag) && (
					<>
						<div
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
								size={props.avatarSize || "default"}
								letterItem={props.letterItem}
								sideElement={
									props.statusColor ? (
										<span
											className="rce-citem-status"
											style={
												statusColorType === "encircle"
													? { border: `solid 2px ${props.statusColor}` }
													: { backgroundColor: props.statusColor }
											}
										>
											{props.statusText}
										</span>
									) : null
								}
								onError={onAvatarError}
								lazyLoadingImage={lazyLoadingImage}
								type={classNames("circle", { flexible: avatarFlexible })}
							/>
							{props.subList && props.subList.length > 0 && (
								<button
									type="button"
									className="rce-citem-expand-button"
									onClick={(e) => onExpandItem(e, props.id)}
								>
									{props.expanded ? <FaArrowUp /> : <FaArrowDown />}
								</button>
							)}
						</div>
						<div key="rce-citem-body" className="rce-citem-body">
							<div className="rce-citem-body--top">
								<div className="rce-citem-body--top-title">{props.title}</div>
								<div className="rce-citem-body--top-time">
									{date && (props.dateString || format(date, "HH:mm"))}
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
											onKeyDown={console.log}
										>
											{props.muted === true && <MdVolumeOff />}
											{props.muted === false && <MdVolumeUp />}
										</div>
									)}
									{props.showVideoCall && (
										<div
											className="rce-citem-body--bottom-tools-item"
											onClick={props.onClickVideoCall}
											onKeyDown={console.log}
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
									{unread > 0 ? <span>{unread}</span> : null}
								</div>
								{props.customStatusComponents
									? props.customStatusComponents.map((el: ReactElement, index) => {return  {...el, key: index}})
									: null}
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ChatItem;
