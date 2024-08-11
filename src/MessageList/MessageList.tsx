import {
	type FC,
	type LegacyRef,
	type MouseEvent,
	type UIEvent,
	useEffect,
	useRef,
	useState,
} from "react";
import "./MessageList.css";
import MessageBox from "../MessageBox/MessageBox";
import classNames from "classnames";
import { MdKeyboardArrowDown } from "react-icons/md";
import type { IMessageListProps } from "../types";
import Button from "../Button/Button";
import Badge from "../Badge/Badge";

const MessageList: FC<IMessageListProps> = ({
	reference,
	lockable = false,
	toBottomHeight = 300,
	downButton = null,
	...props
}) => {
	const [scrollBottom, setScrollBottom] = useState<number>(0);
	const [scrollButton, setScrollButton] = useState<boolean>(false);
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

		if (prevProps.current?.dataSource.length !== props.dataSource.length) {
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

	const onScroll = (e: UIEvent): void => {
		const element = e?.currentTarget as HTMLDivElement;
		const bottom = getBottom(element);
		setScrollBottom(bottom);
		if (
			toBottomHeight === "100%" ||
			(toBottomHeight && bottom > Number(toBottomHeight))
		) {
			if (!scrollButton) {
				setScrollButton(true);
				setScrollBottom(bottom);
			}
		} else {
			if (scrollButton) {
				setScrollButton(false);
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
				{props.dataSource?.map((x, i: number) => (
					<MessageBox {...x} {...props} key={`message-${i.toString()}`} />
				))}
			</div>
			{scrollButton && toBottomHeight !== "100%" && (
				<Button
					rounded
					className="rce-mlist-down-button"
					onClick={(e) => toBottom(e)}
					color={"var(--rce-color-gray)"}
					backgroundColor={"var(--rce-color-white)"}
					icon={{ component: <MdKeyboardArrowDown size={40} /> }}
					style={{ padding: 2 }}
				>
					{props?.downButtonBadge ? (
						<Badge
							className="rce-mlist-down-button--badge"
							value={props?.downButtonBadge}
						/>
					) : undefined}
				</Button>
			)}
		</div>
	);
};

export default MessageList;
