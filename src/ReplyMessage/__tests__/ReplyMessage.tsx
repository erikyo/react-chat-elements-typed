import { describe, expect, it } from "vitest";
import React from "react";
import ReplyMessage from "../ReplyMessage";
import { render } from "@testing-library/react";

describe("Avatar component", () => {
	it("should render without issues", () => {
		const component = render(<ReplyMessage />);
		expect(component.container).toBeTruthy();
		expect(component.container).toMatchSnapshot();
	});
});
