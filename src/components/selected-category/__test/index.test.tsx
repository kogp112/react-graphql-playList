import * as React from "react";
import * as renderer from "react-test-renderer";
import SelectedCategory from "../index";

let container: JSXElement = null;
type JSXElement = Element | null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  container = null;
});

it("should render selected category", () => {
  const onChange = jest.fn();
  const genres = ["Rock", "Punk", "Acidhouse", "Ambientmusic"];

  const component = renderer
  .create(<SelectedCategory genres={genres} handleClick={onChange} />)
  .toJSON();
  expect(component).toMatchSnapshot();
});
