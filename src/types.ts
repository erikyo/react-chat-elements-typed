import type {
	ClipboardEventHandler,
	CSSProperties,
	DragEvent,
	FocusEventHandler,
	FormEventHandler,
	FunctionComponent,
	HTMLInputTypeAttribute,
	KeyboardEventHandler,
	MouseEvent,
	MouseEventHandler,
	MutableRefObject,
	ReactElement,
	ReactEventHandler,
	ReactNode,
	Ref,
	RefObject,
	SetStateAction,
	SyntheticEvent,
	UIEvent,
} from "react";

type StatusType = "waiting" | "sent" | "received" | "read";
/**
 * IChatItemProps Interface
 *
 * @prop id The Chat Item's id.
 * @prop avatar The Chat Item's avatar.
 * @prop unread The Chat Item's message unread.
 * @prop className The Chat Item's component className.
 * @prop avatarFlexible The Chat Item's avatar avatarFlexible.
 * @prop alt The Chat Item's avatar alt.
 * @prop title The Chat Item's title.
 * @prop subtitle The Chat Item's subtitle.
 * @prop date The Chat Item's message date.
 * @prop dateString The Chat Item's message dateString.
 * @prop statusColor The Chat Item's statusColor.
 * @prop statusText The Chat Item's statusText.
 * @prop lazyLoadingImage The Chat Item's lazyLoadingImage.
 * @prop muted The Chat Item's muted.
 * @prop showMute The Chat Item's showMute icon.
 * @prop showVideoCall The Chat Item's showVideoCall icon.
 * @prop onAvatarError The Chat Item's avatar function onAvatarError(event: MouseEvent<T, MouseEvent>).
 * @prop onContextMenu The Chat Item's function onContextMenu(event: MouseEvent<T, MouseEvent>).
 * @prop onClick The Chat Item's function onClick(event: MouseEvent<T, MouseEvent>).
 * @prop onClickMute The Chat Item's mute icon function onClickMute(event: MouseEvent<T, MouseEvent>).
 * @prop onClickVideoCall The Chat Item's videoCall icon function onClickVideoCall(event: MouseEvent<T, MouseEvent>).
 * @prop onDragOver The Chat Item's drag over function.
 * @prop onDragEnter The Chat Item's drag enter function.
 * @prop onDrop The Chat Item's drop function.
 * @prop onDragLeave The Chat Item's drop leave function.
 * @prop onDragComponent The Chat Item's drag component.
 * @prop letterItem The Chat Item's avatar letterItem.
 * @prop subList The Chat Item's sub chat items.
 * @prop onExpandItem The Chat Item's expand function onExpandItem(id: string).
 * @prop expanded The Chat Item's expanded.
 */
export interface IChatItemProps {
	id: string;
	avatar: string;
	unread?: number;
	className?: string;
	avatarFlexible?: boolean;
	avatarSize?: "xsmall" | "small" | "medium" | "large" | "xlarge";
	alt?: string;
	title?: string;
	subtitle?: string;
	date?: Date;
	dateString?: string;
	statusColor?: string;
	statusColorType?: string;
	statusText?: string;
	lazyLoadingImage?: string;
	muted?: boolean;
	showMute?: boolean;
	showVideoCall?: boolean;
	onAvatarError?: MouseEventHandler;
	onContextMenu?: MouseEventHandler;
	onClick?: (e: MouseEvent) => void;
	onClickMute?: MouseEventHandler;
	onClickVideoCall?: MouseEventHandler;
	setDragStates?: (state: SetStateAction<boolean>) => void;
	onDragComponent?: ReactNode;
	onDragLeave?: (e: MouseEvent, id: string) => void;
	onDrop?: (e: DragEvent, i: string) => void;
	onDragEnter?: (e: MouseEvent, i: string) => void;
	onDragOver?: (e: MouseEvent, i: string) => void;
	letterItem?: ILetterItem;
	customStatusComponents?: ReactNode[];
	subList?: IChatItemProps[];
	onExpandItem?: (e: MouseEvent | KeyboardEvent, i: string) => void;
	expanded?: boolean;
}

/**
 * ILetterItem Interface
 *
 * @prop id The LetterItem's id.
 * @prop letter The Letter Item's letter is a component.
 */
export interface ILetterItem {
	id: string;
	letter?: ReactElement;
}

/**
 * IChatListProps Interface
 *
 * @prop id The ChatList's id.
 * @prop className The Chat List's component className.
 * @prop lazyLoadingImage The Chat List's lazyLoadingImage.
 * @prop cmpRef The Chat List's cmpRef.
 * @prop onAvatarError The Chat Item's function onAvatarError(item: IChatItemProps, index: number, event: MouseEvent<HTMLElement, MouseEvent>).
 * @prop onContextMenu The Chat Item's function onContextMenu(item: IChatItemProps, index: number, event: MouseEvent<HTMLElement, MouseEvent>).
 * @prop onClick The Chat Item's function onClick(item: IChatItemProps, index: number, event: MouseEvent<HTMLElement, MouseEvent>).
 * @prop onClickMute The Chat Item's function onClickMute(item: IChatItemProps, index: number, event: MouseEvent<HTMLElement, MouseEvent>).
 * @prop onClickVideoCall The Chat Item's function onClickVideoCall(item: IChatItemProps, index: number, event: MouseEvent<HTMLElement, MouseEvent>).
 * @prop onDragOver The Chat Item's drag over function.
 * @prop onDragEnter The Chat Item's drag enter function.
 * @prop onDrop The Chat Item's drop function.
 * @prop onDragLeave The Chat Item's drop leave function.
 * @prop onDragComponent The Chat Item's drag component.
 * @prop onExpand The Chat Items expand function.
 */
export interface IChatListProps {
	id: string;
	className?: string;
	lazyLoadingImage?: string;
	dataSource: IChatItemProps[];
	cmpRef?: Ref<HTMLButtonElement>;
	onAvatarError?: ChatListEvent;
	onContextMenu?: ChatListEvent;
	onClick?: ChatListEvent;
	onClickMute?: ChatListEvent;
	onClickVideoCall?: ChatListEvent;
	onDragComponent?: ReactNode;
	onDragLeave?: (e: MouseEvent, id: string) => void;
	onDrop?: ((e: MouseEvent, i: string) => void) | undefined;
	onDragEnter?: ((e: MouseEvent, i: string) => void) | undefined;
	onDragOver?: ((e: MouseEvent, i: string) => void) | undefined;
	onExpand?: ChatListElement;
}

/**
 * ChatListEvent Type
 *
 * @param item The ChatListEvent's item is a IChatItemProps.
 * @param index The Chat List's index.
 * @param event The Chat List's event.
 */
export type ChatListEvent = (
	item: IChatItemProps,
	index: number,
	event: MouseEvent,
) => unknown;

export type ChatItemEvent = (e: MouseEvent, i: string) => void;
export type ChatItemDragEvent = (e: DragEvent, i: string) => void;

/**
 * ChatListEvent Type
 *
 * @param item The ChatListEvent's item is a IChatItemProps.
 * @param index The Chat List's index.
 * @param event The Chat List's event.
 */
export type ChatListElement = (
	item: IChatItemProps,
	index: number,
	event: MouseEvent | KeyboardEvent | SyntheticEvent,
) => void;

/**
 * IMessage Interface
 *
 * @prop id The Message's id.
 * @prop position The Message's position.
 * @prop text The Message's text.
 * @prop title The Message's title.
 * @prop focus The Message's focus.
 * @prop date The Message's date.
 * @prop dateString The Message's dateString.
 * @prop avatar The Message's avatar image.
 * @prop titleColor The Message's titleColor.
 * @prop forwarded The Message's forwarded.
 * @prop replyButton The Message's replyButton icon.
 * @prop removeButton The Message's removeButton icon.
 * @prop status The Message's status icon.
 * @prop statusTitle The Message's title for the status (the item that holds the status, date and time)
 * @prop notch The Message's notch.
 * @prop copiableDate The Message's copiableDate.
 * @prop retracted The Message's retracted.
 * @prop className The Message's className.
 * @prop letterItem The Message's letterItem is a ILetterItem.
 * @prop reply The Message's reply.
 */
export interface IMessage {
	id?: string;
	position?: string;
	text: string;
	title?: string;
	focus?: boolean;
	date: number | string | Date;
	dateString?: string;
	avatar?: string;
	titleColor?: string;
	forwarded?: boolean;
	replyButton?: boolean;
	removeButton?: boolean;
	status?: StatusType;
	statusTitle?: string;
	notch?: boolean;
	copiableDate?: boolean;
	retracted?: boolean;
	className?: string;
	letterItem?: ILetterItem;
	reply?: IReplyMessage;
	type: string;
	forwardedMessageText?: string;
	actionButtons?: MeetingLinkActionButtons[] | undefined;
}

/**
 * IPhotoMessage Interface
 *
 * @prop type The Photo Message's type is "photo".
 * @prop width The Photo Message's width.
 * @prop height The Photo Message's height.
 * @prop uri The Photo Message's uri.
 * @prop alt The Photo Message's alt.
 */
export interface IPhotoMessage extends IMessage {
	data?: {
		status: IMessageDataStatus;
		uri: string;
		width?: number;
		height?: number;
		name?: string;
		extension?: string;
		size?: number;
		id?: string;
		alt?: string;
	};
}

/**
 * IPhotoMessageProps Interface
 *
 * @prop type The Photo Message's type is "photo".
 * @prop message The Photo Message's message is a IPhotoMessage.
 * @prop onDownload The Photo Message's function onDownload(event: MouseEvent<T, MouseEvent>).
 * @prop onOpen The Photo Message's function onOpen(event: MouseEvent<T, MouseEvent>).
 * @prop onLoad The Photo Message's function onLoad(event: MouseEvent<T, MouseEvent>).
 * @prop onError The Photo Message's function onError(event: MouseEvent<T, MouseEvent>).
 */
export interface IPhotoMessageProps extends IPhotoMessage {
	onDownload?: MouseEventHandler;
	onOpen?: MouseEventHandler;
	onLoad?: ReactEventHandler;
	onPhotoError?: ReactEventHandler;
}

/**
 * IReplyMessage Interface extends IMessage
 *
 * @prop type The Reply Message's type is "reply".
 * @prop photoURL The Reply Message's photoURL.
 * @prop message The Reply Message's message.
 */
export interface IReplyMessage {
	text?: string;
	photoURL?: string;
	title?: string;
	titleColor?: string;
}

/**
 * IReplyMessageProps Interface
 *
 * @prop type The Reply Message's type is "reply".
 * @prop message The Reply Message's message is a IReplyMessage.
 * @prop onClick The Reply Message's function onClick(event: MouseEvent<T, MouseEvent>).
 */
export interface IReplyMessageProps extends IReplyMessage {
	onClick?: MouseEventHandler;
}

/**
 * IMeetingMessage Interface extens IMessage
 *
 * @prop type The Meeting Message's type is "meeting".
 * @prop message The Meeting Message's message.
 * @prop avatarFlexible The Meeting Message's avatarFlexible.
 * @prop event The Meeting Message's event.
 * @prop record The Meeting Message's record.
 */
export interface IMeetingMessage extends IMessage {
	message?: string;
	avatarFlexible?: boolean;
	event?: {
		title?: string;
		avatars?: IAvatarProps[];
		avatarsLimit?: number;
	};
	record?: {
		avatar: string;
		title?: string;
		savedBy?: string;
		time?: string;
	};
}

/**
 * IMeetingMessageProps Interface
 *
 * @prop type The Meeting Message's type is "meeting".
 * @prop subject The Meeting Message's subject.
 * @prop title The Meeting Message's title.
 * @prop date The Meeting Message's date.
 * @prop dateString The Meeting Message's dateString.
 * @prop collapseTitle The Meeting Message's collapseTitle.
 * @prop participants The Meeting Message's participants.
 * @prop message The Meeting Message's message is a IMeetingMessage.
 * @prop dataSource The Meeting Message's dataSource is a IMeetingMessage array.
 * @prop participantsLimit The Meeting Message's participantsLimit.
 * @prop onclick The Meeting Message's function onclick(event: MouseEvent<T, MouseEvent>).
 * @prop onMeetingTitleClick The Meeting Message's function onMeetingTitleClick(item: IMeetingMessage, index: number, event: MouseEvent<HTMLElement, MouseEvent>).
 * @prop onMeetingVideoLinkClick The Meeting Message's function onMeetingVideoLinkClick(item: IMeetingMessage, index: number, event: MouseEvent<HTMLElement, MouseEvent>).
 * @prop onMeetingMoreSelect The Meeting Message's function onMeetingMoreSelect  and optional.
 */
export interface IMeetingMessageProps extends IMeetingMessage {
	subject?: string;
	dateString?: string;
	collapseTitle?: string;
	participants?: Array<{
		id?: number | string;
		title?: string;
	}>;
	moreItems?: IDropdownItemType[];
	dataSource?: IMeetingMessage[];
	participantsLimit?: number;
	onClick?: MouseEventHandler;
	onMeetingTitleClick?: MeetingMessageEvent;
	onMeetingVideoLinkClick?: MeetingMessageEvent;
	onMeetingMoreSelect?: (event: MouseEvent) => void;
}

/**
 * IVideoMessage Interface
 *
 * @prop type The Video Message's type is "video".
 * @prop videoURL The Video Message's videoURL.
 * @prop uri The Video Message's uri.
 * @prop width The Video Message's width.
 * @prop height The Video Message's height.
 * @prop alt The Video Message's alt.
 */
export interface IVideoMessage extends IMessage {
	controlsList: string;
	data: {
		videoURL?: string;
		thumbnailURL?: string;
		videoCaptionsURL?: string;
		width?: number;
		height?: number;
		name?: string;
		extension?: string;
		size?: string;
		alt?: string;
		id?: string;
		uri?: string;
		status?: IMessageDataStatus;
	};
}

/**
 * IVideoMessageProps Interface
 *
 * @prop type The Video Message's type is "video".
 * @prop message The Video Message's message is a IVideoMessage.
 * @prop onDownload The Video Message's function onDownload(event: MouseEvent<T, MouseEvent>).
 * @prop onOpen The Video Message's function onOpen(event: MouseEvent<T, MouseEvent>).
 * @prop onLoad The Video Message's function onLoad(event: MouseEvent<T, MouseEvent>).
 * @prop onPhotoError The Video Message's function onPhotoError(event: SyntheticEvent<T, Event>).
 */
export interface IVideoMessageProps extends IVideoMessage {
	onDownload?: MouseEventHandler;
	onOpen?: MouseEventHandler;
	onLoad?: ReactEventHandler;
	onPhotoError?: ReactEventHandler;
}

/**
 * ISystemMessage Interface extends IMessage
 *
 * @prop type The System Message's type is "system".
 * @prop text The System Message's text.
 */
export interface ISystemMessage extends IMessage {
	text: string;
}

/**
 * ISystemMessageProps Interface
 *
 * @prop type The System Message's type is "system".
 * @prop message The System Message's message is ISystemMessage.
 * @prop className The System Message's className.
 */
export interface ISystemMessageProps extends ISystemMessage {
	className?: string;
}

/**
 * IAudioMessage Interface extends IMessage
 *
 * @prop type The Audio Message's type is "audio".
 * @prop audioURL The Audio Message's audio url.
 * @prop audioType The Audio Message's audio type.
 * @prop controlsList The Audio Message's controls list.
 */
export interface IAudioMessage extends IMessage {
	data: {
		audioURL?: string;
		extension?: string;
		name?: string;
		size?: string;
		duration?: number;
		id?: string;
		audioType?: "audio/mp3" | string;
		controlsList?: string;
	};
}

/**
 * IAudioMessageProps Interface
 *
 * @prop type The Audio Message's type is "audio".
 * @prop message The Audio Message's message is a IAudioMessage.
 * @prop audioProps The Audio Message's audioProps.
 * @prop customStyle The Audio Message's customStyle.
 * @prop onOpen The Audio Message's function onOpen(event: MouseEvent<T, MouseEvent>).
 * @prop onDownload The Audio Message's function onDownload(event: MouseEvent<T, MouseEvent>).
 * @prop onLoad The Audio Message's function onLoad(event: SyntheticEvent<T, Event>).
 */
export interface IAudioMessageProps extends IAudioMessage {
	audioProps?: {
		[key: string]: unknown;
	};
	customStyle?: CSSProperties;
	onOpen?: MouseEventHandler;
	onDownload?: MouseEventHandler;
	onLoad?: ReactEventHandler;
}

/**
 * IFileMessage Interface
 *
 * @prop type The File Message's type is "file".
 * @prop size The File Message's size.
 */
export interface IFileMessage extends IMessage {
	data: {
		name?: string;
		extension?: string;
		size?: string;
		id?: string;
		uri?: string;
		status?: IMessageDataStatus;
	};
}

/**
 * IFileMessageProps Interface
 *
 * @prop type The File Message's type is "file".
 * @prop message The File Message's message is a IFileMessage.
 * @prop text The File Message's text.
 * @prop onDownload The File Message's function onDownload.
 * @prop onOpen The File Message's function onOpen(event: MouseEvent<Element, MouseEvent>).
 */
export interface IFileMessageProps extends IFileMessage {
	onDownload?: MouseEventHandler;
	onOpen?: MouseEventHandler;
}

/**
 * ILocationMessage Interface
 *
 * @prop type The Location Message's type is "location".
 * @prop latitude The Location Message's latitude.
 * @prop longitude The Location Message's longitude.
 * @prop staticURL The Location Message's static url.
 * @prop mapURL The Location Message's map url.
 */
export interface ILocationMessage extends IMessage {
	latitude: string;
	longitude: string;
	mapURL?: string;
	zoom?: string;
}

/**
 * ILocationMessageProps Interface
 *
 * @prop type The Location Message's type is "location".
 * @prop message The Location Message's message is a ILocationMessage.
 * @prop marker The Location Message's marker.
 * @prop zoom The Location Message's zoom.
 * @prop className The Location Message's className.
 * @prop text The Location Message's text.
 * @prop src The Location Message's source.
 * @prop target The Location Message's target.
 * @prop href The Location Message's href.
 * @prop onOpen The Location Message's function onOpen(event: MouseEvent<T, MouseEvent>).
 * @prop onError The Location Message's function onError(event: SyntheticEvent<T, Event>).
 */
export interface ILocationMessageProps extends ILocationMessage {
	markerColor?: string;
	className?: string;
	src?: string;
	target?: string;
	href?: string;
	alt?: string;
	onOpen?: MouseEventHandler;
	onError?: ReactEventHandler;
}

/**
 * IMessageBoxProps Interface
 *
 * @prop data The Message Box'es data is a MessageType.
 * @prop onMessageFocused The Message Box'es onMessageFocused.
 * @prop renderAddCmp The Message Box'es renderAddCmp is a component.
 * @prop onClick The Message Box'es function onClick(event: MouseEvent<T, MouseEvent>).
 * @prop onOpen The Message Box'es function onOpen(event: MouseEvent<T, MouseEvent>).
 * @prop onPhotoError The Message Box'es function onPhotoError(event: MouseEvent<T, MouseEvent>).
 * @prop onContextMenu The Message Box'es function onContextMenu(event: MouseEvent<T, MouseEvent>).
 * @prop onForwardClick The Message Box'es function onForwardClick(event: MouseEvent<T, MouseEvent>).
 * @prop onReplyClick The Message Box'es function onReplyClick(event: MouseEvent<T, MouseEvent>).
 * @prop onRemoveMessageClick The Message Box'es function onRemoveMessageClick(event: MouseEvent<T, MouseEvent>).
 * @prop onTitleClick The Message Box'es function onTitleClick(event: MouseEvent<T, MouseEvent>).
 * @prop onMeetingMessageClick The Message Box'es function onMeetingMessageClick(event: MouseEvent<T, MouseEvent>).
 * @prop onDownload The Message Box'es function onDownload(event: MouseEvent<T, MouseEvent>).
 * @prop onMeetingMoreSelect The Message Box'es function onMeetingMoreSelect(event: MouseEvent<T, MouseEvent>).
 * @prop onMeetingLinkClick The Message Box'es function onMeetingLinkClick(event: MouseEvent<T, MouseEvent>).
 * @prop onMeetingTitleClick The Message Box'es function onMeetingTitleClick(event: MouseEvent<T, MouseEvent>).
 * @prop onMeetingVideoLinkClick The Message Box'es function onMeetingVideoLinkClick(event: MouseEvent<T, MouseEvent>).
 */
export interface IMessageBoxProps {
	onMessageFocused?: (arg: boolean) => void;
	renderAddCmp?: JSX.Element | (() => JSX.Element);
	onClick?: MouseEventHandler;
	onOpen?: MouseEventHandler;
	onPhotoError?: MouseEventHandler;
	onContextMenu?: MouseEventHandler;
	onForwardClick?: MouseEventHandler;
	onReplyClick?: MouseEventHandler;
	onRemoveMessageClick?: MouseEventHandler;
	onTitleClick?: MouseEventHandler;
	onReplyMessageClick?: MouseEventHandler;
	onMeetingMessageClick?: MouseEventHandler;
	onDownload?: MouseEventHandler;
	onMeetingMoreSelect?: MouseEventHandler;
	onMeetingLinkClick?: MouseEventHandler;
	onMeetingTitleClick?: MeetingMessageEvent;
	onMeetingVideoLinkClick?: MouseEventHandler;
	style?: CSSProperties;
	notchStyle?: CSSProperties;
}

/**
 * IMessageListProps Interface
 *
 * @prop className The Message List's className.
 * @prop customProps The Message List's customProps.
 * @prop children The Message List's children.
 * @prop reference The Message List's reference is a ref.
 * @prop data The Message List's datasource is IMessageBoxProps.
 * @prop lockable The Message List's lockable.
 * @prop toBottomHeight The Message List's to bottom height.
 * @prop downButtonBadge The Message List's down button badge.
 * @prop sendMessagePreview The Message List's send message preview.
 * @prop onScroll The Message List's function onScroll(event: UIEvent<T, UIEvent>).
 * @prop onContextMenu The Message List's function onContextMenu(item: IMessageBoxProps, index: number, event: MouseEvent<HTMLElement, MouseEvent>).
 * @prop onDownButtonClick The Message List's onDownButtonClick is a ref.
 * @prop onOpen The Message List's function onOpen(item: IMessageBoxProps, index: number, event: MouseEvent<HTMLElement, MouseEvent>).
 * @prop onDownload The Message List's function onDownload(item: IMessageBoxProps, index: number, event: MouseEvent<HTMLElement, MouseEvent>).
 * @prop onPhotoError The Message List's function onPhotoError(item: IMessageBoxProps, index: number, event: MouseEvent<HTMLElement, MouseEvent>).
 * @prop onMeetingMoreSelect The Message List's function onMeetingMoreSelect(item: IMessageBoxProps, index: number, event: MouseEvent<HTMLElement, MouseEvent>).
 * @prop onMessageFocused The Message List's function onMessageFocused(item: IMessageBoxProps, index: number, event: MouseEvent<HTMLElement, MouseEvent>).
 * @prop onClick The Message List's function onClick(item: IMessageBoxProps, index: number, event: MouseEvent<HTMLElement, MouseEvent>).
 * @prop onForwardClick The Message List's function onForwardClick(item: IMessageBoxProps, index: number, event: MouseEvent<HTMLElement, MouseEvent>).
 * @prop onReplyClick The Message List's function onReplyClick(item: IMessageBoxProps, index: number, event: MouseEvent<HTMLElement, MouseEvent>).
 * @prop onReplyMessageClick The Message List's function onReplyMessageClick(item: IMessageBoxProps, index: number, event: MouseEvent<HTMLElement, MouseEvent>).
 * @prop onTitleClick The Message List's function onTitleClick(item: IMessageBoxProps, index: number, event: MouseEvent<HTMLElement, MouseEvent>).
 * @prop onRemoveMessageClick The Message List's function onRemoveMessageClick(item: IMessageBoxProps, index: number, event: MouseEvent<HTMLElement, MouseEvent>).
 * @prop onMeetingMessageClick The Message List's function onMeetingMessageClick(item: IMessageBoxProps, index: number, event: MouseEvent<HTMLElement, MouseEvent>).
 * @prop onMeetingTitleClick The MessageList's function onMeetingTitleClick(event: MouseEvent<T, MouseEvent>).
 * @prop onMeetingVideoLinkClick The MessageList's function onMeetingVideoLinkClick(event: MouseEvent<T, MouseEvent>).
 * @prop onMeetingLinkClick The Message List's function onMeetingLinkClick(item: IMessageBoxProps, index: number, event: MouseEvent<HTMLElement, MouseEvent>).
 */
export interface IMessageListProps {
	className?: string;
	customProps?: {
		[key: string]: unknown;
	};
	children?: ReactNode;
	isShowChild?: boolean;
	reference: { current: HTMLDivElement | null };
	dataSource: MessageType[];
	actionButtons?: MeetingLinkActionButtons[];
	lockable: boolean;
	toBottomHeight?: string | number;
	downButton?: boolean;
	downButtonBadge?: number;
	sendMessagePreview?: boolean;
	onScroll?: (e: UIEvent) => void;
	onContextMenu?: MessageListEvent;
	onDownButtonClick?: (e: MouseEvent) => void;
	onOpen?: MeetingMessageEvent;
	onDownload?: MessageListEvent;
	onPhotoError?: MessageListEvent;
	onMeetingMoreSelect?: MessageListEvent;
	onMessageFocused?: MessageFocusEvent;
	onClick?: MessageListEvent;
	onForwardClick?: MessageListEvent;
	onReplyClick?: MessageListEvent;
	onReplyMessageClick?: MessageListEvent;
	onTitleClick?: MessageListEvent;
	onRemoveMessageClick?: MessageListEvent;
	onMeetingMessageClick?: MessageListEvent;
	onMeetingTitleClick?: MeetingMessageEvent;
	onMeetingVideoLinkClick?: MouseEventHandler & MeetingMessageEvent;
	onMeetingLinkClick?: MessageListEvent;
	messageBoxStyles?: CSSProperties;
	notchStyle?: CSSProperties;
}

/**
 * MessageListEvent Type
 *
 * @param item The MessageListEvent's item is a IMessageBoxProps.
 * @param index The MessageListEvent's index.
 * @param event The MessageListEvent's event.
 */
export type MessageListEvent = (
	item: MessageType,
	index: number,
	event: MouseEvent,
) => void;

/**
 * Message focus event
 *
 * @param item The MessageFocusEvent's item is a IMessageBoxProps.
 * @param index The MessageFocusEvent's index.
 * @param isFocused The MessageFocusEvent's isFocused.
 */
export type MessageFocusEvent = (
	item: MessageType,
	index: number,
	isFocused: boolean,
) => void;

/**
 * IProgressOptions Interface
 *
 * @prop state The Progress Options state is an object.
 */
export interface IProgressOptions {
	state?: {
		color?: string;
		width?: string;
	};
}

/**
 * IMeetingLinkMessage Interface extends IMessage
 *
 * @prop meetingID The Meeting Link Message's meeting id.
 * @prop title The Meeting Link Message's title.
 */
export interface IMeetingLinkMessage extends IMessage {
	meetingID?: string;
}

/**
 * TActionButton Type
 *
 * @param props The TActionButton's props.
 */
export type TActionButton = FunctionComponent<unknown>;

/**
 * TMeetingLinkActionButtons Interface
 *
 * @prop onClickButton The TMeetingLinkActionButtons's function onClickButton(id: string).
 * @prop Component The TMeetingLinkActionButtons's function Component.
 */
export interface MeetingLinkActionButtons {
	// return meeting id
	onClickButton: (id: string) => void;
	Component: TActionButton;
}

/**
 * IMeetingLinkMessageProps Interface
 *
 * @prop type The Meeting Link Message's type is "meetingLink".
 * @prop message The Meeting Link Message's message is a IMeetingLinkMessage.
 * @prop onMeetingLinkClick The Meeting Link Message's function onMeetingLinkClick(event: MouseEvent<T, MouseEvent>).
 * @prop onMeetingMoreSelect The Meeting More Select Message's function onMeetingMoreSelect(event: MouseEvent<T, MouseEvent>).
 */
export interface IMeetingLinkMessageProps extends IMeetingLinkMessage {
	actionButtons?: MeetingLinkActionButtons[];
}

/**
 * MeetingMessageEvent Type
 *
 * @param item The MessageListEvent's item is a IMeetingMessage.
 * @param index The MessageListEvent's index.
 * @param event The MessageListEvent's event.
 */
export type MeetingMessageEvent = (
	item: IMeetingMessage,
	index: number,
	event: MouseEvent,
) => unknown;

/**
 * ITextMessage Interface extends IMessage
 *
 * @prop type The Text Message's type is "text".
 */
export interface ITextMessage extends IMessage {}

/**
 * ITextMessageProps Interface
 *
 * @prop type The Text Message's type is "text".
 * @prop message The Text Message's message is a ITextMessage.
 */
export interface ITextMessageProps extends ITextMessage {}

/**
 * Message List Props
 *
 * @param cmpRef The Message List's cmpRef.
 * @param className The Message List's className.
 * @param dataSource The Message List's dataSource.
 * @param lazyLoadingImage The Message List's lazyLoadingImage.
 * @param onClick The Message List's onClick.
 * @param onMeetingClick The Message List's onMeetingClick.
 * @param onShareClick The Message List's onShareClick.
 * @param onCloseClick The Message List's onCloseClick.
 * @param onContextMenu The Message List's onContextMenu.
 * @param onAvatarError The Message List's onAvatarError.
 */
export interface IMeetingListProps {
	cmpRef?: string;
	className?: string;
	dataSource?: IMeetingItemProps[];
	lazyLoadingImage?: string;
	onClick?: MeetingListEvent;
	onMeetingClick?: MeetingListEvent;
	onShareClick?: MeetingListEvent;
	onCloseClick?: MeetingListEvent;
	onContextMenu?: MeetingListEvent;
	onAvatarError?: MeetingListEvent;
}

/**
 * MeetingListEvent Type
 *
 * @param item The MessageListEvent's item is a IMeetingItemProps.
 * @param index The MessageListEvent's index.
 * @param event The MessageListEvent's event.
 */
export type MeetingListEvent = (
	item: IMeetingItemProps,
	index: number,
	event: MouseEvent,
) => void;

/**
 * IMeetingItemProps Interface
 *
 * @prop id The Meeting Item's id.
 * @prop closable The Meeting Item's closable.
 * @prop date The Meeting Item's date.
 * @prop subject The Meeting Item's subject.
 * @prop subjectLimit The Meeting Item's subject limit.
 * @prop avatarFlexible The Meeting Item's avatar flexible.
 * @prop alt The Meeting Item's alt.
 * @prop title The Meeting Item's title.
 * @prop subtitle The Meeting Item's subtitle.
 * @prop statusColorType The Meeting Item's status color type.
 * @prop dateString The Meeting Item's date string.
 * @prop lazyLoadingImage The Meeting Item's lazyLoadingImage.
 * @prop avatarLimit The Meeting Item's avatar limit.
 * @prop avatars The Meeting Item's avatar array.
 * @prop audioMuted The Meeting Item's audio muted.
 * @prop audioSource The Meeting Item's audio source.
 * @prop onClick The Meeting Item's function onClick(event: MouseEvent<T, MouseEvent>).
 * @prop onAvatarError The Meeting Item's function onAvatarError(event: MouseEvent<T, MouseEvent>).
 * @prop onMeetingClick The Meeting Item's function onMeetingClick(event: MouseEvent<T, MouseEvent>).
 * @prop onShareClick The Meeting Item's function onShareClick(event: MouseEvent<T, MouseEvent>).
 * @prop onContextMenu The Meeting Item's function onContextMenu(event: MouseEvent<T, MouseEvent>).
 * @prop onCloseClick The Meeting Item's function onCloseClick(event: MouseEvent<T, MouseEvent>).
 */
export interface IMeetingItemProps {
	id: string;
	closable?: boolean;
	date?: Date;
	subject?: string;
	subjectLimit?: number;
	avatarFlexible?: boolean;
	alt?: string;
	title?: string;
	subtitle?: string;
	statusColorType?: string;
	className?: string;
	dateString?: string;
	lazyLoadingImage?: string;
	avatarLimit?: number;
	avatars?: IAvatarProps[];
	audioMuted?: boolean;
	audioSource?: string;
	onClick?: MouseEventHandler;
	onAvatarError?: MouseEventHandler;
	onMeetingClick?: MouseEventHandler;
	onShareClick?: MouseEventHandler;
	onContextMenu?: MouseEventHandler;
	onCloseClick?: MouseEventHandler;
}

/**
 * IInputProps Interface
 *
 * @prop autofocus The Input's autofocus.
 * @prop reference The Input's reference is a ref.
 * @prop clear The Input's clear.
 * @prop maxlength The Input's maxlength.
 * @prop maxHeight The Input's maxheight.
 * @prop onMaxLengthExceed The Input's onMaxLengthExceed function.
 * @prop onChange The Input's onChange function.
 * @prop multiline The Input's multiline.
 * @prop autoHeight The Input's autoHeight.
 * @prop minHeight The Input's minheight.
 * @prop className The Input's classname.
 * @prop leftButtons The Input's leftbuttons is a component.
 * @prop rightButtons The Input's rightbuttons is a component.
 * @prop type The Input's type.
 * @prop placeholder The Input's placeholder.
 * @prop defaultValue The Input's default value.
 * @prop inputStyle The Input's input style.
 * @prop onCopy The Input's function onCopy(event: ClipboardEvent<T>).
 * @prop onCut The Input's function onCut(event: ClipboardEvent<T>).
 * @prop onPaste The Input's function onPaste(event: ClipboardEvent<T>).
 * @prop onBlur The Input's function onBlur(event: FocusEvent<T, Element>).
 * @prop onFocus The Input's function onFocus(event: FocusEvent<T, Element>).
 * @prop onSelect The Input's function onSelect(event: SyntheticEvent<T, Event>).
 * @prop onSubmit The Input's function onSubmit(event: FormEvent<T>).
 * @prop onReset The Input's function onReset(event: FormEvent<T>).
 * @prop onKeyDown The Input's function onKeyDown(event: KeyboardEvent<T>).
 * @prop onKeyUp The Input's function onKeyUp(event: KeyboardEvent<T>).
 */
export interface IInputProps {
	autofocus?: boolean;
	className?: string;
	style?: CSSProperties;
	reference?: MutableRefObject<
		HTMLInputElement | HTMLTextAreaElement | undefined
	>;
	clearButton?: boolean;
	maxlength?: number;
	maxHeight?: number;
	onMaxLengthExceed?: () => void;
	onChange?: (ev: SyntheticEvent<HTMLInputElement, Event>) => void;
	multiline?: boolean;
	autoHeight?: boolean;
	minHeight?: number;
	leftButtons?: ReactNode;
	rightButtons?: ReactNode;
	type?: HTMLInputTypeAttribute;
	placeholder?: string;
	defaultValue?: string;
	inputStyle?: CSSProperties;
	value?: string;
	clear?: () => void;
	setValue?: (value: string) => void;
	onCopy?: ClipboardEventHandler;
	onCut?: ClipboardEventHandler;
	onPaste?: ClipboardEventHandler;
	onBlur?: FocusEventHandler;
	onFocus?: FocusEventHandler;
	onSelect?: ReactEventHandler;
	onSubmit?: FormEventHandler;
	onReset?: FormEventHandler;
	onKeyDown?: KeyboardEventHandler;
	onKeyUp?: KeyboardEventHandler;
}

/**
 * IMessageDataStatus Interface
 *
 * @prop error The File Message Data Status's error.
 * @prop download The File Message Data Status's download function.
 * @prop click The File Message Data Status's click function.
 * @prop loading The File Message Data Status's loading.
 */
export interface IMessageDataStatus {
	autoDownload?: boolean;
	error?: boolean;
	download?: MouseEventHandler;
	click?: MouseEventHandler;
	loading: boolean;
}

/**
 * IDropdownProps Interface
 *
 * @prop className The Dropdowns className.
 * @prop buttonProps The Dropdowns button props.
 * @prop animationType The Dropdowns animation type.
 * @prop animationPosition The Dropdowns animation position.
 * @prop title The Dropdowns title.
 * @prop items The Dropdowns items is a IDropdownItemType array.
 * @prop onSelect The Dropdowns onSelect function.
 * @prop style The Dropdowns style is an object containing color, borderColor.
 */
export interface IDropdownProps {
	className?: string;
	buttonProps?: IButtonProps;
	animationType?: string;
	animationPosition?: string;
	title?: string;
	items: IDropdownItemType[];
	onSelect?: (e: MouseEvent, i: number) => void;
	style?: CSSProperties;
}

/**
 * ICircleProps Interface
 *
 * @prop animate The Loader's animation.
 * @prop progressOptions The Loader's progress options.
 * @prop className The Loader's className.
 */
export interface ICircleProps {
	type?: "circle" | "progress";
	animate?: boolean;
	size?: number;
	style?: CSSProperties;
	className?: string;
	progressOptions?: {
		strokeWidth?: number;
		color?: string;
		trailColor?: string;
		strokeLinecap?: string;
	};
	progress?: number;
}

/**
 * IButtonProps Interface
 *
 * @prop title The Button's title.
 * @prop text The Button's text.
 * @prop buttonRef The Button's ref.
 * @prop type The Button's type.
 * @prop className The Button's className.
 * @prop backgroundColor The Button's background color.
 * @prop color The Button's color.
 * @prop disabled The Button's disabled.
 * @prop onClick The Button's onClick function.
 * @prop icon The Button's icon is a IIcon.
 */
export interface IButtonProps {
	title?: string;
	text?: string;
	buttonRef?: RefObject<HTMLButtonElement>;
	type?: "button" | "submit" | "reset";
	borderWidth?: number;
	className?: string;
	style?: CSSProperties;
	backgroundColor?: string;
	color?: string;
	outlined?: boolean;
	circle?: boolean;
	disabled?: boolean;
	link?: boolean;
	onClick?: MouseEventHandler;
	icon?: IIcon;
}

/**
 * IIcon Interface
 *
 * @prop float The Button Icon's float.
 * @prop size The Button Icon's size.
 * @prop component The Button Icon's components.
 */
export interface IIcon {
	float?: CSSProperties["float"];
	color?: CSSProperties["color"];
	size?: number;
	component?: ReactElement;
}

/**
 * IDropDownItemType Type
 *
 * @type string The Dropdown's items is a IDropdownItemType array.
 */
export type IDropdownItemType = IDropdownItem | string;

/**
 * IDropdownItem Interface
 *
 * @prop icon The Dropdown Item's icon.
 * @prop text The Dropdown Item's text.
 */
export interface IDropdownItem {
	icon?: IDropdownItemIcon;
	text?: string;
}

/**
 * IDropdownItemIcon Interface
 *
 * @prop float The Dropdown Item Icon's float.
 * @prop color The Dropdown Item Icon's color.
 * @prop size The Dropdown Item Icon's size.
 * @prop className The Dropdown Item Icon's className.
 * @prop component The Dropdown Item Icon's component.
 */
export interface IDropdownItemIcon {
	float?: "left" | "right" | "none" | "inherit" | "initial" | "unset";
	color?: string;
	size?: number;
	className?: string;
	component?: ReactElement;
}

/**
 * ISideBarProps Interface
 *
 * @type type The Side Bar's type.
 * @type data The Side Bar's data is ISideBar.
 */
export interface ISideBarProps extends ISideBar {
	type?: string;
	className?: string;
	style?: CSSProperties;
}

/**
 * ISideBar Interface
 *
 * @prop top The Side Bar's top is a component.
 * @prop center The Side Bar's center is a component.
 * @prop bottom The Side Bar's bottom is a component.
 * @prop className The Side Bar's className.
 */
export interface ISideBar {
	top?: ReactElement;
	center?: ReactElement;
	bottom?: ReactElement;
}

/**
 * IPopup Interface
 *
 * @prop show The Popup's show.
 * @prop header The Popup's header.
 * @prop text The Popup's text.
 * @prop footerButtons The Popup's footer buttons array.
 * @prop headerButtons The Popup's header buttons array.
 * @prop renderHeader The Popup's renderHeader function.
 * @prop renderContent The Popup's renderContent function.
 * @prop renderFooter The Popup's renderFooter function.
 * @prop color The Popup's color.
 */
export interface IPopup {
	header?: string;
	text?: string;
	footerButtons?: IButtonProps[];
	headerButtons?: IButtonProps[];
	renderHeader?: () => ReactElement;
	renderContent?: () => ReactElement;
	renderFooter?: () => ReactElement;
	color?: string;
}

/**
 * IPopupProps Interface
 *
 * @prop popup The Popup's popup is a IPopup.
 * @prop type The Popup's type.
 * @prop className The Popup's className.
 */
export interface IPopupProps {
	popup: IPopup;
	type?: string;
	className?: string;
	show?: boolean;
}

/**
 * IAvatarProps Interface
 *
 * @prop src The Avatar's src is an image source.
 * @prop title The Avatar's title.
 * @prop lazyLoadingImage The Avatar's lazyLoadingImage.
 * @prop letterItem The Avatar's letterItem is a ILetterItem.
 * @prop type The Avatar's type.
 * @prop size The Avatar's size.
 * @prop rounded The Avatar's rounded.
 * @prop className The Avatar's className.
 * @prop alt The Avatar's alt.
 * @prop sideElement The Avatar's sideElement is a component.
 * @prop onError The Avatar's function onError(event: SyntheticEvent<T, Event>).
 * @prop statusColorType The Avatar's status color type.
 * @prop statusColor The Avatar's status color.
 * @prop statusText The Avatar's status text.
 */
export interface IAvatarProps {
	src: string;
	title?: string;
	lazyLoadingImage?: string;
	letterItem?: ILetterItem;
	type?: string;
	style?: CSSProperties;
	size?: "default" | "xsmall" | "small" | "medium" | "large" | "xlarge";
	rounded?: boolean;
	className?: string;
	alt?: string;
	sideElement?: JSX.Element | null;
	onError?: ReactEventHandler;
	statusColorType?: string;
	statusColor?: string;
	statusText?: string;
}

/**
 * INavbarProps Interface
 *
 * @prop type The Navbar's type.
 * @prop className The Navbar's className.
 * @prop top The Side Bar's top is a component.
 * @prop center The Side Bar's center is a component.
 * @prop bottom The Side Bar's bottom is a component.
 */
export interface INavbarProps {
	type?: "default" | "light" | "dark";
	className?: string;
	style?: CSSProperties;
	left?: string | ReactElement;
	center?: string | ReactElement;
	right?: string | ReactElement;
}

/**
 * MessageType Type
 *
 * @type ILocationMessageProps Location Message Props
 * @type IPhotoMessageProps Photo Message Props
 * @type IVideoMessageProps Video Message Props
 * @type IAudioMessageProps Audio Message Props
 * @type IMeetingLinkMessageProps Meeting Link Message Props
 * @type IFileMessageProps File Message Props
 * @type ITextMessageProps Text Message Props
 * @type ISystemMessageProps System Message Props
 * @type IMeetingMessageProps Meeting Message Props
 */
export type MessageType =
	| ({ type: "location" } & ILocationMessageProps)
	| ({ type: "photo" } & IPhotoMessageProps)
	| ({ type: "video" } & IVideoMessageProps)
	| ({ type: "audio" } & IAudioMessageProps)
	| ({ type: "meetingLink" } & IMeetingLinkMessageProps)
	| ({ type: "file" } & IFileMessageProps)
	| ({ type: "text" } & ITextMessageProps)
	| ({ type: "system" } & ISystemMessageProps)
	| ({ type: "meeting" } & IMeetingMessageProps);

export type MessageBoxType = MessageType & IMessageBoxProps;
