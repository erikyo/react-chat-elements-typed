import { describe, expect, it } from "vitest";
import React from "react";
import AudioMessage from "../AudioMessage.js";
import { render } from "@testing-library/react";

describe("AudioMessage component", () => {
	it("should render without issues", () => {
		const component = render(<AudioMessage data={{ audioURL: "test" }} />);
		expect(component.container).toBeTruthy();
		expect(component.container).toMatchSnapshot();
	});
});
