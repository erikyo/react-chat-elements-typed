import { describe, expect, it } from "vitest";
import React from "react";
import Popup from "../Popup";
import { render } from "@testing-library/react";

describe("Avatar component", () => {
	it("should render without issues", () => {
		const component = render(<Popup show={true} />);
		expect(component.container).toBeTruthy();
		expect(component.container).toMatchSnapshot();
	});
});
