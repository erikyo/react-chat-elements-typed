import type React from "react";
import type { FC } from "react";
import "./SideBar.css";

import classNames from "classnames";
import type { ISideBarProps } from "../types.js";

const SideBar: FC<ISideBarProps> = ({ type = "dark", ...props }) => {
	return (
		<div className={classNames("rce-sbar", type, props.data?.className)}>
			<div className="rce-sbar-item">{props.data?.top}</div>
			<div className="rce-sbar-item rce-sbar-item__center">
				{props.data?.center}
			</div>
			<div className="rce-sbar-item">{props.data?.bottom}</div>
		</div>
	);
};

export default SideBar;
