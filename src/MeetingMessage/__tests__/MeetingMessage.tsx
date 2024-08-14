import { describe, expect, it } from "vitest";
import React from "react";
import MeetingMessage from "../MeetingMessage";
import { render } from "@testing-library/react";

describe("Avatar component", () => {
	it("should render without issues", () => {
		const component = render(
			<MeetingMessage
				type={"text"}
				text={"ciao"}
				date={new Date("2050-01-01")}
				dateString={"now"}
			/>,
		);
		expect(component.container).toBeTruthy();
		expect(component.container).toMatchSnapshot();
	});
});
