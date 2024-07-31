import type { FC } from "react";
import "./Navbar.css";
import classNames from "classnames";
import type { INavbarProps } from "../types";

const Navbar: FC<INavbarProps> = ({
	type = "default",
	style = {
		width: "100%",
	},
	...props
}) => {
	return (
		<div
			className={classNames("rce-navbar", type, props.className)}
			style={style}
		>
			<div className="rce-navbar-item rce-navbar-item__left">{props.left}</div>
			<div className="rce-navbar-item rce-navbar-item__center">
				{props.center}
			</div>
			<div className="rce-navbar-item rce-navbar-item__right">
				{props.right}
			</div>
		</div>
	);
};

export default Navbar;
