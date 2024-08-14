import type { CSSProperties } from "react";
import SVG from "./SVG";

export const IconPlus = ({
	style = {},
	size = 24,
}: { style?: CSSProperties; size?: number }) => {
	return (
		<SVG size={size} style={style}>
			<path fill="currentColor" d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z" />
		</SVG>
	);
};
