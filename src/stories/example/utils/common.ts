import { loremIpsum } from "lorem-ipsum";
import { createAvatar } from "@dicebear/core";
import { miniavs } from "@dicebear/collection";

/**
 * Returns a random avatar
 */
export const photo = () => {
	return getAvatar(loremIpsum({ count: 1, units: "words" }));
};

/**
 * Returns a random color
 */
export function getRandomColor() {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

/**
 * Returns a random token from 0 to 9
 */
export function token(base = 10): number {
	return Math.floor((Math.random() * base) % base);
}

/**
 * Returns an avatar based on a name or a seed
 * @param name the name of the avatar
 */
export function getAvatar(name?: string): string {
	const avatar = createAvatar(miniavs, {
		seed: name ?? loremIpsum({ count: 2, units: "words" }),
	});

	return avatar.toDataUri();
}

/**
 * Returns a random number between from and to with fixed precision
 * @param from starting number
 * @param to ending number
 * @param fixed precision
 */
export function getRandomInRange(
	from: number,
	to: number,
	fixed: number,
): string {
	return (Math.random() * (to - from) + from).toFixed(fixed);
}
