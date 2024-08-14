import type { CSSProperties } from "react";
import SVG from "./SVG";

export const IconMenu = ({
	style = {},
	size = 24,
}: { style?: CSSProperties; size?: number }) => {
	return (
		<SVG size={size} style={style}>
			<path
				fill="currentColor"
				d="M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z"
			/>
		</SVG>
	);
};
