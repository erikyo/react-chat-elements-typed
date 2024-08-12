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
import classNames from "classnames";

/**
 * Format file size or return "Unknown File Size"
 * @param size
 */
function formatFileSize(size: string | number | undefined) {
	if (typeof size === "string") {
		return size;
	}
	if (typeof size === "number") {
		return humanFileSize(size);
	}
	return "Unknown File Size";
}

/**
 * Format file size in human-readable format
 * @param bytes The size in bytes
 * @param decimals The number of decimals
 * @return {string} The size in human-readable format
 */
function humanFileSize(bytes: number, decimals = 2): string {
	if (bytes === 0) return "0 Bytes";
	const k = 1024;
	const dm = decimals || 2;
	const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}

const FileMessage: FC<IFileMessageProps> = (props) => {
	const progressOptions = {
		strokeWidth: 6,
		easing: "easeInOut",
		duration: 1400,
		color: "var(--rce-color-primary)",
		trailColor: "var(--rce-color-gray-100)",
	};

	const error = props?.data?.status && props?.data?.status.error === true;

	const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
		if (!props?.data?.status) return;

		if (!props?.data?.status.download && props.onDownload instanceof Function)
			props.onDownload(e);
		else if (props?.data?.status.download && props.onOpen instanceof Function)
			props.onOpen(e);
	};

	const filesize = formatFileSize(props?.data?.size);

	return (
		<div className="rce-mbox-file">
			<button type={"button"} onClick={onClick}>
				<div
					className={classNames(
						"rce-mbox-file--icon",
						`rce-mbox-file-extension-${props?.data?.extension}`,
					)}
				>
					<FaFile color="#aaa" />
					{props?.data?.size ? (
						<div className="rce-mbox-file--size">{filesize}</div>
					) : null}
				</div>
				<div className="rce-mbox-file--text">{props.data?.name}</div>
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
