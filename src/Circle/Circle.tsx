import { type ReactElement, useEffect, useMemo, useRef } from "react";
import { Circle } from "progressbar.js";
import type { ICircleProps } from "../type";

let wrapper: HTMLDivElement;
const ProgressCircle = ({
	animate,
	progressOptions,
	className,
}: ICircleProps): ReactElement => {
	const ref = useRef(null);
	const bar = useMemo(() => {
		wrapper = document.createElement("div");
		return new Circle(wrapper, progressOptions);
	}, [progressOptions]);

	useEffect(() => {
		if (ref.current === null) return;
		(ref.current as HTMLDivElement).appendChild(wrapper);
	}, []);

	useEffect(() => {
		bar.animate(animate);
	}, [animate, bar]);

	return <div className={className} ref={ref} />;
};

export default ProgressCircle;
