import classNames from "classnames";
import type { CSSProperties } from "react";
import SVG from "./SVG";

export const RightNotch = ({
	size = 20,
	style = {},
	focus = false,
}: {
	size?: number;
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
			<path d={`M0 0v${size}L${size} 0`} />
		</SVG>
	);
};
