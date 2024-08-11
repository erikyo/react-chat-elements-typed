import type { IAvatarProps, IDropdownItem } from "../../types";
import { getAvatar } from "./common";
import Avatar from "../../Avatar/Avatar";
import { loremIpsum } from "lorem-ipsum";

export function generateAvatar(props: IAvatarProps): IAvatarProps {
	/**
	 * Prepare fake username if not provided
	 */
	const avatarProps = {
		...props,
		title: props?.title ?? loremIpsum({ count: 2, units: "words" }),
	};
	return {
		alt: avatarProps.title,
		className: "rce-avatar",
		src: getAvatar(avatarProps.title),
		size: "default",
		...avatarProps,
	};
}

export function generateDropDownItem(name: string | undefined): IDropdownItem {
	const userName = name ?? loremIpsum({ count: 2, units: "words" });
	return {
		icon: {
			float: "left",
			size: 20,
			className: "rce-dropdown-item-icon",
			component: <Avatar {...generateAvatar({ title: userName })} />,
		},
		text: `Item ${userName}`,
	};
}
