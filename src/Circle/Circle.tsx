import { useEffect, useMemo, useCallback, type FC, ReactNode } from "react";
import { Circle } from "progressbar.js";
import type { ICircleProps } from "../types";

let wrapper: HTMLDivElement;
const ProgressCircle: FC<ICircleProps> = ({
	animate,
	progressOptions,
	className,
	progress = 0,
}) => {
	const animateProgress = useMemo(() => progress, [progress]);

	const bar = useMemo(() => {
		wrapper = document.createElement("div") as HTMLDivElement;
		return new Circle(wrapper, progressOptions);
	}, [progressOptions]);

	const node = useCallback((node: HTMLDivElement) => {
		if (node) {
			node.appendChild(wrapper);
		}
	}, []);

	useEffect(() => {
		if (animate) {
			bar.animate(animateProgress);
		}
	}, [animate, animateProgress, bar]);

	return <div className={className} ref={node} />;
};

export default ProgressCircle;
