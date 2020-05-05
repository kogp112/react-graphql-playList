import * as React from "react";
import * as renderer from "react-test-renderer";
import TreeViewCategory from "../index";

let container: JSXElement = null;
type JSXElement = Element | null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  container = null;
});

it("should render tree view", () => {
  const onChange = jest.fn();
  const component = renderer
    .create(<TreeViewCategory handleClick={onChange} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});
