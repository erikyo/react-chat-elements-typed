import { describe, expect, it } from "vitest";
import React from "react";
import MessageBox from "../MessageBox";
import { render } from "@testing-library/react";

describe("Avatar component", () => {
	it("should render without issues", () => {
		const component = render(<MessageBox status="read" />);
		expect(component.container).toBeTruthy();
		expect(component.container).toMatchSnapshot();
	});
});
