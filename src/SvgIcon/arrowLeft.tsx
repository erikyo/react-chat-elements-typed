import SVG from "./icons";
import type React from "react";

export const ArrowLeft = ({ size = 20 }): JSX.Element => {
	return (
		<SVG size={size}>
			<polygon points={`${size},0 ${size},${size} 0,0`} />
		</SVG>
	);
};
