import type React from "react";
import type { FC, LegacyRef, SyntheticEvent } from "react";
import { useEffect, useState } from "react";
import "./Input.css";
import classNames from "classnames";
import type { IInputProps } from "../types";
import Button from "../Button/Button";
import { MdClear } from "react-icons/md";

const Input: FC<IInputProps> = ({
	type = "text",
	multiline = false,
	minHeight = 25,
	maxHeight = 200,
	autoHeight = true,
	autofocus = false,
	clearButton = true,
	placeholder = "Type here...",
	value: propValue = "",
	style = {},
	...props
}) => {
	const [value, setValue] = useState<string>(
		propValue || props.defaultValue || "",
	);

	useEffect(() => {
		if (autofocus) props.reference?.current?.focus();
	}, [autofocus, props.reference?.current?.focus]);

	/** Update state if propValue changes */
	useEffect(() => {
		setValue(propValue);
	}, [propValue]);

	const onSubmitEvent = (ev: SyntheticEvent<HTMLFormElement, Event>) => {
		ev.preventDefault();
		setValue("");
		if (props.onSubmit instanceof Function) props.onSubmit(ev);
	};

	const onChangeEvent = (
		ev: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement, Event>,
	) => {
		const el = ev.target as HTMLInputElement;
		let newValue = el.value;
		setValue(newValue);

		if (multiline) {
			if (autoHeight) {
				if (el.style.height !== `${minHeight}px`) {
					el.style.height = `${minHeight}px`;
				}

				let height = "";
				if (el.scrollHeight <= maxHeight) height = `${el.scrollHeight}px`;
				else height = `${maxHeight}px`;

				if (el.style.height !== height) {
					el.style.height = height;
				}
			}
		}

		if (props.maxlength && (el.value || "").length > props.maxlength) {
			if (props.onMaxLengthExceed instanceof Function)
				props.onMaxLengthExceed();

			if (props.reference?.current) {
				newValue = newValue.substring(0, props.maxlength);
				(props.reference.current as HTMLInputElement).value = newValue;
				setValue(newValue);
			}
			return;
		}
	};

	const clear = () => {
		if (props.reference?.current) {
			(props.reference.current as HTMLInputElement).value = "";
		}

		setValue("");
	};

	return (
		<form
			onSubmit={onSubmitEvent}
			className={classNames("rce-container-input", props.className)}
			style={style}
		>
			{props.leftButtons && (
				<div className="rce-input-buttons">{props.leftButtons}</div>
			)}
			<div className="rce-input-content w-full relative">
				{!multiline ? (
					<input
						name={"chat-input"}
						ref={props.reference as LegacyRef<HTMLInputElement>}
						type={type}
						className={classNames("rce-input w-full")}
						placeholder={placeholder}
						value={value}
						style={props.inputStyle}
						onChange={(e) => onChangeEvent(e)}
						onCopy={props.onCopy}
						onCut={props.onCut}
						onPaste={props.onPaste}
						onBlur={props.onBlur}
						onFocus={props.onFocus}
						onSelect={props.onSelect}
						onReset={props.onReset}
						onKeyDown={props.onKeyDown}
						onKeyUp={props.onKeyUp}
					/>
				) : (
					<textarea
						ref={props.reference as LegacyRef<HTMLTextAreaElement>}
						className={classNames("rce-input", "rce-input-textarea")}
						placeholder={placeholder}
						style={props.inputStyle}
						onChange={(e) => onChangeEvent(e)}
						onCopy={props.onCopy}
						onCut={props.onCut}
						onPaste={props.onPaste}
						onBlur={props.onBlur}
						onFocus={props.onFocus}
						onSelect={props.onSelect}
						onReset={props.onReset}
						onKeyDown={props.onKeyDown}
						onKeyUp={props.onKeyUp}
					>
						{value}
					</textarea>
				)}
				{clearButton && value && (
					<Button
						className="rce-input-clear"
						onClick={clear}
						backgroundColor={"transparent"}
						style={{ position: "absolute", zIndex: 1, right: 0, opacity: 0.3 }}
						icon={{
							component: <MdClear color={"var(--rce-color-gray)"} size={20} />,
						}}
					/>
				)}
			</div>
			{props.rightButtons && (
				<div className="rce-input-buttons">{props.rightButtons}</div>
			)}
		</form>
	);
};

export default Input;
