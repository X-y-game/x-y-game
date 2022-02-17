import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./index.js";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import renderer from "react-test-renderer";

describe("Home ", () => {
  it("renders", () => {
    const history = createMemoryHistory();
    const component = renderer.create(<Home history={history} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe("Start button clicked", () => {
    const history = createMemoryHistory();

    beforeEach(() => {
      render(
        <Router history={history}>
          <Home history={history} />
        </Router>
      );
    });

    it(" move to `/channel` route when button is clicked", () => {
      const button = screen.getByText("Start");
      userEvent.click(button);

      expect(history.location.pathname).toBe("/channel");
    });
  });
});
