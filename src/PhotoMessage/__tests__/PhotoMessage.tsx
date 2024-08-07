import { describe, expect, it } from "vitest";
import React from "react";
import PhotoMessage from "../PhotoMessage";
import { render } from "@testing-library/react";

describe("Avatar component", () => {
	it("should render without issues", () => {
		const component = render(<PhotoMessage />);
		expect(component.container).toBeTruthy();
		expect(component.container).toMatchSnapshot();
	});
});
