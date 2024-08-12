import type { FC } from "react";
import type React from "react";
import "./Popup.css";

import Button from "../Button/Button";

import classNames from "classnames";
import type { IPopupProps } from "../types";

const Popup: FC<IPopupProps> = (props) => {
	if (props.show === true)
		return (
			<div
				className={classNames("rce-popup-wrapper", props.type, props.className)}
				style={{
					backgroundColor: props.wrapperColor ?? "rgb(0 0 0 / 75%)",
				}}
			>
				<div className="rce-popup">
					{props.popup?.renderHeader ? (
						<div className="rce-popup-header text-extrabold text-2xl">
							{props.popup?.renderHeader}
						</div>
					) : (
						<div className="rce-popup-header text-extrabold text-2xl">
							<span>{props.popup?.header}</span>
							{props.popup?.header &&
								props.popup?.headerButtons?.map((x, i) => (
									<Button key={i.toString()} {...x} />
								))}
						</div>
					)}
					<div
						className="rce-popup-content"
						style={{ color: props.popup?.color }}
					>
						{props.popup?.renderContent
							? props.popup?.renderContent
							: props.popup?.text}
					</div>
					<div className="rce-popup-footer">
						{props.popup?.renderFooter
							? props.popup?.renderFooter
							: props.popup?.footerButtons?.map((x, i) => (
									<Button key={i.toString()} {...x} />
								))}
					</div>
				</div>
			</div>
		);
	return null;
};

export default Popup;
