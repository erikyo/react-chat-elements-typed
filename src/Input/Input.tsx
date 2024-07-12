import type React from "react";
import type { RefObject } from "react";
import { type JSX, useEffect } from "react";
import "./Input.css";
import classNames from "classnames";
import type { IInputProps } from "../type";

const Input = ({
	type = "text",
	multiline = false,
	minHeight = 25,
	maxHeight = 200,
	autoHeight = true,
	autofocus = false,
	...props
}: IInputProps): JSX.Element => {
	useEffect(() => {
		if (autofocus) (props.reference?.current as HTMLElement)?.focus();

		if (props.clear instanceof Function) {
			props.clear(clear);
		}
	}, [autofocus, props.clear, props.reference?.current]);

	const onChangeEvent = (
		e: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const element = e.target as HTMLTextAreaElement;
		if (multiline) {
			if (autoHeight) {
				if (element.style.height !== `${minHeight}px`) {
					element.style.height = `${minHeight}px`;
				}

				let height: string;
				if ((e.target as HTMLElement).scrollHeight <= maxHeight)
					height = `${(e.target as HTMLElement).scrollHeight}px`;
				else height = `${maxHeight}px`;

				if (element.style.height !== height) {
					element.style.height = height;
				}
			}
		}

		if (props.maxlength && (element.value || "").length > props.maxlength) {
			if (props.onMaxLengthExceed instanceof Function)
				props?.onMaxLengthExceed?.();

			if (props.reference?.current) {
				props.reference.current.value = (element.value || "").substring(
					0,
					props.maxlength,
				);
			}
			return;
		}

		if (props.onChange instanceof Function) props.onChange(e);
	};

	const clear = (): void => {
		const _event = {
			FAKE_EVENT: true,
			target: props.reference?.current,
		};

		if (props.reference?.current?.value) {
			props.reference.current.value = "";
		}

		const onChangeEvent = (e: React.SyntheticEvent<HTMLInputElement>) =>
			onChangeEvent;
	};

	return (
		<div className={classNames("rce-container-input", props.className)}>
			{props.leftButtons && (
				<div className="rce-input-buttons">{props.leftButtons}</div>
			)}
			{!multiline ? (
				<input
					ref={props.reference as RefObject<HTMLInputElement>}
					type={type}
					className={classNames("rce-input")}
					placeholder={props.placeholder}
					defaultValue={props.defaultValue}
					style={props.inputStyle}
					onChange={onChangeEvent}
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
					ref={props.reference as RefObject<HTMLTextAreaElement>}
					className={classNames("rce-input", "rce-input-textarea")}
					placeholder={props.placeholder}
					defaultValue={props.defaultValue}
					style={props.inputStyle}
					onChange={onChangeEvent}
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
