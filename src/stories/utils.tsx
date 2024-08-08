import type { IAvatarProps, IDropdownItem } from "../types";
import Avatar from "../Avatar/Avatar";
import { getAvatar } from "./example/utils/common";

export function generateAvatar(index = 0, { ...args } = {}): IAvatarProps {
	return {
		alt: "Avatar",
		className: "rce-avatar",
		type: "circle",
		src: getAvatar(index.toString()),
		size: "default",
		...args,
	};
}

export function generateDropDownItem(index: number): IDropdownItem {
	return {
		icon: {
			float: "left",
			color: "#000",
			size: 20,
			className: "rce-dropdown-item-icon",
			component: <Avatar {...generateAvatar(index)} />,
		},
		text: `Item ${index}`,
	};
}
