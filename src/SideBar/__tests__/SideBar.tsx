import { describe, expect, it } from "vitest";
import React from "react";
import SideBar from "../SideBar";
import { render } from "@testing-library/react";

describe("Avatar component", () => {
	it("should render without issues", () => {
		const component = render(<SideBar />);
		expect(component.container).toBeTruthy();
		expect(component.container).toMatchSnapshot();
	});
});
