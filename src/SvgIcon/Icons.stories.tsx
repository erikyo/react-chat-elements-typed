import type { Meta, StoryObj } from "@storybook/react";
import SVG from "./icons";
import { IconMic } from "./IconMic";
import { IconEmoji } from "./IconEmoji";
import { IconPlus } from "./IconPlus";
import { IconSend } from "./IconSend";
import { ArrowRight } from "./arrowRight";
import { ArrowLeft } from "./arrowLeft";
import { LeftNotch } from "./leftNotch";
import { RightNotch } from "./rightNotch";

const meta = {
	component: SVG,
} satisfies Meta<typeof SVG>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		children: (
			<path
				fill="currentColor"
				d="M12 5.881A5.39 5.39 0 0 1 16.05 4C18.822 4 21 6.178 21 8.95c0 3.4-3.055 6.17-7.684 10.367l-.011.01L12 20.515l-1.305-1.179-.036-.032C6.044 15.11 3 12.344 3 8.95 3 6.178 5.178 4 7.95 4A5.39 5.39 0 0 1 12 5.881Z"
			/>
		),
		style: {
			width: "96px",
			height: "96px",
		},
	},
	render: (args) => {
		return <SVG {...args}>{args.children}</SVG>;
	},
};

export const inputBarRelated = {
	args: {},
	render: (args) => {
		return (
			<div className={"flex flex-col gap-2"}>
				<p>
					<IconEmoji style={{ color: "red" }} /> IconEmoji
				</p>
				<p>
					<IconMic style={{ color: "green" }} /> IconMic
				</p>
				<p>
					<IconPlus style={{ color: "orange" }} /> IconPlus
				</p>
				<p>
					<IconSend style={{ color: "#333" }} /> IconSend
				</p>
				<p>
					<ArrowRight /> ArrowRight
				</p>
				<p>
					<ArrowLeft /> ArrowLeft
				</p>
				<p>
					<LeftNotch /> LeftNotch
				</p>
				<p>
					<RightNotch /> RightNotch
				</p>
			</div>
		);
	},
};
