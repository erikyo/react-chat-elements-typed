import type { MessageReaction } from "../types";
import type React from "react";

export function Reactions(props: {
	reactions: MessageReaction[];
}) {
	if (!props.reactions) {
		return null;
	}
	return (
		<div className={"rce-reactions"}>
			{props.reactions?.map((reaction) => (
				<div
					className={"rce-reaction"}
					title={`${reaction.author} reacted with ${reaction.emoji}`}
					key={reaction.emoji}
				>
					{reaction.emoji}
				</div>
			))}
		</div>
	);
}
