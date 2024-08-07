import type { CSSProperties } from "react";
import SVG from "./icons";

export const IconPlus = ({
	style = {},
}: {
	style?: CSSProperties;
}) => {
	return (
		<SVG size={24} style={style}>
			<path fill="currentColor" d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z" />
		</SVG>
	);
};
