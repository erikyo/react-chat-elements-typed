import SVG from "./icons";

/**
 * The ArrowRight component is used to render the right arrow of the message box.
 * @param size The size of the icon. The default is 20.
 */
export const ArrowRight = ({ size = 20 }): JSX.Element => {
	return (
		<SVG size={size}>
			<polygon points={`0,0 0,${size} ${size},0`} />
		</SVG>
	);
};
