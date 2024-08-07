import type { FC } from "react";
import type React from "react";
import {
	FaCloudDownloadAlt,
	FaExclamationTriangle,
	FaFile,
} from "react-icons/fa";
import Loader from "../Loader/Loader";
import type { IFileMessageProps } from "../types";
import "./FileMessage.css";

const FileMessage: FC<IFileMessageProps> = (props) => {
	const progressOptions = {
		strokeWidth: 6,
		easing: "easeInOut",
		duration: 1400,
		color: "#0791f1",
		trailColor: "#eee",
		step: (
			state: { color: string; width: string },
			circle: {
				path: { setAttribute: (arg0: string, arg1: string) => void };
				value: () => number;
				setText: (arg0: string | number) => void;
			},
		) => {
			circle.path.setAttribute("trail", state.color);
			circle.path.setAttribute("trailwidth-width", state.width);

			const value = Math.round(circle.value() * 100);
			if (value === 0) circle.setText("");
			else circle.setText(value);
		},
	};

	const error = props?.data?.status && props?.data?.status.error === true;

	const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
		if (!props?.data?.status) return;

		if (!props?.data?.status.download && props.onDownload instanceof Function)
			props.onDownload(e);
		else if (props?.data?.status.download && props.onOpen instanceof Function)
			props.onOpen(e);
	};

	return (
		<div className="rce-mbox-file">
			<button type={"button"} onClick={onClick}>
				<div className="rce-mbox-file--icon">
					<FaFile color="#aaa" />
					{props?.data?.size ? (
						<div className="rce-mbox-file--size">{props?.data.size}</div>
					) : null}
				</div>
				<div className="rce-mbox-file--text">{props.text}</div>
				<div className="rce-mbox-file--buttons">
					{error && (
						<span className="rce-error-button">
							<FaExclamationTriangle color="#ff3d3d" />
						</span>
					)}
					{!error &&
						props?.data?.status &&
						!props?.data?.status.download &&
						!props?.data?.status.click && <FaCloudDownloadAlt color="#aaa" />}
					{!error &&
						props?.data?.status &&
						typeof props?.data?.status.loading === "number" &&
						props?.data?.status.loading > 0 && (
							<Loader
								animate={!!props?.data?.status.loading}
								className="rce-mbox-file--loading"
								progressOptions={progressOptions}
							/>
						)}
				</div>
			</button>
		</div>
	);
};

export default FileMessage;
