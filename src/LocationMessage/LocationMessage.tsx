import "./LocationMessage.css";
import classNames from "classnames";
import type { ILocationMessageProps } from "../types";
import type { FC, MouseEventHandler, ReactEventHandler } from "react";
import { STATIC_URL } from "../constants";
import { MapElement } from "./Map";

const LocationMessage: FC<ILocationMessageProps> = (props) => {
	const { latitude = "0", longitude = "0", zoom = "5" } = props;
	const buildURL = (url: string) => {
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
					onError={props.onError}
					className="rce-mbox-location-img h-full w-full"
					{...props}
				/>
			</a>
			{props.text && (
				<div className="rce-mbox-text rce-mbox-location-text">{props.text}</div>
			)}
		</div>
	);
};

export default LocationMessage;
