import type { StoryObj } from "@storybook/react";
import React, { useState } from "react";
import Popup from "./Popup";
import Button from "../Button/Button";
import type { IPopup } from "../types";
import { MdClose } from "react-icons/md";
import { loremIpsum } from "lorem-ipsum";

const Template = {
	header: loremIpsum({ count: 2, units: "words" }),
	text: loremIpsum({ count: 4, units: "sentence" }),
	wrapperColor: "rgb(0 0 0 / 75%)",
} as IPopup;

const PopupExample = () => {
	const [show, setShow] = useState<boolean>(false);
	return (
		<div style={{ margin: "45vh" }}>
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
								component: <MdClose color={"var(--rce-color-gray)"} />,
								size: 24,
							},
						},
					],
					footerButtons: [
						{
							color: "white",
							backgroundColor: "var(--rce-color-gray)",
							text: "No",
							squared: true,
							outlined: true,
							onClick: () => {
								setShow(false);
							},
						},
						{
							color: "white",
							backgroundColor: "var(--rce-color-primary)",
							text: "Yes",
							squared: true,
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
		</div>
	);
};

const meta = {
	component: PopupExample,
	parameters: {
		layout: "fullscreen",
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: { popup: Template },
};
