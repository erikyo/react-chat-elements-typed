import { describe, expect, it } from 'vitest'
import React, { Component } from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Input from "../Input";

describe("Input component", () => {
	it("should render without issues", () => {
		const component = shallow(<Input />);

		expect(component.length).toBe(1);
		expect(toJson(component)).toMatchSnapshot();
	});
});
