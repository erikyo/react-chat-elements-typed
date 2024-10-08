import { describe, expect, it } from "vitest";
import React from "react";
import Button from "../Button";
import { render } from "@testing-library/react";

describe("Avatar component", () => {
	it("should render without issues", () => {
		const component = render(<Button />);
		expect(component.container).toBeTruthy();
		expect(component.container).toMatchSnapshot();
	});
});
