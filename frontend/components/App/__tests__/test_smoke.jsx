import React from "react";
import { render, cleanup } from "react-testing-library";
import { MemoryRouter } from "react-router";
import App from "../index";

afterEach(cleanup);

describe("<App/> test basic routes", () => {
  it("should render route /", () => {
    const fn = () =>
      render(
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>,
      );
    expect(fn).not.toThrow();
  });
  it("should render route /stats", () => {
    const fn = () =>
      render(
        <MemoryRouter initialEntries={["/stats"]}>
          <App />
        </MemoryRouter>,
      );
    expect(fn).not.toThrow();
  });
  it("should render route /inspect", () => {
    const fn = () =>
      render(
        <MemoryRouter initialEntries={["/inspect"]}>
          <App />
        </MemoryRouter>,
      );
    expect(fn).not.toThrow();
  });
});
