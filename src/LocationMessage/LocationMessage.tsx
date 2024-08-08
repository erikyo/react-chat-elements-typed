import "./LocationMessage.css";
import classNames from "classnames";
import type { ILocationMessageProps } from "../types";
import type { FC } from "react";
import { STATIC_URL } from "../constants";
import { MapElement } from "./Map";

const LocationMessage: FC<ILocationMessageProps> = (props) => {
	const buildURL = (url: string) => {
		const latitude = props?.latitude ?? "0";
		const longitude = props?.longitude ?? "0";
		const zoom = props?.zoom ?? "14";

		return url
			.replace(/LATITUDE/g, latitude)
			.replace(/LONGITUDE/g, longitude)
			.replace("MARKER_COLOR", props?.markerColor ?? "red")
			.replace("ZOOM", zoom);
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
				target={props.target ?? "_blank"}
				href={props.href || props.src || buildURL(props?.mapURL || STATIC_URL)}
				className={className()}
			>
				<MapElement
					latitude={props?.latitude ?? "0"}
					longitude={props?.longitude ?? "0"}
					zoom={props?.zoom}
					onError={props.onError}
					className="rce-mbox-location-img h-full w-full"
				/>
			</a>
			{props.text && (
				<div className="rce-mbox-text rce-mbox-location-text">{props.text}</div>
			)}
		</div>
	);
};

export default LocationMessage;
