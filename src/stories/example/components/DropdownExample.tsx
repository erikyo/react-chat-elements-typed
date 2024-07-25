import { FaSquare } from "react-icons/fa";
import { MdOutlineMoreVert } from "react-icons/md";
import Dropdown from "../../../Dropdown/Dropdown";

function DropdownExample() {
	return (
		<div>
			<Dropdown
				onSelect={(e) => {
					console.log(e);
				}}
				animationPosition="norteast"
				title="Dropdown Title"
				buttonProps={{
					type: "button",
					color: "#929292",
					icon: {
						component: <MdOutlineMoreVert />,
						size: 24,
					},
				}}
				items={[
					{
						icon: {
							component: <FaSquare />,
							float: "left",
							size: 22,
						},
						text: "Menu Item",
					},
					{
						icon: {
							component: <FaSquare />,
							float: "left",
							color: "purple",
							size: 22,
						},
						text: "Menu Item",
					},
					{
						icon: {
							component: <FaSquare />,
							float: "left",
							color: "yellow",
							size: 22,
						},
						text: "Menu Item",
					},
				]}
			/>
		</div>
	);
}

export default DropdownExample;
