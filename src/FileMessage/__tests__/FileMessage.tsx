import React, { Component } from "react";
import { shallow } from "enzyme";
import { describe, expect, it } from 'vitest'
import toJson from "enzyme-to-json";
import FileMessage from "../FileMessage";

describe("FileMessage component", () => {
	it("should render without issues", () => {
		const component = shallow(<FileMessage />);

		expect(component.length).toBe(1);
		expect(toJson(component)).toMatchSnapshot();
	});
});
