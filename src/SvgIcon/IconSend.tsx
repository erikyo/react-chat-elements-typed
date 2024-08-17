import type { CSSProperties } from "react";
import SVG from "./SVG";

const IconSend = ({
	style = {},
	size = 24,
}: { style?: CSSProperties; size?: number }) => {
	return (
		<SVG size={size} style={style}>
			<path
				fill="currentColor"
				d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"
			/>
		</SVG>
	);
};

export default IconSend;
