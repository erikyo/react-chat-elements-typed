import type { StatusType } from "../types";
import { MdAccessTime, MdCheck, MdDoneAll } from "react-icons/md";
import type React from "react";

export function MessageStatus({ status }: { status: StatusType }) {
	return (
		<span className="rce-mbox-status">
			{status === "waiting" && (
				<MdAccessTime
					color={"var(--rce-color-gray)"}
					style={{ fontSize: 18 }}
				/>
			)}

			{status === "sent" && (
				<MdCheck
					color={"var(--rce-color-light-blue)"}
					style={{ fontSize: 18 }}
				/>
			)}

			{status === "received" && (
				<MdDoneAll color={"var(--rce-color-green)"} style={{ fontSize: 18 }} />
			)}

			{status === "read" && (
				<MdDoneAll
					color={"var(--rce-color-light-blue)"}
					style={{ fontSize: 18 }}
				/>
			)}
		</span>
	);
}
