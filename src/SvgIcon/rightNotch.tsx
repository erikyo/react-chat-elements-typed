import SVG from "./icons";
import classNames from "classnames";
import type { CSSProperties } from "react";

export const RightNotch = ({
	notchStyle = {},
	focus = false,
}: {
	notchStyle?: CSSProperties;
	focus?: boolean;
}) => {
	return (
		<SVG
			style={notchStyle}
			className={classNames("rce-mbox-right-notch", {
				"message-focus": focus,
			})}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
		>
			<path d="M0 0v20L20 0" />
		</SVG>
	);
};
