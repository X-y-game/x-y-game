import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Home from "../Home";

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
