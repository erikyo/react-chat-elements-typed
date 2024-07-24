import { describe, expect, it } from "vitest";
import React from "react";
import Navbar from "../Navbar";
import { render } from "@testing-library/react";

describe("Avatar component", () => {
	it("should render without issues", () => {
		const component = render(<Navbar />);
		expect(component.container).toBeTruthy();
		expect(component.container).toMatchSnapshot();
	});
});
