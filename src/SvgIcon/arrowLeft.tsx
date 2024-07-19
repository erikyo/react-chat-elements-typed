import SVG from "./icons";
import type React from "react";

export const ArrowLeft = (size = 20): JSX.Element => {
	const backgroundSize: string = `new 0 0 ${size} ${size}`;
	return (
		<SVG
			x="0px"
			y="0px"
			viewBox={`0 0 ${size} ${size}`}
			enableBackground={backgroundSize}
		>
			<polygon points={`${size},0 ${size},${size} 0,0`} />
		</SVG>
	);
};
