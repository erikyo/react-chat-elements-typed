import type React from "react";
import type { LegacyRef } from "react";
import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import MessageBox from "../MessageBox/MessageBox";
import { FaChevronDown } from "react-icons/fa";

import type { IMessageListProps, MessageListEvent } from "../type";

import "./MessageList.css";
import type { MessageListFocusEvent } from "../type";

const MessageList: FC<IMessageListProps> = ({
	reference,
	lockable = false,
	toBottomHeight = 300,
	downButton,
	...props
}: IMessageListProps) => {
	const [scrollBottom, setScrollBottom] = useState<number>(0);
	const [_downButton, setDownButton] = useState(false);
	const prevProps = useRef(props);

	const checkScroll = () => {
		const e = reference ?? null;
		if (e?.current) return;
		const el = e.current as HTMLDivElement;

		if (
			toBottomHeight === "100%" ||
			(toBottomHeight && scrollBottom < Number(toBottomHeight))
		) {
			el.scrollTop = el.scrollHeight; // scroll to bottom
		} else {
			if (lockable && e.current) {
				el.scrollTop = el.scrollHeight - el.offsetHeight - scrollBottom;
			}
		}
	};

	useEffect(() => {
		if (!reference?.current) return;

		if (prevProps.current?.dataSource?.length !== props.dataSource.length) {
			setScrollBottom(getBottom(reference.current));
			checkScroll();
		}

		prevProps.current = props;
	}, [checkScroll, reference, props]);

	const getBottom = (e: HTMLElement | undefined): number => {
		if (e) {
			return e.scrollHeight - e.scrollTop - e.offsetHeight;
		}
		return 0;
	};

	const onOpen: MessageListEvent = (item, index, event) => {
		if (props.onOpen instanceof Function) props.onOpen(item, index, event);
	};

	const onDownload: MessageListEvent = (item, index, event) => {
		if (props.onDownload instanceof Function)
			props.onDownload(item, index, event);
	};

	const onPhotoError: MessageListEvent = (item, index, event) => {
		if (props.onPhotoError instanceof Function)
			props.onPhotoError(item, index, event);
	};

	const onClicked: MessageListEvent = (item, index, event) => {
		if (props.onClicked instanceof Function)
			props.onClicked(item, index, event);
	};

	const onTitleClick: MessageListEvent = (item, index, event) => {
		if (props.onTitleClick instanceof Function)
			props.onTitleClick(item, index, event);
	};

	const onForwardClick: MessageListEvent = (item, index, event) => {
		if (props.onForwardClick instanceof Function)
			props.onForwardClick(item, index, event);
	};

	const onReplyClick: MessageListEvent = (item, index, event) => {
		if (props.onReplyClick instanceof Function)
			props.onReplyClick(item, index, event);
	};

	const onReplyMessageClick: MessageListEvent = (item, index, event) => {
		if (props.onReplyMessageClick instanceof Function)
			props.onReplyMessageClick(item, index, event);
	};

	const onRemoveMessageClick: MessageListEvent = (item, index, event) => {
		if (props.onRemoveMessageClick instanceof Function)
			props.onRemoveMessageClick(item, index, event);
	};

	const onContextMenuOpen: MessageListEvent = (item, index, event) => {
		if (props.onContextMenuOpen instanceof Function)
			props.onContextMenuOpen(event);
	};

	const onMessageFocused: MessageListFocusEvent = (item, index, event) => {
		if (props.onMessageFocused instanceof Function)
			props.onMessageFocused(item, index, event);
	};

	const onMeetingMessageClick: MessageListEvent = (item, index, event) => {
		if (props.onMeetingMessageClick instanceof Function)
			props.onMeetingMessageClick(item, index, event);
	};

	const onScroll = (e: React.UIEvent<HTMLDivElement>): void => {
		const element = e?.currentTarget as HTMLDivElement;
		const bottom = getBottom(element);
		setScrollBottom(bottom);
		if (
			toBottomHeight === "100%" ||
			(toBottomHeight && bottom > Number(toBottomHeight))
		) {
			if (!_downButton) {
				setDownButton(true);
				setScrollBottom(bottom);
			}
		} else {
			if (_downButton) {
				setDownButton(false);
				setScrollBottom(bottom);
			}
		}

		if (props.onScroll instanceof Function) {
			props.onScroll(e as React.UIEvent<HTMLDivElement>);
		}
	};

	const toBottom = (e: React.MouseEvent<HTMLElement>) => {
		if (!reference?.current) return;
		const el = reference.current as HTMLDivElement;
		el.scrollTop = el.scrollHeight;
		if (props.onDownButtonClick instanceof Function) {
			props.onDownButtonClick(e);
		}
	};

	const onMeetingMoreSelect: MessageListEvent = (item, i, e) => {
		if (props.onMeetingMoreSelect instanceof Function)
			props.onMeetingMoreSelect(item, i, e);
	};

	const onMeetingLinkClick: MessageListEvent = (item, i, e) => {
		if (props.onMeetingLinkClick instanceof Function)
			props.onMeetingLinkClick(item, i, e);
	};

	return (
		<div
			className={classNames(["rce-container-mlist", props.className])}
			{...props.customProps}
		>
			{!!props.children && props.isShowChild && props.children}
			<div
				ref={reference as LegacyRef<HTMLDivElement>}
				onScroll={onScroll}
				className="rce-mlist"
			>
				{props.dataSource?.map((x, i) => {
					return (
						<MessageBox
							{...x}
							key={`rce-mlist${i.toString()}`}
							onOpen={props.onOpen && ((e) => onOpen(x, i, e))}
							onPhotoError={
								props.onPhotoError &&
								((e: React.MouseEvent) => onPhotoError(x, i, e))
							}
							onDownload={props.onDownload && ((e) => onDownload(x, i, e))}
							onTitleClick={
								props.onTitleClick && ((e) => onTitleClick(x, i, e))
							}
							onForwardClick={
								props.onForwardClick && ((e) => onForwardClick(x, i, e))
							}
							onReplyClick={
								props.onReplyClick && ((e) => onReplyClick(x, i, e))
							}
							onReplyMessageClick={
								props.onReplyMessageClick &&
								((e: React.MouseEvent) => onReplyMessageClick(x, i, e))
							}
							onRemoveMessageClick={
								props.onRemoveMessageClick &&
								((e: React.MouseEvent) => onRemoveMessageClick(x, i, e))
							}
							onClick={
								props.onClicked && ((e: React.MouseEvent) => onClicked(x, i, e))
							}
							onContextMenuOpen={
								props.onContextMenuOpen &&
								((e: React.MouseEvent) => onContextMenuOpen(x, i, e))
							}
							onMeetingMoreSelect={
								props.onMeetingMoreSelect &&
								((e: React.MouseEvent) => onMeetingMoreSelect(x, i, e))
							}
							onMessageFocused={
								props.onMessageFocused &&
								((r: boolean) => onMessageFocused(x, i, r))
							}
							onMeetingMessageClick={
								props.onMeetingMessageClick &&
								((e: React.MouseEvent) => onMeetingMessageClick(x, i, e))
							}
							onMeetingTitleClick={props.onMeetingTitleClick}
							onMeetingVideoLinkClick={props.onMeetingVideoLinkClick}
							onMeetingLinkClick={
								props.onMeetingLinkClick &&
								((e: React.MouseEvent) => onMeetingLinkClick(x, i, e))
							}
							actionButtons={props.actionButtons}
							styles={props.messageBoxStyles}
							notchStyle={props.notchStyle}
						/>
					);
				})}
			</div>
			{downButton === true && _downButton && toBottomHeight !== "100%" && (
				<div
					className="rce-mlist-down-button"
					onClick={(event) => toBottom}
					onKeyDown={(event) => toBottom}
				>
					<FaChevronDown />
					{props.downButtonBadge !== undefined ? (
						<span className="rce-mlist-down-button--badge">
							{props.downButtonBadge.toString()}
						</span>
					) : null}
				</div>
			)}
		</div>
	);
};

export default MessageList;
