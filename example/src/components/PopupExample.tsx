import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Button, Popup } from "react-chat-elements-typed";

function PopupExample() {
	const [show, setShow] = useState<boolean>(false);
	return (
		<div className="">
			{" "}
			<Popup
				popup={{
					show: show,
					header: "Lorem ipsum dolor sit amet.",
					headerButtons: [
						{
							color: "black",
							onClick: () => {
								setShow(false);
							},
							icon: {
								component: <FaTimes />,
								size: 18,
							},
						},
					],
					text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem animi veniam voluptas eius!",
					footerButtons: [
						{
							color: "white",
							backgroundColor: "#ff5e3e",
							text: "Vazgeç",
							onClick: () => {
								setShow(false);
							},
						},
						{
							color: "white",
							backgroundColor: "lightgreen",
							text: "Tamam",
							onClick: () => {
								setShow(false);
							},
						},
					],
				}}
			/>
			<Button
				text="Show Popup"
				onClick={() => {
					setShow(true);
				}}
			/>
		</div>
	);
}

export default PopupExample;
