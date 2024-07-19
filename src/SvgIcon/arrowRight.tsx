import SVG from "./icons";

export const ArrowRight = (size = 20): JSX.Element => {
	const backgroundSize: string = `new 0 0 ${size} ${size}`;
	return (
		<SVG
			x="0px"
			y="0px"
			viewBox={`0 0 ${size} ${size}`}
			enableBackground={backgroundSize}
		>
			<polygon points={`0,0 0,${size} ${size},0`} />
		</SVG>
	);
};
