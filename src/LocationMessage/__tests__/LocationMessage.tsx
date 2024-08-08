import { describe, expect, it } from "vitest";
import React from "react";
import LocationMessage from "../LocationMessage";
import { render } from "@testing-library/react";

describe("Avatar component", () => {
	it("should render without issues", () => {
		const component = render(
			<LocationMessage
				latitude={"15"}
				longitude={"44"}
				date={new Date()}
				type={"location"}
				text={"ciao"}
			/>,
		);
		expect(component.container).toBeTruthy();
		expect(
			component.container.querySelector(".rce-mbox-location"),
		).toBeTruthy();
	});
});
