import "./Button.css";
import classNames from "classnames";
import type { IButtonProps, IIcon } from "../types";
import type { FC } from "react";

const ButtonIcon: FC<IIcon> = (props) => {
	return (
		<span className="rce-button-icon--container">
			<span
				style={{
					float: props.float ?? "inherit",
					fontSize: props.size || 12,
				}}
				className="rce-button-icon"
			>
				{props.component}
			</span>
		</span>
	);
};

const Button: FC<IButtonProps> = ({
	backgroundColor = "var(--rce-color-secondary)",
	color = "var(--rce-color-white)",
	style = {},
	borderWidth = 2,
	outlined,
	disabled,
	circle,
	squared,
	link,
	icon,
	buttonRef,
	text,
	className,
	children,
	...rest
}) => {
	return (
		<button
			type={rest.type ?? "button"}
			ref={buttonRef}
			className={classNames(
				"rce-button",
				className,
				outlined && "outlined",
				circle && "circle",
				link && "link",
				squared && "squared",
				disabled && "disabled",
			)}
			style={{
				backgroundColor: outlined ? color : backgroundColor,
				color: outlined ? backgroundColor : color,
				borderColor: backgroundColor,
				borderWidth: borderWidth,
				flexDirection: icon?.float === "left" ? "row-reverse" : "row",
				...style,
			}}
			{...rest} // spreading only valid HTML attributes
		>
			{children}
			{text && <span>{text}</span>}
			{icon?.component && <ButtonIcon {...icon} />}
		</button>
	);
};

export default Button;
