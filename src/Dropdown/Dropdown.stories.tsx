import type { Meta, StoryObj } from "@storybook/react";

import Dropdown from "./Dropdown";
import type { IDropdownProps } from "../types";
import { generateAvatar, generateDropDownItem } from "../stories/utils";

const meta = {
	component: Dropdown,
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template: IDropdownProps = {
	title: "Title",
	animationType: "nortwest",
	animationPosition: "default",
	items: [
		generateDropDownItem(1),
		generateDropDownItem(2),
		generateDropDownItem(3),
	],
	onSelect: (e) => {
		console.log(e);
	},
};

export const Default: Story = {
	args: Template,
};
