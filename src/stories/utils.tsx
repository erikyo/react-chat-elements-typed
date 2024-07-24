import type { IDropdownItem } from "../types";
import Avatar from "../Avatar/Avatar";

export function generateAvatar(index = 0) {
	return {
		alt: "Avatar",
		className: "rce-avatar",
		type: "circle",
		src: `https://i.pravatar.cc/300?img=${index}`,
		size: "lg",
		style: {
			width: 100,
			height: 100,
		},
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
