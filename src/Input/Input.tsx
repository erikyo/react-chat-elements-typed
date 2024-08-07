import type React from "react";
import type { FC, LegacyRef, SyntheticEvent } from "react";
import { useEffect } from "react";
import "./Input.css";
import classNames from "classnames";
import type { IInputProps } from "../types";

const Input: FC<IInputProps> = ({
	type = "text",
	multiline = false,
	minHeight = 25,
	maxHeight = 200,
	autoHeight = true,
	autofocus = false,
	placeholder = "Type here...",
	style = {},
	...props
}) => {
	useEffect(() => {
		if (autofocus) props.reference?.current?.focus();

		if (props.clear instanceof Function) {
			props.clear(clear);
		}
	}, [autofocus, props.clear, props.reference?.current?.focus]);

	const onChangeEvent = ({
		ev,
		target,
	}: {
		ev?: SyntheticEvent;
		target?: HTMLInputElement | HTMLTextAreaElement;
	}) => {
		const el = target as HTMLInputElement;
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
				(props.reference.current as HTMLInputElement).value = (
					el.value || ""
				).substring(0, props.maxlength);
			}
			return;
		}

		if (ev && props.onChange instanceof Function) props.onChange({ ev });
	};

	const clear = () => {
		const current = {
			target: props.reference?.current,
		};

		if (props.reference?.current) {
			(props.reference.current as HTMLInputElement).value = "";
		}

		onChangeEvent(current);
	};

	return (
		<div
			className={classNames("rce-container-input", props.className)}
			style={style}
		>
			{props.leftButtons && (
				<div className="rce-input-buttons">{props.leftButtons}</div>
			)}
			{!multiline ? (
				<input
					ref={props.reference as LegacyRef<HTMLInputElement>}
					type={type}
					className={classNames("rce-input")}
					placeholder={placeholder}
					defaultValue={props.defaultValue}
					style={props.inputStyle}
					onChange={(e) =>
						onChangeEvent({ ev: e, target: props.reference?.current })
					}
					onCopy={props.onCopy}
					onCut={props.onCut}
					onPaste={props.onPaste}
					onBlur={props.onBlur}
					onFocus={props.onFocus}
					onSelect={props.onSelect}
					onSubmit={props.onSubmit}
					onReset={props.onReset}
					onKeyDown={props.onKeyDown}
					onKeyUp={props.onKeyUp}
					value={props.value}
				/>
			) : (
				<textarea
					ref={props.reference as LegacyRef<HTMLTextAreaElement>}
					className={classNames("rce-input", "rce-input-textarea")}
					placeholder={placeholder}
					defaultValue={props.defaultValue}
					style={props.inputStyle}
					onChange={(e) =>
						onChangeEvent({ ev: e, target: props.reference?.current })
					}
					onCopy={props.onCopy}
					onCut={props.onCut}
					onPaste={props.onPaste}
					onBlur={props.onBlur}
					onFocus={props.onFocus}
					onSelect={props.onSelect}
					onSubmit={props.onSubmit}
					onReset={props.onReset}
					onKeyDown={props.onKeyDown}
					onKeyPress={props.onKeyPress}
					onKeyUp={props.onKeyUp}
				>
					{props.defaultValue ? props?.value ?? null : null}
				</textarea>
			)}
			{props.rightButtons && (
				<div className="rce-input-buttons">{props.rightButtons}</div>
			)}
		</div>
	);
};

export default Input;
