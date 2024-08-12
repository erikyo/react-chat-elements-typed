import type { FC } from "react";
import type { IBadgeProps } from "../types";
import classNames from "classnames";

const Badge: FC<IBadgeProps> = (props) => {
	const { rounded = true } = props;
	return (
		<span
			style={{
				...props.style,
				color: props?.color || "var(--rce-color-white)",
				backgroundColor: props?.backgroundColor || "var(--rce-color-red)",
				fontSize: props?.size || 11,
				aspectRatio: rounded ? "1/1" : undefined,
				borderRadius: rounded ? "100%" : "5px",
				position: props?.position ? "absolute" : undefined,
			}}
			className={classNames(
				"rce-badge",
				props.className,
				props.position ? props.position?.split("-").join(" ") : undefined,
			)}
		>
			{props?.value ? props?.value?.toString() : null}
		</span>
	);
};

export default Badge;
