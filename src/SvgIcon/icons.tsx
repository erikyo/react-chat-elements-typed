import React, {
	type CSSProperties,
	type FC,
	type ReactNode,
	type SVGProps,
} from "react";

import { IconSend } from "./IconSend";
import { IconPlus } from "./IconPlus";
import { IconMic } from "./IconMic";
import { IconMenu } from "./IconMenu";
import { IconEmoji } from "./IconEmoji";

export interface SVGPropsWithChildren extends SVGProps<SVGSVGElement> {
	children: ReactNode;
	size?: number;
	style?: CSSProperties;
}

export const icons = {
	IconSend,
	IconPlus,
	IconMic,
	IconMenu,
	IconEmoji,
};

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
