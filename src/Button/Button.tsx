import "./Button.css";
import classNames from "classnames";
import type { IButtonProps, IIcon } from "../types";
import type { FC, ReactElement } from "react";

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
	disabled = false,
	backgroundColor = "var(--rce-color-secondary)",
	color = "var(--rce-color-white)",
	style = {},
	...props
}): ReactElement<HTMLButtonElement> => {
	return (
		<button
			type={props?.type ?? "button"}
			ref={props.buttonRef}
			title={props.title}
			className={classNames(
				"rce-button",
				props.type,
				props.className,
				props.outlined && "outlined",
				props.circle && "circle",
			)}
			style={{
				backgroundColor: props.outlined ? color : backgroundColor,
				color: props.outlined ? backgroundColor : color,
				borderColor: backgroundColor,
				borderStyle: "solid",
				cursor: disabled ? "default" : "pointer",
				filter: disabled ? "grayscale(1)" : "none",
				flexDirection: props.icon?.float === "left" ? "row-reverse" : "row",
				...style,
			}}
			disabled={disabled}
			onClick={props.onClick}
		>
			{props.text ? <span>{props.text}</span> : null}
			{props.icon ? <ButtonIcon {...props.icon} /> : null}
		</button>
	);
};
export default Button;
