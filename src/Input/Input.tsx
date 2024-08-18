import type {
	ChangeEvent,
	FormEvent,
	FC,
	LegacyRef,
	SyntheticEvent,
	ChangeEventHandler,
} from "react";
import type React from "react";
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
		leftButtons = null,
		rightButtons = null,
		maxlength = 200,
		onMaxLengthExceed = () => console.warn("The maxlength has been exceeded"),
		value: propValue = "",
		style = {},
		reference = null,
		...rest
	} = props;
	const [value, setValue] = useState<string>(
		propValue || rest.defaultValue || "",
	);

	useEffect(() => {
		if (autofocus) reference?.current?.focus();
	}, [autofocus, reference?.current?.focus]);

	/** Update state if propValue changes */
	useEffect(() => {
		setValue(propValue);
	}, [propValue]);

	const onSubmitEvent = (ev: FormEvent) => {
		ev.preventDefault();
		setValue("");
		if (rest.onSubmit instanceof Function) rest.onSubmit(ev);
	};

	const onChangeEvent = (
		ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const el = ev.target;
		let newValue = el.value;
		if (newValue) {
			setValue(newValue);
		}

		if (multiline) {
			if (autoHeight) {
				if (style.height !== `${minHeight}px`) {
					style.height = `${minHeight}px`;
				}

				let height = "";
				if (el.scrollHeight <= maxHeight) height = `${el.scrollHeight}px`;
				else height = `${maxHeight}px`;

				if (style.height !== height) {
					style.height = height;
				}
			}
		}

		if (maxlength && (el.value || "").length > maxlength) {
			if (onMaxLengthExceed) onMaxLengthExceed();

			if (reference?.current) {
				newValue = newValue.substring(0, maxlength);
				(reference.current as HTMLInputElement).value = newValue;
				setValue(newValue);
			}
			return;
		}
	};

	const clear = () => {
		if (reference?.current) {
			(reference.current as HTMLInputElement).value = "";
		}

		setValue("");
	};

	return (
		<form
			onSubmit={onSubmitEvent}
			className={classNames("rce-container-input", rest.className)}
			style={style}
		>
			{leftButtons && <div className="rce-input-buttons">{leftButtons}</div>}
			<div className="rce-input-content w-full relative">
				{!multiline ? (
					<input
						{...rest}
						name={"chat-input"}
						style={rest.inputStyle}
						ref={reference as LegacyRef<HTMLInputElement>}
						type={type}
						className={"rce-input w-full"}
						placeholder={placeholder}
						value={value}
						onChange={(e) => onChangeEvent(e)}
					/>
				) : (
					<textarea
						{...rest}
						ref={reference as LegacyRef<HTMLTextAreaElement>}
						className={classNames("rce-input", "rce-input-textarea")}
						placeholder={placeholder}
						style={rest.inputStyle}
						onChange={(e) => onChangeEvent(e)}
					>
						{value}
					</textarea>
				)}
				{clearButton && value && (
					<Button
						className={"rce-input-clear"}
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
			{rightButtons && <div className="rce-input-buttons">{rightButtons}</div>}
		</form>
	);
};

export default Input;
