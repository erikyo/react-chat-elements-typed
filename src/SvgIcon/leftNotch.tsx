import SVG from "./icons";
import classNames from "classnames";
import type { CSSProperties } from "react";

/**
 * The LeftNotch component is used to render the left notch of the message box.
 * @param notchStyle The notchStyle is a CSSProperties and optional.
 * @param focus The focus is a boolean and optional.
 * @constructor
 */
export const LeftNotch = ({
	notchStyle = {},
	focus = false,
}: {
	notchStyle?: CSSProperties;
	focus?: boolean;
}) => {
	return (
		<SVG
			style={notchStyle}
			className={classNames("rce-mbox-left-notch", {
				"message-focus": focus,
			})}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
		>
			<path d="M20 0v20L0 0" filter="url(#filter1)" />
		</SVG>
	);
};
