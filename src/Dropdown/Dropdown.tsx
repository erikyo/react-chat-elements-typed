import type { FC } from "react";
import { useState } from "react";
import "./Dropdown.css";
import classNames from "classnames";
import Button from "../Button/Button";
import type { IDropdownProps } from "../types";

const Dropdown: FC<IDropdownProps> = ({
	animationPosition = "northwest",
	animationType = "default",
	style = {},
	...props
}) => {
	const [show, setShow] = useState<boolean>(false);

	const onBlur = () => {
		if (show) {
			console.log("blur");
			setShow(false);
		}
	};

	return (
		<div
			className={classNames("rce-dropdown-container", props.className)}
			onBlur={onBlur}
		>
			{<Button {...props.buttonProps} onClick={(e) => setShow(!show)} />}
			<div
				className={classNames(
					"rce-dropdown",
					animationType,
					`rce-dropdown-open__${animationPosition}`,
					{ "dropdown-hide": !show },
					{ "dropdown-show": show },
				)}
				style={style}
			>
				<ul>
					{props.title && (
						<span className="rce-dropdown-title">{props.title}</span>
					)}
					{props.items?.map((x, i) => (
						<li
							key={i.toString()}
							onMouseDown={(e) =>
								props.onSelect instanceof Function
									? props.onSelect(e, i)
									: void 0
							}
						>
							{typeof x !== "string" ? (
								x.icon ? (
									<span className="rce-button-icon--container">
										{(x.icon.float === "right" || !x.icon.float) && (
											<Button {...x} />
										)}

										<span
											style={{
												float: x.icon.float ?? "inherit",
												color: String(x.icon.color) || "inherit",
												fontSize: Number(x.icon.size) || 12,
											}}
											className={classNames(
												"rce-button-icon",
												x.icon.className,
											)}
										>
											{x.icon.component}
										</span>

										{x.icon.float === "left" && (
											<button type={"button"} className={"rce-button link"}>
												{x.text}
											</button>
										)}
									</span>
								) : (
									<button type={"button"} className={"rce-button link"}>
										{x.text}
									</button>
								)
							) : (
								<button type={"button"} className={"rce-button link"}>
									{x}
								</button>
							)}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Dropdown;
