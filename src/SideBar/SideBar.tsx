import type { FC } from "react";
import type React from "react";
import "./SideBar.css";

import classNames from "classnames";
import type { ISideBarProps } from "../types";

const SideBar: FC<ISideBarProps> = ({
	type = "default",
	style = {},
	...props
}) => {
	return (
		<div
			className={classNames("rce-sbar", type, props?.className)}
			style={style}
		>
			<div className="rce-sbar-item">{props?.top}</div>
			<div className="rce-sbar-item rce-sbar-item__center">{props?.center}</div>
			<div className="rce-sbar-item">{props?.bottom}</div>
		</div>
	);
};

export default SideBar;
