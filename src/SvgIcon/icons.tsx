import React, { type FC, type ReactNode, type SVGProps } from "react";

export interface SVGPropsWithChildren extends SVGProps<SVGSVGElement> {
	children: ReactNode;
}

const SVG: FC<SVGPropsWithChildren> = ({
	children,
	...props
}: SVGPropsWithChildren) => {
	// biome-ignore lint/a11y/noSvgWithoutTitle: <the title attribute will be provided>
	return <svg {...props}>{children}</svg>;
};

export default SVG;
