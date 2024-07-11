import React, { Component } from "react";
import { describe, expect, it } from "vitest";
import ChatList from "../ChatList";
import { render } from "@testing-library/react";

describe("ChatList component", () => {
	it("should render without issues", () => {
		render(<ChatList />);

		expect(screen.get("rce-container-clist").length).toBe(1);
		expect(screen.getbyClass("rce-container-clist")).toMatchSnapshot();
	});
});
