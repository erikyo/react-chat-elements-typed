import SVG from "./icons";
import classNames from "classnames";
import type { CSSProperties } from "react";

export const RightNotch = ({
	style = {},
	focus = false,
}: {
	style?: CSSProperties;
	focus?: boolean;
}) => {
	return (
		<SVG
			style={style}
			className={classNames("rce-mbox-right-notch", {
				"message-focus": focus,
			})}
			size={20}
		>
			<path d="M0 0v20L20 0" />
		</SVG>
	);
};
