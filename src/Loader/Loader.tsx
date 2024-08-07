import React, { useEffect, useMemo, useCallback, useRef, type FC } from "react";
import { Circle, Line } from "progressbar.js";
import type { ICircleProps } from "../types";
import type Shape from "progressbar.js/shape";

const Loader: FC<ICircleProps> = ({
	type = "circle",
	progressOptions = {
		strokeWidth: 6,
		easing: "easeInOut",
		duration: 1400,
		color: "#0791f1",
		trailColor: "#eee",
	},
	className,
	size = 100,
	progress = 0,
	style = {},
}) => {
	const wrapperRef = useRef<HTMLDivElement | null>(null);
	const loaderRef = useRef<Shape | null>(null);

	const createWrapper = () => {
		const wrapper = document.createElement("div");
		wrapperRef.current = wrapper;
		return wrapper;
	};

	const wrapper = useMemo(createWrapper, []);

	useEffect(() => {
		const loader =
			type === "circle"
				? new Circle(wrapper, {
						strokeWidth: 6,
						easing: "easeInOut",
						duration: 1400,
						color: "#FFEA82",
						trailColor: "#eee",
						trailWidth: 1,
						svgStyle: null,
						...progressOptions,
					})
				: new Line(wrapper, {
						strokeWidth: 4,
						easing: "easeInOut",
						duration: 1400,
						color: "#FFEA82",
						trailColor: "#eee",
						trailWidth: 1,
						svgStyle: { width: "100%", height: "100%" },
						text: {
							style: {
								color: "#999",
								position: "absolute",
								right: "0",
								top: "30px",
								padding: 0,
								margin: 0,
								transform: null,
							},
							autoStyleContainer: false,
						},
						from: { color: "#FFEA82" },
						to: { color: "#ED6A5A" },
						step: (state, bar) => {
							(bar as Shape).setText(`${Math.round(bar.value() * 100)} %`);
						},
						...progressOptions,
					});

		loaderRef.current = loader;

		return () => {
			loader.destroy();
		};
	}, [wrapper, progressOptions, type]);

	useEffect(() => {
		if (loaderRef.current) {
			(loaderRef.current as Shape).animate(progress * 0.01);
		}
	}, [progress]);

	const node = useCallback(
		(node: HTMLDivElement) => {
			if (node) {
				node.innerHTML = ""; // Clear any previous content
				node.appendChild(wrapper);
			}
		},
		[wrapper],
	);

	return (
		<div
			className={className}
			ref={node}
			style={{ width: size, height: size, ...style }}
		/>
	);
};

export default Loader;
