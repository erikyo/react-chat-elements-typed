import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import "./MessageBox.css";

import classNames from "classnames";

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

import {
	MdDelete,
	MdEdit,
	MdOutlineEmojiEmotions,
	MdReply,
	MdReplyAll,
} from "react-icons/md";

import { format } from "date-fns";
import { LeftNotch } from "../SvgIcon/leftNotch";
import { RightNotch } from "../SvgIcon/rightNotch";
import Button from "../Button/Button";
import { relativeDateFormat } from "../MeetingItem/MeetingItem";
import { Reactions } from "./Reactions";
import { MessageStatus } from "./MessageStatus";
import type { IMeetingLinkMessageProps, MessageBoxType } from "../types";

const MessageBox: FC<MessageBoxType> = (props) => {
	const prevProps = useRef(props.focus);
	const messageRef = useRef<HTMLDivElement | null>(null);

	const positionCls = classNames(
		"rce-mbox",
		`rce-mbox-${props.position === "right" ? "right" : "left"}`,
	);

	const defaultActionStyle = {
		color: "var(--rce-color-white)",
		backgroundColor: "rgba(110, 110, 120, .5)",
		style: {
			padding: "6px",
			borderWidth: 0,
		},
	};

	const thatAbsoluteTime =
		!/(text|video|file|meeting|audio)/g.test(props.type || "text") &&
		!(props.type === "location" && props.text);

	const dateText =
		props.date && (props.dateString || format(props.date, "HH:mm"));

	useEffect(() => {
		if (prevProps.current !== props.focus && props.focus) {
			if (messageRef?.current) {
				(messageRef.current as HTMLDivElement)?.scrollIntoView({
					behavior: "smooth",
					block: "nearest",
					inline: "start",
				});

				if (props?.onMessageFocused) props.onMessageFocused(true);
			}
		}
		prevProps.current = props.focus;
	}, [props.focus, props.onMessageFocused]);

	return (
		<div
			ref={messageRef}
			className={classNames("rce-container-mbox", props.className)}
		>
			{props?.renderAddCmp}
			{props.type === "system" ? (
				<SystemMessage {...props} />
			) : (
				<div
					className={classNames(
						positionCls,
						{ "rce-mbox--clear-padding": thatAbsoluteTime },
						{ "rce-mbox--clear-notch": !!props?.notch },
					)}
				>
					{props?.notch &&
						(props.position === "right" ? (
							<RightNotch
								style={{
									fill: "var(--rce-mbox-background-right)",
									...props.notchStyle,
								}}
								focus={props.focus}
							/>
						) : (
							<LeftNotch
								style={{
									fill: "var(--rce-mbox-background)",
									...props.notchStyle,
								}}
								focus={props.focus}
							/>
						))}
					<div
						className={classNames("rce-mbox-body", {
							"message-focus": props.focus,
						})}
						onContextMenu={props?.onContextMenu}
						style={props.style}
					>
						<div className={"rce-mbox-action-buttons"}>
							{!props.retracted && props.EmojiButton === true && (
								<Button
									circle
									className={classNames(
										"rce-mbox-action",
										"rce-mbox-emoji-button",
										{
											"rce-mbox-forward-right": props.position === "left",
										},
										{
											"rce-mbox-forward-left": props.position === "right",
										},
									)}
									onClick={(e) => props?.AddEmoji?.(e, props)}
									icon={{
										component: <MdOutlineEmojiEmotions size={20} />,
									}}
									{...defaultActionStyle}
								/>
							)}

							{!props.retracted && !props.forwarded && (
								<Button
									circle
									className={classNames(
										"rce-mbox-action",
										"rce-mbox-forward",
										`rce-mbox-forward-${
											props.position === "right" ? "right" : "left"
										}`,
									)}
									onClick={(e) => props.onForward?.(e, props)}
									icon={{
										component: (
											<MdReplyAll
												size={20}
												className={"reverse-icon-horizontal"}
											/>
										),
									}}
									{...defaultActionStyle}
								/>
							)}

							{!props.retracted && props.replyButton && (
								<Button
									circle
									className={
										!props.forwarded
											? classNames(
													"rce-mbox-action",
													"rce-mbox-forward",
													`rce-mbox-forward-${props.position}`,
												)
											: classNames(
													"rce-mbox-action",
													"rce-mbox-forward",
													`rce-mbox-reply-btn-${props.position}`,
												)
									}
									onClick={(ev) => props.onReplyMessage?.(ev, props)}
									icon={{
										component: (
											<MdReply
												size={20}
												className={"reverse-icon-horizontal"}
											/>
										),
									}}
									{...defaultActionStyle}
								/>
							)}

							{!props.retracted && props.removeButton && (
								<Button
									circle
									className={
										props.forwarded
											? classNames(
													"rce-mbox-action",
													"rce-mbox-remove",
													`rce-mbox-remove-${props.position}`,
												)
											: classNames(
													"rce-mbox-action",
													"rce-mbox-forward",
													`rce-mbox-reply-btn-${props.position}`,
												)
									}
									onClick={(ev) => props.onRemoveMessage?.(ev, props)}
									icon={{
										component: <MdDelete size={20} />,
									}}
									{...defaultActionStyle}
								/>
							)}
						</div>

						{(props.title || props.avatar) && (
							<Button
								link
								style={{
									...(props.titleColor && {
										color: props.titleColor,
									}),
								}}
								onClick={(event) => props.onTitleClick?.(event, props)}
								className={classNames("rce-mbox-title", {
									"rce-mbox-title--clear": props.type === "text",
								})}
							>
								{props.avatar && props.title && (
									<Avatar
										title={props.title}
										size={"xsmall"}
										letterItem={props.letterItem}
										src={props.avatar}
									/>
								)}
								{props.title && <span>{props.title}</span>}
							</Button>
						)}

						{props.reply ? (
							<ReplyMessage
								onClick={(e) => props.onReplyMessage?.(e, props)}
								{...props.reply}
							/>
						) : null}

						{props.forwarded ? (
							<div className="rce-mbox-forwarded-message">
								<div className="rce-mbox-forwarded-message-inner">
									<MdReply
										size={15}
										style={{ padding: 0 }}
										className={"reverse-icon-horizontal"}
									/>
									{props?.forwardedMessageText && (
										<i>{props.forwardedMessageText}</i>
									)}
								</div>
							</div>
						) : null}

						{props.type === "text" && (
							<div
								className={classNames(
									"rce-mbox-text",
									props?.position === "right" ? "right" : "left",
									{
										"rce-mbox-text-retracted": props.retracted,
									},
								)}
							>
								{!props.forwarded && props.retracted && <MdEdit />}
								{props.text}
							</div>
						)}

						{props.type === "location" && <LocationMessage {...props} />}

						{props.type === "photo" && <PhotoMessage {...props} />}

						{props.type === "video" && <VideoMessage {...props} />}

						{props.type === "file" && <FileMessage {...props} />}

						{props.type === "meeting" && <MeetingMessage {...props} />}

						{props.type === "audio" && <AudioMessage {...props} />}

						{props.type === "meetingLink" &&
							(props as IMeetingLinkMessageProps)?.actionButtons && (
								<MeetingLink
									{...props}
									text={
										(props as IMeetingLinkMessageProps)?.meetingLinkText ||
										"Join Meeting"
									}
									actionButtons={
										(props as IMeetingLinkMessageProps).actionButtons
									}
									meetingID={(props as IMeetingLinkMessageProps).meetingID}
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
								props.date !== undefined &&
								relativeDateFormat(props.date)}
							{props?.status && <MessageStatus status={props.status} />}
						</div>

						{props?.reactions && <Reactions reactions={props.reactions} />}
					</div>
				</div>
			)}
		</div>
	);
};

export default MessageBox;
