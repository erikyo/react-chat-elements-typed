import type { Meta } from "@storybook/react";

import Button from "./Button";
import { IconEmoji } from "../SvgIcon/IconEmoji";
import { IconPlus } from "../SvgIcon/IconPlus";

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
		onClick: () => console.log("clicked"),
	},
};

export const Disabled = {
	args: {
		text: "Disabled",
		disabled: true,
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
		text: "Icon",
		icon: {
			component: <IconPlus />,
			float: "left",
			name: "chat",
		},
		backgroundColor: "var(--rce-color-purple)",
	},
};

export const Icon = {
	args: {
		icon: {
			component: <IconEmoji />,
			name: "chat",
		},
		circle: true,
		backgroundColor: "var(--rce-color-light-blue)",
	},
};
