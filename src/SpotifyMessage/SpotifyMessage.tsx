import type { FC } from "react";
import type React from "react";
import type { ISpotifyMessageProps } from "../types";
import "./SpotifyMessage.css";

const SpotifyMessage: FC<ISpotifyMessageProps> = ({
	width = 300,
	height = 380,
	...props
}) => {
	const toUrl = (): string => {
		const formBody: string[] | string = [];
		for (const property in props) {
			const encodedKey = encodeURIComponent(property);
			// @ts-ignore
			const encodedValue = encodeURIComponent(props[property]);
			formBody.push(`${encodedKey}=${encodedValue}`);
		}

		return formBody.join("&");
	};

	if (!props.uri) return null;
	return (
		<div className="rce-mbox-spotify">
			<iframe
				title={"Spotify"}
				src={`https://open.spotify.com/embed?${toUrl()}`}
				width={width}
				height={height}
			/>
		</div>
	);
};

export default SpotifyMessage;
