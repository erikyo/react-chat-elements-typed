import type React from "react";
import type { FC, LegacyRef, SyntheticEvent } from "react";
import { useEffect, useState } from "react";
import "./Input.css";
import classNames from "classnames";
import type { IInputProps } from "../types";
import Button from "../Button/Button";
import { MdClear } from "react-icons/md";

const Input: FC<IInputProps> = (props) => {
	const {
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
		...rest
	} = props;
	const [value, setValue] = useState<string>(
		propValue || rest.defaultValue || "",
	);

	useEffect(() => {
		if (autofocus) rest.reference?.current?.focus();
	}, [autofocus, rest.reference?.current?.focus]);

	/** Update state if propValue changes */
	useEffect(() => {
		setValue(propValue);
	}, [propValue]);

	const onSubmitEvent = (ev: SyntheticEvent<HTMLFormElement, Event>) => {
		ev.preventDefault();
		setValue("");
		if (rest.onSubmit instanceof Function) rest.onSubmit(ev);
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

		if (rest.maxlength && (el.value || "").length > rest.maxlength) {
			if (rest.onMaxLengthExceed instanceof Function) rest.onMaxLengthExceed();

			if (rest.reference?.current) {
				newValue = newValue.substring(0, rest.maxlength);
				(rest.reference.current as HTMLInputElement).value = newValue;
				setValue(newValue);
			}
			return;
		}
	};

	const clear = () => {
		if (rest.reference?.current) {
			(rest.reference.current as HTMLInputElement).value = "";
		}

		setValue("");
	};

	return (
		<form
			onSubmit={onSubmitEvent}
			className={classNames("rce-container-input", rest.className)}
			style={style}
		>
			{rest.leftButtons && (
				<div className="rce-input-buttons">{rest.leftButtons}</div>
			)}
			<div className="rce-input-content w-full relative">
				{!multiline ? (
					<input
						name={"chat-input"}
						ref={rest.reference as LegacyRef<HTMLInputElement>}
						type={type}
						className={classNames("rce-input w-full")}
						placeholder={placeholder}
						value={value}
						style={rest.inputStyle}
						onChange={(e) => onChangeEvent(e)}
						onCopy={rest.onCopy}
						onCut={rest.onCut}
						onPaste={rest.onPaste}
						onBlur={rest.onBlur}
						onFocus={rest.onFocus}
						onSelect={rest.onSelect}
						onReset={rest.onReset}
						onKeyDown={rest.onKeyDown}
						onKeyUp={rest.onKeyUp}
					/>
				) : (
					<textarea
						ref={rest.reference as LegacyRef<HTMLTextAreaElement>}
						className={classNames("rce-input", "rce-input-textarea")}
						placeholder={placeholder}
						style={rest.inputStyle}
						onChange={(e) => onChangeEvent(e)}
						onCopy={rest.onCopy}
						onCut={rest.onCut}
						onPaste={rest.onPaste}
						onBlur={rest.onBlur}
						onFocus={rest.onFocus}
						onSelect={rest.onSelect}
						onReset={rest.onReset}
						onKeyDown={rest.onKeyDown}
						onKeyUp={rest.onKeyUp}
					>
						{value}
					</textarea>
				)}
				{clearButton && value && (
					<Button
						className="rce-input-clear"
						onClick={clear}
						backgroundColor={"transparent"}
						style={{
							position: "absolute",
							zIndex: 1,
							right: 0,
							top: 0,
							opacity: 0.3,
						}}
						icon={{
							component: <MdClear color={"var(--rce-color-gray)"} size={20} />,
						}}
					/>
				)}
			</div>
			{rest.rightButtons && (
				<div className="rce-input-buttons">{rest.rightButtons}</div>
			)}
		</form>
	);
};

export default Input;
