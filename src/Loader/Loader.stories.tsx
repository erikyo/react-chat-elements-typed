import type { Meta, StoryObj } from "@storybook/react";
import Loader from "./Loader";

const meta = {
	component: Loader,
} satisfies Meta<typeof Loader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		animate: true,
		progressOptions: {
			strokeWidth: 5,
			trailWidth: 5,
			easing: "easeInOut",
			duration: 2000,
			color: "#00d1b2",
		},
		className: "className",
		progress: 75,
	},
};

export const Bar: Story = {
	args: {
		type: "progress",
		animate: true,
		progressOptions: {
			strokeWidth: 5,
			trailWidth: 5,
			easing: "easeInOut",
			duration: 2000,
			color: "#00d1b2",
		},
		className: "className",
		progress: 80,
	},
};
