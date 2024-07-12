import { describe, expect, it } from "vitest";
import React from "react";
import Dropdown from "../Dropdown";
import { render } from "@testing-library/react";

describe("Avatar component", () => {
	it("should render without issues", () => {
		const component = render(<Dropdown />);
		expect(component.container).toBeTruthy();
		expect(component.container).toMatchSnapshot();
	});
});
