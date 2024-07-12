import type React from "react";
import type { FC } from "react";
import "./SystemMessage.css";

import classNames from "classnames";
import type { ISystemMessageProps } from "../type";

const SystemMessage: FC<ISystemMessageProps> = (props): React.ReactElement => {
	return (
		<div className={classNames("rce-container-smsg", props.className)}>
			<div className="rce-smsg">
				<div className="rce-smsg-text">{props.text}</div>
			</div>
		</div>
	);
};

export default SystemMessage;
