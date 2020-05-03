import React from "react";
import { act } from "react-dom/test-utils";
import { render, unmountComponentAtNode } from "react-dom";
import MovieArea from "../index";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('should render movie area', () => {
  const url = "test";
  act(() => {
    render(<MovieArea url={url} />, container);
  });
});