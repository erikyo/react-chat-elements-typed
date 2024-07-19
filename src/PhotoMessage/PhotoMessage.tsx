import type React from "react";
import type { FC } from "react";

import "./PhotoMessage.css";

import { FaCloudDownloadAlt, FaExclamationTriangle } from "react-icons/fa";
import ProgressCircle from "../Circle/Circle.js";
import type { IPhotoMessageProps, IProgressOptions } from "../type.js";

const PhotoMessage: FC<IPhotoMessageProps> = ({
	text,
	data,
	onDownload,
	onLoad,
	onOpen,
	onPhotoError,
}) => {
	const progressOptions = {
		strokeWidth: 2.3,
		color: "#efe",
		trailColor: "#aaa",
		trailWidth: 1,
		step: (
			state: IProgressOptions,
			circle: {
				path: { setAttribute: (arg0: string, arg1: any) => void };
				value: () => number;
				setText: (arg0: string | number) => void;
			},
		) => {
			circle.path.setAttribute("trail", state?.state?.color);
			circle.path.setAttribute("trailwidth-width", state?.state?.width);

			const value = Math.round(circle.value() * 100);
			if (value === 0) circle.setText("");
			else circle.setText(value);
		},
	};

	const error = data?.status && data?.status.error === true;

	return (
		<div className="rce-mbox-photo">
			<div
				className="rce-mbox-photo--img"
				style={{
					...(data?.width &&
						data?.height && {
							width: data.width,
							height: data.height,
						}),
				}}
			>
				<img
					src={data?.uri}
					alt={data?.alt}
					onClick={onOpen}
					onKeyDown={console.log}
					onLoad={onLoad}
					onError={onPhotoError}
				/>
				{error && (
					<div className="rce-mbox-photo--img__block">
						<span className="rce-mbox-photo--img__block-item rce-mbox-photo--error">
							<FaExclamationTriangle />
						</span>
					</div>
				)}
				{!error && data?.status && !data?.status?.download && (
					<div className="rce-mbox-photo--img__block">
						{!data?.status.click && (
							<button
								type={"button"}
								onClick={onDownload}
								onKeyDown={console.log}
								className="rce-mbox-photo--img__block-item rce-mbox-photo--download"
							>
								<FaCloudDownloadAlt />
							</button>
						)}
						{typeof data?.status.loading === "number" &&
							data?.status.loading !== 0 && (
								<ProgressCircle
									animate={data?.status.loading ?? false}
									progressOptions={progressOptions}
									className="rce-mbox-photo--img__block-item"
								/>
							)}
					</div>
				)}
			</div>
			{text && <div className="rce-mbox-text">{text}</div>}
		</div>
	);
};

export default PhotoMessage;
