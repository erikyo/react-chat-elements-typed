import { type FC, type JSX, useEffect } from "react";
import "./Avatar.css";
import classNames from "classnames";
import type { IAvatarProps } from "../type";

const Avatar: FC<IAvatarProps> = ({
	type = "default",
	size = "default",
	lazyLoadingImage = undefined,
	...props
}): JSX.Element => {
	const loadedAvatars: string[] = [];
	let loading = false;
	let src = props.src;
	let isLazyImage = false;

	useEffect(() => {
		if (lazyLoadingImage) {
			isLazyImage = true;

			if (!isLoaded(src)) {
				src = lazyLoadingImage;

				if (!loading) {
					requestImage(props.src);
				}
			} else {
				isLazyImage = false;
			}
		}
	}, [loading, src, props.src, lazyLoadingImage, isLazyImage]);

	const isLoaded = (src: string) => {
		return loadedAvatars.indexOf(src) !== -1;
	};

	const requestImage = (src: string) => {
		loading = true;

		const loaded = () => {
			loadedAvatars.push(src);
			loading = false;
		};

		const img: HTMLImageElement = document.createElement("img");
		img.src = src;
		img.onload = loaded;
		img.onerror = loaded;
	};

	const stringToColour = (str: string) => {
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

	return (
		// @ts-ignore
		<div
			className={classNames(
				"rce-avatar-container",
				type,
				size,
				props.className,
			)}
		>
			{props.letterItem ? (
				<div
					className="rce-avatar-letter-background"
					style={{ backgroundColor: stringToColour(props.letterItem.id) }}
				>
					<span className="rce-avatar-letter">{props.letterItem.letter}</span>
				</div>
			) : (
				<img
					alt={props.alt}
					src={src}
					onError={props.onError}
					className={classNames("rce-avatar", {
						"rce-avatar-lazy": isLazyImage,
					})}
				/>
			)}
			{props.sideElement}
		</div>
	);
};
export default Avatar;
