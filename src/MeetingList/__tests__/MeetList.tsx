import { describe, expect, it } from "vitest";
import React from "react";
import MeetingList from "../MeetingList.js";
import { render } from "@testing-library/react";

describe("Avatar component", () => {
	it("should render without issues", () => {
		const component = render(<MeetingList />);
		expect(component.container).toBeTruthy();
		expect(component.container).toMatchSnapshot();
	});
});
