import { describe, expect, it } from "vitest";
import React from "react";
import Avatar from "../Avatar";
import { render } from "@testing-library/react";

describe("Avatar component", () => {
	it("should render without issues", () => {
		const component = render(<Avatar />);
		expect(component.container).toBeTruthy();
		expect(component.container).toMatchSnapshot();
	});
});
