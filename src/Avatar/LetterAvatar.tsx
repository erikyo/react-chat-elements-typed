import type { FC } from "react";
import type { IAvatarProps } from "../types";
import type { ILetterItem } from "../types";

/**
 * Convert string to a random colour
 * @param str The string to convert
 * @return string The random colour
 */
export const stringToColor = (str: string): string => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	let colour = "#";
	for (let i = 0; i < 3; i++) {
		let value: number = (hash >> (i * 8)) & 0xff;
		value = (value % 150) + 50;
		colour += `00${value.toString(16)}`.substr(-2);
	}
	return colour;
};

/**
 * Returns the first two letters of the name
 * @param letterItem The ILetterItem to get the name from
 * @param title The title to get the name from (used as fallback)
 */
export function getAvatarLetters(
	letterItem: ILetterItem | undefined,
	title: string | undefined,
) {
	let name = "U";
	if (letterItem?.letter) {
		name = letterItem.letter;
	}
	if (title) {
		name = title;
	}
	return name
		.toUpperCase()
		.split(" ")
		.map((w) => w[0])
		.slice(0, 2)
		.join("");
}

export const LetterAvatar: FC<IAvatarProps> = (props) => {
	return (
		<div
			className={"rce-avatar rce-avatar-letter-background"}
			style={{
				backgroundColor: stringToColor(
					props.letterItem?.id ?? props?.title ?? "unknown",
				),
			}}
		>
			<svg
				role={"img"}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 50 50"
				className="rce-avatar-letter"
			>
				<text
					fill={"white"}
					fontSize="25"
					x="50%"
					y="50%"
					dominantBaseline="central"
					textAnchor="middle"
				>
					{getAvatarLetters(props?.letterItem, props?.title)}
				</text>
			</svg>
		</div>
	);
};
