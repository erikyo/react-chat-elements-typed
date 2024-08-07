import { describe, expect, it } from "vitest";
import React from "react";
import MeetingItem from "../MeetingItem";
import { render } from "@testing-library/react";

describe("MeetingItem component", () => {
	it("should render without issues", () => {
		const component = render(<MeetingItem />);

		expect(component.container).toBeTruthy();
		expect(
			component.container.querySelector(".rce-mtitem-body--functions"),
		).toBeTruthy();
		expect(component.container.querySelector(".rce-mtitem-date")).toBeTruthy();
	});
});
