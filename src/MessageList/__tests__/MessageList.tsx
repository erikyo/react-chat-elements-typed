import { describe, expect, it } from "vitest";
import React from "react";
import MessageList from "../MessageList";
import { render } from "@testing-library/react";

describe("Avatar component", () => {
	it("should render without issues", () => {
		const component = render(<MessageList />);
		expect(component.container).toBeTruthy();
		expect(component.container).toMatchSnapshot();
	});
});
