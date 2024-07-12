import { describe, expect, it } from "vitest";
import React from "react";
import LocationMessage from "../LocationMessage";
import { render } from "@testing-library/react";

describe("Avatar component", () => {
	it("should render without issues", () => {
		const component = render(<LocationMessage />);
		expect(component.container).toBeTruthy();
		expect(
			component.container.querySelector(".rce-mbox-location"),
		).toBeTruthy();
	});
});
