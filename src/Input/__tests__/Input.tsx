import { describe, expect, it } from "vitest";
import React from "react";
import Input from "../Input";
import { render } from "@testing-library/react";

describe("Avatar component", () => {
	it("should render without issues", () => {
		const component = render(<Input />);
		expect(component.container).toBeTruthy();
		expect(component.container).toMatchSnapshot();
	});
});
