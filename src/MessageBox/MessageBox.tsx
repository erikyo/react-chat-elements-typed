import type { FC } from "react";
import type React from "react";
import { useEffect, useRef } from "react";
import "./MessageBox.css";

import PhotoMessage from "../PhotoMessage/PhotoMessage";
import FileMessage from "../FileMessage/FileMessage";
import SystemMessage from "../SystemMessage/SystemMessage";
import LocationMessage from "../LocationMessage/LocationMessage";
import ReplyMessage from "../ReplyMessage/ReplyMessage";
import MeetingMessage from "../MeetingMessage/MeetingMessage";
import VideoMessage from "../VideoMessage/VideoMessage";
import AudioMessage from "../AudioMessage/AudioMessage";
import MeetingLink from "../MeetingLink/MeetingLink";

import Avatar from "../Avatar/Avatar";

import { RiShareForwardFill } from "react-icons/ri";
import {
	MdAccessTime,
	MdCheck,
	MdDelete,
	MdDoneAll,
	MdMessage,
	MdOutlineEdit,
} from "react-icons/md";
import { TiArrowForward } from "react-icons/ti";

import { format } from "date-fns";

import classNames from "classnames";
import type { MessageBoxType } from "../types";
import { LeftNotch } from "../SvgIcon/leftNotch";
import { RightNotch } from "../SvgIcon/rightNotch";

const MessageBox: FC<MessageBoxType> = ({
	focus = false,
	notch = true,
	style,
	actionButtons,
	notchStyle = { color: "var(--rce-color-white)" },
	...props
}) => {
	const prevProps = useRef(focus);
	const messageRef = useRef<HTMLDivElement | null>(null);

	const positionCls = classNames("rce-mbox", {
		"rce-mbox-right": props.position === "right",
	});
	const thatAbsoluteTime =
		!/(text|video|file|meeting|audio)/g.test(props.type || "text") &&
		!(props.type === "location" && props.text);
	const dateText =
		props.date && (props.dateString || format(props.date, "HH:mm"));

	useEffect(() => {
		if (prevProps.current !== focus && focus) {
			if (messageRef?.current) {
				(messageRef.current as HTMLDivElement)?.scrollIntoView({
					behavior: "smooth",
					block: "nearest",
					inline: "start",
				});

				if (props.onMessageFocused instanceof Function)
					props.onMessageFocused(true);
			}
		}
		prevProps.current = focus;
	}, [focus, props.onMessageFocused]);

	return (
		<div
			ref={messageRef}
			className={classNames("rce-container-mbox", props.className)}
			onClick={props.onClick}
			onKeyDown={console.log}
		>
			{props.renderAddCmp instanceof Function
				? props.renderAddCmp()
				: props.renderAddCmp}
			{props.type === "system" ? (
				<SystemMessage {...props} focus={focus} notch={notch} />
			) : (
				<div
					style={style}
					className={classNames(
						positionCls,
						{ "rce-mbox--clear-padding": thatAbsoluteTime },
						{ "rce-mbox--clear-notch": !notch },
						{ "message-focus": focus },
					)}
				>
					{notch &&
						(props.position === "right" ? (
							<RightNotch style={notchStyle} focus={focus} />
						) : (
							<LeftNotch style={notchStyle} focus={focus} />
						))}
					<div className="rce-mbox-body" onContextMenu={props.onContextMenu}>
						{!props.retracted && props.forwarded === true && (
							<div
								className={classNames(
									"rce-mbox-forward",
									{ "rce-mbox-forward-right": props.position === "left" },
									{ "rce-mbox-forward-left": props.position === "right" },
								)}
								onClick={props.onForwardClick}
								onKeyDown={console.log}
							>
								<RiShareForwardFill />
							</div>
						)}

						{!props.retracted && props.replyButton && (
							<div
								className={
									!props.forwarded
										? classNames(
												"rce-mbox-forward",
												{ "rce-mbox-forward-right": props.position === "left" },
												{ "rce-mbox-forward-left": props.position === "right" },
											)
										: classNames(
												"rce-mbox-forward",
												{
													"rce-mbox-reply-btn-right": props.position === "left",
												},
												{
													"rce-mbox-reply-btn-left": props.position === "right",
												},
											)
								}
								onClick={props.onReplyClick}
								onKeyDown={console.log}
							>
								<MdMessage />
							</div>
						)}

						{!props.retracted && props.removeButton && (
							<div
								className={
									props.forwarded
										? classNames(
												"rce-mbox-remove",
												{ "rce-mbox-remove-right": props.position === "left" },
												{ "rce-mbox-remove-left": props.position === "right" },
											)
										: classNames(
												"rce-mbox-forward",
												{
													"rce-mbox-reply-btn-right": props.position === "left",
												},
												{
													"rce-mbox-reply-btn-left": props.position === "right",
												},
											)
								}
								onClick={props.onRemoveMessageClick}
								onKeyDown={console.log}
							>
								<MdDelete />
							</div>
						)}

						{(props.title || props.avatar) && (
							<div
								style={{ ...(props.titleColor && { color: props.titleColor }) }}
								onClick={props.onTitleClick}
								onKeyDown={console.log}
								className={classNames("rce-mbox-title", {
									"rce-mbox-title--clear": props.type === "text",
								})}
							>
								{props.avatar && (
									<Avatar
										size={"xsmall"}
										letterItem={props.letterItem}
										src={props.avatar}
									/>
								)}
								{props.title && !props.reply && <span>{props.title}</span>}
							</div>
						)}

						{props.forwardedMessageText ? (
							<div className="rce-mbox-forwardedMessage">
								<div className="rce-mbox-forwarded-message">
									<TiArrowForward fontSize={18} />
									<i style={{ margin: "0 3px 1px 0" }}>
										{" "}
										{props.forwardedMessageText}
									</i>
								</div>
							</div>
						) : null}

						{!props.forwardedMessageText && props.reply ? (
							<ReplyMessage
								onClick={() => props.onReplyMessageClick}
								{...props.reply}
							/>
						) : null}

						{props.type === "text" && (
							<div
								className={classNames("rce-mbox-text", {
									"rce-mbox-text-retracted": props.retracted,
									left: props.position === "left",
									right: props.position === "right",
								})}
							>
								{!props.forwardedMessageText && props.retracted && (
									<MdOutlineEdit />
								)}
								{props.text}
							</div>
						)}

						{props.type === "location" && (
							<LocationMessage focus={focus} notch={notch} {...props} />
						)}

						{props.type === "photo" && (
							<PhotoMessage focus={focus} notch={notch} {...props} />
						)}

						{props.type === "video" && (
							<VideoMessage focus={focus} notch={notch} {...props} />
						)}

						{props.type === "file" && (
							<FileMessage focus={focus} notch={notch} {...props} />
						)}

						{props.type === "meeting" && (
							<MeetingMessage focus={focus} notch={notch} {...props} />
						)}
						{props.type === "audio" && (
							<AudioMessage focus={focus} notch={notch} {...props} />
						)}

						{props.type === "meetingLink" && (
							<MeetingLink {...props} actionButtons={actionButtons} />
						)}

						<div
							title={props.statusTitle}
							className={classNames(
								"rce-mbox-time",
								{ "rce-mbox-time-block": thatAbsoluteTime },
								{ "non-copiable": !props.copiableDate },
							)}
							data-text={props.copiableDate ? undefined : dateText}
						>
							{props.copiableDate &&
								props.date &&
								(props.dateString || format(props.date, "HH:mm"))}
							{props.status && (
								<span className="rce-mbox-status">
									{props.status === "waiting" && (
										<MdAccessTime
											color={"var(--rce-color-gray)"}
											style={{ fontSize: 18 }}
										/>
									)}

									{props.status === "sent" && (
										<MdCheck
											color={"var(--rce-color-light-blue)"}
											style={{ fontSize: 18 }}
										/>
									)}

									{props.status === "received" && (
										<MdDoneAll
											color={"var(--rce-color-green)"}
											style={{ fontSize: 18 }}
										/>
									)}

									{props.status === "read" && (
										<MdDoneAll
											color={"var(--rce-color-light-blue)"}
											style={{ fontSize: 18 }}
										/>
									)}
								</span>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default MessageBox;
