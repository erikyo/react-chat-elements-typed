import { describe, expect, it } from "vitest";
import React from "react";
import ChatList from "../ChatList";
import { render } from "@testing-library/react";

describe("Avatar component", () => {
	it("should render without issues", () => {
		const component = render(<ChatList />);
		expect(
			component.container.querySelectorAll(".rce-container-clist").length,
		).toBeTruthy();
		expect(component.container).toMatchSnapshot();
	});
});
