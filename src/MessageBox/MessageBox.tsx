import type React from "react";
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
import type { MessageBoxType } from "../types";
import Button from "../Button/Button";
import { relativeDateFormat } from "../MeetingItem/MeetingItem";
import { Reactions } from "./Reactions";
import { MessageStatus } from "./MessageStatus";

const MessageBox: FC<MessageBoxType> = (props) => {
	const [attributes, setAttributes] = useState<MessageBoxType>({
		style: {},
		actionButtons: undefined,
		forwardedMessageText: "Forwarded",
		notch: true,
		...props,
	});
	const prevProps = useRef(attributes.focus);
	const messageRef = useRef<HTMLDivElement | null>(null);

	const positionCls = classNames("rce-mbox", {
		"rce-mbox-right": attributes.position === "right",
		"rce-mbox-left": attributes.position !== "right",
	});

	const defaultActionStyle = {
		color: "var(--rce-color-white)",
		backgroundColor: "rgba(110, 110, 120, .5)",
		style: {
			padding: "6px",
			borderWidth: 0,
		},
	};

	const thatAbsoluteTime =
		!/(text|video|file|meeting|audio)/g.test(attributes.type || "text") &&
		!(attributes.type === "location" && attributes.text);

	const dateText =
		attributes.date &&
		(attributes.dateString || format(attributes.date, "HH:mm"));

	useEffect(() => {
		if (prevProps.current !== attributes.focus && attributes.focus) {
			if (messageRef?.current) {
				(messageRef.current as HTMLDivElement)?.scrollIntoView({
					behavior: "smooth",
					block: "nearest",
					inline: "start",
				});

				if (attributes.onMessageFocused instanceof Function)
					attributes.onMessageFocused(true);
			}
		}
		prevProps.current = attributes.focus;
	}, [attributes.focus, attributes.onMessageFocused]);

	return (
		<div
			ref={messageRef}
			className={classNames("rce-container-mbox", attributes.className)}
		>
			{attributes?.renderAddCmp}
			{attributes.type === "system" ? (
				<SystemMessage {...attributes} />
			) : (
				<div
					className={classNames(
						positionCls,
						{ "rce-mbox--clear-padding": thatAbsoluteTime },
						{ "rce-mbox--clear-notch": !attributes.notch },
					)}
				>
					{attributes.notch &&
						(attributes.position === "right" ? (
							<RightNotch
								style={{
									fill: "var(--rce-mbox-background-right)",
									...attributes.notchStyle,
								}}
								focus={attributes.focus}
							/>
						) : (
							<LeftNotch
								style={{
									fill: "var(--rce-mbox-background)",
									...attributes.notchStyle,
								}}
								focus={attributes.focus}
							/>
						))}
					<div
						className={classNames("rce-mbox-body", {
							"message-focus": attributes.focus,
						})}
						onContextMenu={attributes?.onContextMenu}
						style={attributes.style}
					>
						<div className={"rce-mbox-action-buttons"}>
							{!attributes.retracted && attributes.EmojiButton === true && (
								<Button
									circle
									className={classNames(
										"rce-mbox-action",
										"rce-mbox-emoji-button",
										{
											"rce-mbox-forward-right": attributes.position === "left",
										},
										{
											"rce-mbox-forward-left": attributes.position === "right",
										},
									)}
									onClick={(e) =>
										attributes?.AddEmoji?.(e, attributes, setAttributes)
									}
									icon={{
										component: <MdOutlineEmojiEmotions size={20} />,
									}}
									{...defaultActionStyle}
								/>
							)}

							{!attributes.retracted && !attributes.forwarded && (
								<Button
									circle
									className={classNames(
										"rce-mbox-action",
										"rce-mbox-forward",
										{
											"rce-mbox-forward-right": attributes.position === "left",
										},
										{
											"rce-mbox-forward-left": attributes.position === "right",
										},
									)}
									onClick={(e) =>
										attributes.onForward?.(e, attributes, setAttributes)
									}
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

							{!attributes.retracted && attributes.replyButton && (
								<Button
									circle
									className={
										!attributes.forwarded
											? classNames(
													"rce-mbox-action",
													"rce-mbox-forward",
													`rce-mbox-forward-${attributes.position}`,
												)
											: classNames(
													"rce-mbox-action",
													"rce-mbox-forward",
													`rce-mbox-reply-btn-${attributes.position}`,
												)
									}
									onClick={(ev) =>
										attributes.onReplyMessage?.(ev, attributes, setAttributes)
									}
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

							{!attributes.retracted && attributes.removeButton && (
								<Button
									circle
									className={
										attributes.forwarded
											? classNames(
													"rce-mbox-action",
													"rce-mbox-remove",
													`rce-mbox-remove-${attributes.position}`,
												)
											: classNames(
													"rce-mbox-action",
													"rce-mbox-forward",
													`rce-mbox-reply-btn-${attributes.position}`,
												)
									}
									onClick={(ev) =>
										attributes.onRemoveMessage?.(ev, attributes, setAttributes)
									}
									icon={{
										component: <MdDelete size={20} />,
									}}
									{...defaultActionStyle}
								/>
							)}
						</div>

						{(attributes.title || attributes.avatar) && (
							<div
								style={{
									...(attributes.titleColor && {
										color: attributes.titleColor,
									}),
								}}
								onClick={(event) =>
									attributes.onTitleClick?.(event, attributes, setAttributes)
								}
								onKeyDown={(event) =>
									attributes.onTitleClick?.(event, attributes, setAttributes)
								}
								className={classNames("rce-mbox-title", {
									"rce-mbox-title--clear": attributes.type === "text",
								})}
							>
								{attributes.avatar && (
									<Avatar
										title={attributes.title || "Unknown"}
										size={"xsmall"}
										letterItem={attributes.letterItem}
										src={attributes.avatar}
									/>
								)}
								{attributes.title && <span>{attributes.title}</span>}
							</div>
						)}

						{attributes.reply ? (
							<ReplyMessage
								onClick={(e) =>
									attributes.onReplyMessage?.(e, attributes, setAttributes)
								}
								{...attributes.reply}
							/>
						) : null}

						{attributes.forwarded ? (
							<div className="rce-mbox-forwarded-message">
								<div className="rce-mbox-forwarded-message-inner">
									<MdReply
										size={15}
										style={{ padding: 0 }}
										className={"reverse-icon-horizontal"}
									/>
									<i>{attributes.forwardedMessageText}</i>
								</div>
							</div>
						) : null}

						{attributes.type === "text" && (
							<div
								className={classNames(
									"rce-mbox-text",
									attributes?.position === "right" ? "right" : "left",
									{
										"rce-mbox-text-retracted": attributes.retracted,
									},
								)}
							>
								{!attributes.forwarded && attributes.retracted && <MdEdit />}
								{attributes.text}
							</div>
						)}

						{attributes.type === "location" && (
							<LocationMessage {...attributes} />
						)}

						{attributes.type === "photo" && <PhotoMessage {...attributes} />}

						{attributes.type === "video" && <VideoMessage {...attributes} />}

						{attributes.type === "file" && <FileMessage {...attributes} />}

						{attributes.type === "meeting" && (
							<MeetingMessage {...attributes} />
						)}
						{attributes.type === "audio" && <AudioMessage {...attributes} />}

						{attributes.type === "meetingLink" && (
							<MeetingLink
								{...attributes}
								actionButtons={props.actionButtons}
							/>
						)}

						<div
							title={attributes.statusTitle}
							className={classNames(
								"rce-mbox-time",
								{ "rce-mbox-time-block": thatAbsoluteTime },
								{ "non-copiable": !attributes.copiableDate },
							)}
							data-text={attributes.copiableDate ? undefined : dateText}
						>
							{attributes.copiableDate &&
								attributes.date !== undefined &&
								relativeDateFormat(attributes.date)}
							{attributes?.status && (
								<MessageStatus status={attributes.status} />
							)}
						</div>
						{attributes?.reactions && (
							<Reactions reactions={attributes.reactions} />
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default MessageBox;
