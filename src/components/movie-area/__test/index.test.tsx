import * as React from "react";
import { act } from "react-dom/test-utils";
import { render } from "react-dom";
import { expect } from "chai";
import * as renderer from "react-test-renderer";
import MovieArea from "../index";

let container: JSXElement = null;
type JSXElement = Element | null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  container = null;
});

it("should render movie area", () => {
  const url = "test";
  act(() => {
    render(<MovieArea url={url} />, container);
  });
});

it("convert url props correctlly", () => {
  const url: string = "https://www.youtube.com/watch?v=test";
  const component = renderer.create(
    <MovieArea url={url} />,
  );
  const tree = component.toTree();
  console.log(tree?.rendered?.props.children.props.src);
  const expectedUrl = "https://www.youtube.com/embed/test";
  expect(tree?.rendered?.props.children.props.src).to.equal(expectedUrl);
});
