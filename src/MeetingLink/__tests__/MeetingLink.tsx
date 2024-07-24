import { describe, expect, it } from "vitest";
import React from "react";
import MeetingLink from "../MeetingLink";
import { render } from "@testing-library/react";

describe("Avatar component", () => {
	it("should render without issues", () => {
		const component = render(<MeetingLink status="read" />);
		expect(component.container).toBeTruthy();
		expect(component.container).toMatchSnapshot();
	});
});
