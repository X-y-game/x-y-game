import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { screen, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Channels from "../Container";
import server from "./mocks/server";

describe("Channels ", () => {
  let channels = [];
  beforeEach(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it("display channels from the server ", async () => {
    const history = createMemoryHistory();
    const route = "/channel";
    history.push(route);

    render(
      <Router history={history}>
        <Channels channels={channels} />
      </Router>
    );
    const pageTitle = screen.getByText("채널을 선택하세요");
    expect(pageTitle).toBeVisible();

    const channel = await waitFor(() => screen.getByText("테스트 채널 3"));
    expect(channel).toBeVisible();
  });
});
