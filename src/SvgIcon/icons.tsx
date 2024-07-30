import React, {
	type CSSProperties,
	type FC,
	type ReactNode,
	type SVGProps,
} from "react";

export interface SVGPropsWithChildren extends SVGProps<SVGSVGElement> {
	children: ReactNode;
	size?: number;
	style?: CSSProperties;
}

const SVG: FC<SVGPropsWithChildren> = ({
	children,
	size = 24,
	style = {},
	className = "",
	...props
}: SVGPropsWithChildren) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			role={"img"}
			viewBox={`0 0 ${size} ${size}`}
			height={size}
			width={size}
			{...props}
			style={{
				display: "inline-flex",
				verticalAlign: "middle",
				fill: "currentColor",
				...style,
			}}
			className={className}
		>
			{children}
		</svg>
	);
};

export default SVG;
