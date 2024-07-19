import type React from "react";
import type { FC } from "react";
import "./ReplyMessage.css";

import classNames from "classnames";
import type { IReplyMessageProps } from "../types.js";

const ReplyMessage: FC<IReplyMessageProps> = ({ onClick, ...props }) => {
	return (
		<div
			className={classNames("rce-mbox-reply", {
				"rce-mbox-reply-border": !!props.titleColor,
			})}
			style={{ ...(props.titleColor && { borderColor: props.titleColor }) }}
			onClick={onClick}
			onKeyDown={console.log}
		>
			<div className="rce-mbox-reply-left">
				<div
					style={{ ...(props.titleColor && { color: props.titleColor }) }}
					className="rce-mbox-reply-owner"
				>
					{props.title || "Unknown"}
				</div>
				<div className="rce-mbox-reply-message">{props.message || "..."}</div>
			</div>
			{props.photoURL && (
				<div className="rce-mbox-reply-right">
					<img src={props.photoURL} alt="" />
				</div>
			)}
		</div>
	);
};

export default ReplyMessage;
