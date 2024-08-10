import type { StoryObj } from "@storybook/react";

import Dropdown from "./Dropdown";
import type { IDropdownProps } from "../types";
import { generateDropDownItem } from "../stories/utils";
import { IoOpenOutline } from "react-icons/io5";

const meta = {
	component: Dropdown,
};

export default meta;

type Story = StoryObj<typeof meta>;

const Template: IDropdownProps = {
	buttonProps: {
		icon: {
			component: <IoOpenOutline />,
			float: "left",
			size: 22,
		},
		squared: true,
		outlined: true,
		text: "Click to open the Dropdown",
	},
	animationType: "northwest",
	animationPosition: "default",
	items: [
		generateDropDownItem(1),
		generateDropDownItem(2),
		generateDropDownItem(3),
	],
	style: {
		maxWidth: "200px",
	},
};

export const Default = {
	args: Template,
};
