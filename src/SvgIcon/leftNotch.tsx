import classNames from "classnames";
import type { CSSProperties } from "react";
import SVG from "./SVG";

/**
 * The LeftNotch component is used to render the left notch of the message box.
 * @param notchStyle The notchStyle is a CSSProperties and optional.
 * @param focus The focus is a boolean and optional.
 * @constructor
 */
export const LeftNotch = ({
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
			className={classNames("rce-mbox-left-notch", {
				"message-focus": focus,
			})}
			size={size}
		>
			<path d={`M${size} 0v${size}L0 0`} />
		</SVG>
	);
};
