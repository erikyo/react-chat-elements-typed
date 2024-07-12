import type React from "react";
import type { FC } from "react";
import { useEffect, useRef } from "react";
import "./MessageBox.css";

import PhotoMessage from "../PhotoMessage/PhotoMessage";
import FileMessage from "../FileMessage/FileMessage";
import SystemMessage from "../SystemMessage/SystemMessage";
import LocationMessage from "../LocationMessage/LocationMessage";
import SpotifyMessage from "../SpotifyMessage/SpotifyMessage";
import ReplyMessage from "../ReplyMessage/ReplyMessage";
import MeetingMessage from "../MeetingMessage/MeetingMessage";
import VideoMessage from "../VideoMessage/VideoMessage";
import AudioMessage from "../AudioMessage/AudioMessage";
import MeetingLink from "../MeetingLink/MeetingLink";

import Avatar from "../Avatar/Avatar";

import { RiShareForwardFill } from "react-icons/ri";
import { IoIosDoneAll } from "react-icons/io";
import {
	MdAccessTime,
	MdBlock,
	MdCheck,
	MdDelete,
	MdDoneAll,
	MdMessage,
} from "react-icons/md";
import { TiArrowForward } from "react-icons/ti";

import { format } from "date-fns";

import classNames from "classnames";
import type {
	IAudioMessageProps,
	IFileMessageProps,
	ILocationMessageProps,
	IMeetingMessageProps,
	IMessageBoxProps,
	IPhotoMessageProps,
	ISpotifyMessageProps,
	IVideoMessageProps,
} from "../type";
import type { IMeetingLinkMessage } from "../type";

const MessageBox: FC<IMessageBoxProps> = ({
	focus = false,
	notch = true,
	styles,
	actionButtons,
	...props
}): React.ReactElement => {
	const prevProps = useRef(focus);
	const messageRef = useRef<HTMLDivElement | null>(null);

	const positionCls = classNames("rce-mbox", {
		"rce-mbox-right": props.position === "right",
	});
	const thatAbsoluteTime =
		!/(text|video|file|meeting|audio)/g.test(props.type || "text") &&
		!(props.type === "location" && props.text);
	const dateText =
		props.date &&
		(props.dateString || format(props.date, "dd/MM/yyyy HH:mm:ss"));

	useEffect(() => {
		if (prevProps.current !== focus && focus) {
			if (messageRef?.current) {
				(messageRef.current as HTMLDivElement)?.scrollIntoView();

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
			onKeyDown={(e) => console.log(e)}
		>
			{props.renderAddCmp instanceof Function
				? props.renderAddCmp()
				: props.renderAddCmp}
			{props.type === "system" ? (
				<SystemMessage {...props} focus={focus} notch={notch} />
			) : (
				<div
					style={styles}
					className={classNames(
						positionCls,
						{ "rce-mbox--clear-padding": thatAbsoluteTime },
						{ "rce-mbox--clear-notch": !notch },
						{ "message-focus": focus },
					)}
				>
					<div className="rce-mbox-body" onContextMenu={props.onContextMenu}>
						{!props.retracted && props.forwarded && (
							<div
								className={classNames(
									"rce-mbox-forward",
									{ "rce-mbox-forward-right": props.position === "left" },
									{ "rce-mbox-forward-left": props.position === "right" },
								)}
								onClick={props.onForwardClick}
								onKeyDown={(e) => console.log("handleKeyDown", e)}
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
								onKeyDown={(e) => console.log("handleKeyDown", e)}
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
								onKeyDown={(e) => console.log("handleKeyDown", e)}
							>
								<MdDelete />
							</div>
						)}

						{(props.title || props.avatar) && (
							<div
								style={{ ...(props.titleColor && { color: props.titleColor }) }}
								onClick={props.onTitleClick}
								onKeyDown={(e) => console.log("handleKeyDown", e)}
								className={classNames("rce-mbox-title", {
									"rce-mbox-title--clear": props.type === "text",
								})}
							>
								{props.avatar && (
									<Avatar letterItem={props.letterItem} src={props.avatar} />
								)}
								{props.title && <span>{props.title}</span>}
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
								onClick={(e) => props?.onReplyMessageClick}
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
								{props.retracted && <MdBlock />}
								{props.text}
							</div>
						)}

						{props.type === "location" && (
							<LocationMessage {...(props as ILocationMessageProps)} />
						)}

						{props.type === "photo" && (
							<PhotoMessage {...(props as IPhotoMessageProps)} />
						)}

						{props.type === "video" && (
							<VideoMessage {...(props as IVideoMessageProps)} />
						)}

						{props.type === "file" && (
							<FileMessage {...(props as IFileMessageProps)} />
						)}

						{props.type === "spotify" && (
							<SpotifyMessage {...(props as ISpotifyMessageProps)} />
						)}

						{props.type === "meeting" && (
							<MeetingMessage {...(props as IMeetingMessageProps)} />
						)}
						{props.type === "audio" && (
							<AudioMessage {...(props as IAudioMessageProps)} />
						)}

						{props.type === "meetingLink" && (
							<MeetingLink
								{...(props as IMeetingLinkMessage)}
								actionButtons={actionButtons}
							/>
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
								(props.dateString || format(props.date, "dd/MM/yyyy HH:mm:ss"))}
							{props.status && (
								<span className="rce-mbox-status">
									{props.status === "waiting" && <MdAccessTime />}

									{props.status === "sent" && <MdCheck />}

									{props.status === "received" && <IoIosDoneAll />}

									{props.status === "read" && <MdDoneAll color="#4FC3F7" />}
								</span>
							)}
						</div>
					</div>

					{notch &&
						(props.position === "right" ? (
							<svg
								style={props.notchStyle}
								className={classNames("rce-mbox-right-notch", {
									"message-focus": focus,
								})}
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
							>
								<path d="M0 0v20L20 0" />
							</svg>
						) : (
							<div>
								<svg
									style={props.notchStyle}
									className={classNames("rce-mbox-left-notch", {
										"message-focus": focus,
									})}
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
								>
									<defs>
										<filter id="filter1" x="0" y="0">
											<feOffset
												result="offOut"
												in="SourceAlpha"
												dx="-2"
												dy="-5"
											/>
											<feGaussianBlur
												result="blurOut"
												in="offOut"
												stdDeviation="3"
											/>
											<feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
										</filter>
									</defs>
									<path d="M20 0v20L0 0" filter="url(#filter1)" />
								</svg>
							</div>
						))}
				</div>
			)}
		</div>
	);
};

export default MessageBox;
