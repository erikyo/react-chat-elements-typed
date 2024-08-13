import type { FC } from "react";
import "./Avatar.css";
import classNames from "classnames";
import type { IAvatarProps } from "../types";
import { LetterAvatar } from "./LetterAvatar";

const Avatar: FC<IAvatarProps> = ({
	size = "default",
	rounded = true,
	...props
}) => {
	return (
		<div
			className={classNames(
				"rce-avatar-container",
				size,
				props?.className,
				rounded && "rounded",
			)}
			style={props?.style}
		>
			{props.letterItem || !props?.src ? (
				<LetterAvatar {...props} />
			) : (
				<img
					loading={"lazy"}
					alt={props?.alt}
					src={props.src}
					className={"rce-avatar"}
				/>
			)}
			{props?.sideElement}
		</div>
	);
};

export default Avatar;
