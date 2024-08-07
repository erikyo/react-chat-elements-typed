import { describe, expect, it } from "vitest";
import React from "react";
import SpotifyMessage from "../SpotifyMessage";
import { render } from "@testing-library/react";

describe("Avatar component", () => {
	it("should render without issues", () => {
		const component = render(<SpotifyMessage />);
		expect(component.container).toBeTruthy();
		expect(component.container).toMatchSnapshot();
	});
});
