import "./LocationMessage.css";
import classNames from "classnames";
import type { ILocationMessageProps } from "../types";
import type { FC } from "react";
import { MAP_URL, STATIC_URL } from "../constants";

const LocationMessage: FC<ILocationMessageProps> = ({
	markerColor = "red",
	target = "_blank",
	zoom = "14",
	...props
}) => {
	const buildURL = (url: string) => {
		return url
			.replace(/LATITUDE/g, props?.data?.latitude.toString() ?? "0")
			.replace(/LONGITUDE/g, props?.data?.longitude.toString() ?? "0")
			.replace("MARKER_COLOR", markerColor)
			.replace("ZOOM", zoom)
			.replace("KEY", props?.apiKey ?? "");
	};
	const className = () => {
		let _className = classNames("rce-mbox-location", props.className);

		if (props.text) {
			_className = classNames(_className, "rce-mbox-location-has-text");
		}

		return _className;
	};

	return (
		<div className="rce-container-lmsg">
			<a
				onClick={props.onOpen}
				target={target}
				href={
					props.href || props.src || buildURL(props.data?.mapURL || MAP_URL)
				}
				className={className()}
			>
				<img
					alt={props.alt}
					onError={props.onError}
					className="rce-mbox-location-img"
					src={props.src || buildURL(props.data?.staticURL || STATIC_URL)}
				/>
			</a>
			{props.text && (
				<div className="rce-mbox-text rce-mbox-location-text">{props.text}</div>
			)}
		</div>
	);
};

export default LocationMessage;
