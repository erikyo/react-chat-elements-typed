import type { StoryObj } from "@storybook/react";
import React, { useState } from "react";
import Popup from "./Popup";
import Button from "../Button/Button";
import type { IPopup } from "../types";
import { FaTimes } from "react-icons/fa";
import { loremIpsum } from "lorem-ipsum";

const Template = {
	header: loremIpsum({ count: 2, units: "words" }),
	text: loremIpsum({ count: 2, units: "sentence" }),
} as IPopup;

const PopupExample = () => {
	const [show, setShow] = useState<boolean>(false);
	return (
		<>
			<Popup
				popup={{
					...Template,
					headerButtons: [
						{
							color: "black",
							backgroundColor: "transparent",
							onClick: () => {
								setShow(false);
							},
							icon: {
								backgroundColor: "transparent",
								component: <FaTimes />,
								size: 18,
							},
						},
					],
					footerButtons: [
						{
							color: "white",
							backgroundColor: "#ff5e3e",
							text: "No",
							onClick: () => {
								setShow(false);
							},
						},
						{
							color: "white",
							backgroundColor: "green",
							text: "Yes",
							onClick: () => {
								setShow(false);
							},
						},
					],
				}}
				show={show}
			/>
			<Button
				text="Show Popup"
				onClick={() => {
					setShow(true);
				}}
			/>
		</>
	);
};

const meta = {
	component: PopupExample,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: { popup: Template },
};
