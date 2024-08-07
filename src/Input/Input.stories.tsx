import type { Meta } from "@storybook/react";
import Input from "./Input";
import type { IInputProps } from "../types";
import { IconEmoji } from "../SvgIcon/IconEmoji";
import { IconPlus } from "../SvgIcon/IconPlus";
import { IconSend } from "../SvgIcon/IconSend";

const meta = {
	component: Input,
} satisfies Meta<typeof Input>;

export default meta;

export const Default = {
	args: {
		multiline: false,
		autoHeight: true,
		leftButtons: (
			<div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
				<IconEmoji style={{ color: "#566570" }} />
				<IconPlus style={{ color: "#566570" }} />
			</div>
		),
		rightButtons: (
			<div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
				<IconSend style={{ color: "#566570" }} />
			</div>
		),
	} as IInputProps,
};
