import {
	type FC,
	type Key,
	type LegacyRef,
	type MouseEvent,
	type UIEvent,
	useEffect,
	useRef,
	useState,
} from "react";
import "./MessageList.css";

import MessageBox from "../MessageBox/MessageBox.js";

import classNames from "classnames";
import { FaChevronDown } from "react-icons/fa";
import type {
	IMessageListProps,
	MeetingMessageEvent,
	MessageListEvent,
	MessageType,
} from "../types.js";

const MessageList: FC<IMessageListProps> = ({
	reference,
	lockable = false,
	toBottomHeight = 300,
	downButton,
	...props
}) => {
	const [scrollBottom, setScrollBottom] = useState(0);
	const [_downButton, setDownButton] = useState(false);
	const prevProps = useRef(props);

	const checkScroll = () => {
		const e = reference;
		if (!e || !e.current) return;

		if (
			toBottomHeight === "100%" ||
			(toBottomHeight && scrollBottom < Number(toBottomHeight))
		) {
			e.current.scrollTop = e.current.scrollHeight; // scroll to bottom
		} else {
			if (lockable) {
				e.current.scrollTop =
					e.current.scrollHeight - e.current.offsetHeight - scrollBottom;
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

	const onClick: MessageListEvent = (x, i, e) => {
		if (props.onClick instanceof Function) props.onClick(x, i, e);
	};

	const onOpen: MeetingMessageEvent = (item, index, event) => {
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

	const onContextMenu: MessageListEvent = (item, index, event) => {
		if (props.onContextMenu instanceof Function)
			props.onContextMenu(item, index, event);
	};

	const onMessageFocused: (
		item: MessageType,
		index: number,
		isFocused: boolean,
	) => void = (item, index, isFocused) => {
		if (props.onMessageFocused instanceof Function)
			props.onMessageFocused(item, index, isFocused);
	};

	const onMeetingMessageClick: MessageListEvent = (item, index, event) => {
		if (props.onMeetingMessageClick instanceof Function)
			props.onMeetingMessageClick(item, index, event);
	};

	const onScroll = (e: UIEvent): void => {
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
			props.onScroll(e);
		}
	};

	const toBottom = (e: MouseEvent) => {
		if (!reference?.current) return;
		const el = reference.current as HTMLDivElement;
		el.scrollTop = el.scrollHeight;
		if (props.onDownButtonClick instanceof Function) props.onDownButtonClick(e);
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
				onScroll={(e) => onScroll(e)}
				className="rce-mlist"
			>
				{props.dataSource
					? props.dataSource.map((x, i: number) => (
							<MessageBox
								{...x}
								key={i.toString()}
								onOpen={(e: MouseEvent) => onOpen(x, i, e)}
								onPhotoError={(e: MouseEvent) => onPhotoError(x, i, e)}
								onDownload={(e) => onDownload(x, i, e)}
								onTitleClick={
									props.onTitleClick && ((e) => onTitleClick(x, i, e))
								}
								onForwardClick={(e) => onForwardClick(x, i, e)}
								onReplyClick={(e) => onReplyClick(x, i, e)}
								onReplyMessageClick={(e) => onReplyMessageClick(x, i, e)}
								onRemoveMessageClick={(e) => onRemoveMessageClick(x, i, e)}
								onClick={(e) => onClick(x, i, e)}
								onContextMenu={(e) => onContextMenu(x, i, e)}
								onMeetingMoreSelect={(e: MouseEvent) =>
									onMeetingMoreSelect(x, i, e)
								}
								onMessageFocused={(r) => onMessageFocused(x, i, r)}
								onMeetingMessageClick={(e) => onMeetingMessageClick(x, i, e)}
								onMeetingTitleClick={props.onMeetingTitleClick}
								onMeetingVideoLinkClick={props.onMeetingVideoLinkClick}
								onMeetingLinkClick={(e) => onMeetingLinkClick(x, i, e)}
								actionButtons={props.actionButtons}
								styles={props.messageBoxStyles}
								notchStyle={props.notchStyle}
							/>
						))
					: null}
			</div>
			{downButton === true && _downButton && toBottomHeight !== "100%" && (
				<div
					className="rce-mlist-down-button"
					onClick={(e) => toBottom(e)}
					onKeyDown={console.log}
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
