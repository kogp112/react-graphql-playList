import * as React from "react";
import { act } from "react-dom/test-utils";
import { render } from "react-dom";
import { expect } from "chai";
import * as renderer from "react-test-renderer";
import PlayList from "../index";

let container: JSXElement = null;
type JSXElement = Element | null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  container = null;
});

it("should render play list", () => {
  const onChange = jest.fn();
  const list = {
    name: "90sPunk",
    songs: [
      {
        imageUrl: "https://img.youtube.com/vi/fWtFpYcgRFs/0.jpg",
        name: "Tilt - Fool To Blame",
        url: "https://www.youtube.com/watch?v=fWtFpYcgRFs",
      },
      {
        imageUrl: "https://img.youtube.com/vi/fWtFpYcgRFs/0.jpg",
        name: "Tilt - Fool To Blame",
        url: "https://www.youtube.com/watch?v=fWtFpYcgRFs",
      },
      {
        imageUrl: "https://img.youtube.com/vi/fWtFpYcgRFs/0.jpg",
        name: "Tilt - Fool To Blame",
        url: "https://www.youtube.com/watch?v=fWtFpYcgRFs",
      },
    ],
  };
  act(() => {
    render(<PlayList list={list} handleClickPlayList={onChange} />, container);
  });
});

