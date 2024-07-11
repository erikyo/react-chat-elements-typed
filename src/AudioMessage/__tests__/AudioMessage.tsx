import React, { Component } from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import AudioMessage from "../AudioMessage";
import { describe, expect, it } from "vitest";

describe("AudioMessage component", () => {
	it("should render without issues", () => {
		const component = shallow(<AudioMessage />);
		expect(component.length).toBe(1);
		expect(toJson(component)).toMatchSnapshot();
	});
});
