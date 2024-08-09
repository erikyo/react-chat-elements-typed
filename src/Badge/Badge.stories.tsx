import type { Meta, StoryObj } from "@storybook/react";
import Badge from "./Badge";
import "./Badge.css";
import Avatar from "../Avatar/Avatar";
import type { IBadgeProps } from "../types";
import { getAvatar, token } from "../stories/utils/common";

const BadgeExample = (props: IBadgeProps) => {
	return (
		<Avatar
			title={"John Doe"}
			avatar={token(2) > 1 ? getAvatar() : undefined}
			sideElement={<Badge {...props} />}
		/>
	);
};

const meta = {
	component: BadgeExample,
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		value: "10",
		className: "className",
		position: "top-right",
	},
};

export const Custom = {
	args: {
		value: "NEW",
		className: "className",
		position: "top-right",
		size: 9,
		rounded: false,
		color: "var(--rce-color-white)",
		backgroundColor: "#4bc07e",
		style: {
			padding: "4px",
			border: "1px solid #31a463",
		},
	},
};

export const Dot = {
	args: {
		value: "",
		backgroundColor: "var(--rce-color-green)",
		className: "className",
		position: "top-left",
	},
};
