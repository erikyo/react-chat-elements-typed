import type { Meta } from "@storybook/react";

import Button from "./Button";
import { IconEmoji } from "../SvgIcon/IconEmoji";
import { IconPlus } from "../SvgIcon/IconPlus";
import { IconMic } from "../SvgIcon/IconMic";

const meta = {
	component: Button,
} satisfies Meta<typeof Button>;

export default meta;

export const Default = {
	args: {
		text: "Simple",
		backgroundColor: "var(--rce-color-secondary)",
		onClick: () => console.log("clicked"),
	},
};

export const Outlined = {
	args: {
		text: "Outlined",
		backgroundColor: "var(--rce-color-secondary)",
		color: "var(--rce-color-white)",
		outlined: true,
		borderWidth: 2,
		onClick: () => console.log("clicked"),
	},
};

export const Disabled = {
	args: {
		text: "Disabled",
		disabled: true,
	},
};

export const Link = {
	args: {
		text: "Link Button",
		link: true,
	},
};

export const IconButton = {
	args: {
		text: "Icon",
		icon: {
			component: <IconEmoji />,
			name: "chat",
		},
		backgroundColor: "var(--rce-color-green)",
	},
};

export const ButtonWithIconOnLeftSide = {
	args: {
		text: "With Icon",
		icon: {
			component: <IconMic />,
			float: "left",
			name: "chat",
		},
		backgroundColor: "var(--rce-color-green)",
	},
};

export const Icon = {
	args: {
		icon: {
			component: <IconEmoji />,
			name: "chat",
		},
		circle: true,
		backgroundColor: "var(--rce-color-red)",
	},
};
