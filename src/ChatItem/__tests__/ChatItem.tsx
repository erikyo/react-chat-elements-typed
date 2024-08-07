import { describe, expect, it } from "vitest";
import React from "react";
import ChatItem from "../ChatItem";
import { render } from "@testing-library/react";

describe("Avatar component", () => {
	it("should render without issues", () => {
		const component = render(<ChatItem />);
		expect(component.container).toBeTruthy();
		expect(
			component.container.querySelector(".rce-container-citem"),
		).toBeTruthy();
	});
});
