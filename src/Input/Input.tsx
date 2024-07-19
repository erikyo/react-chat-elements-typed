import type React from "react";
import type { LegacyRef, FC, SyntheticEvent } from "react";
import { useEffect } from "react";
import "./Input.css";
import classNames from "classnames";
import type { IInputProps } from "../type.js";

const Input: FC<IInputProps> = ({
	type = "text",
	multiline = false,
	minHeight = 25,
	maxHeight = 200,
	autoHeight = true,
	autofocus = false,
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
		FAKE_EVENT?: boolean;
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

			if (props.reference) {
				props.reference.current.value = (el.value || "").substring(
					0,
					props.maxlength,
				);
			}
			return;
		}

		if (ev && props.onChange instanceof Function) props.onChange({ ev });
	};

	const clear = () => {
		const current = {
			FAKE_EVENT: true,
			target: props.reference?.current,
		};

		if (props.reference?.current?.value) {
			props.reference.current.value = "";
		}

		onChangeEvent(current);
	};

	return (
		<div className={classNames("rce-container-input", props.className)}>
			{props.leftButtons && (
				<div className="rce-input-buttons">{props.leftButtons}</div>
			)}
			{!multiline ? (
				<input
					ref={props.reference as LegacyRef<HTMLInputElement>}
					type={type}
					className={classNames("rce-input")}
					placeholder={props.placeholder}
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
					value={props.value}
				/>
			) : (
				<textarea
					ref={props.reference as LegacyRef<HTMLTextAreaElement>}
					className={classNames("rce-input", "rce-input-textarea")}
					placeholder={props.placeholder}
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
