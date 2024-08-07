import type { FC } from "react";
import type { IAudioMessageProps } from "../types";
import "./AudioMessage.css";

const AudioMessage: FC<IAudioMessageProps> = (props) => {
	const controlsList = props.data?.controlsList ?? "nodownload";

	return (
		<div className={"rce-mbox-audio"} style={props.customStyle}>
			<audio {...props.audioProps} controls controlsList={controlsList}>
				<source
					src={props.data.audioURL}
					type={props.data?.audioType ?? "audio/mp3"}
				/>
				Your browser does not support the audio element.
			</audio>
			{props.text && <div className="rce-mbox-text">{props.text}</div>}
		</div>
	);
};

export default AudioMessage;
