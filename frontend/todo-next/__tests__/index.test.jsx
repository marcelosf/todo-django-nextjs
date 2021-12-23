import { render, screen } from "@testing-library/react";
import Home from "../pages/index";

describe("Home", () => {
  it("renders the app bar", () => {
    render(<Home />);

    const appBar = screen.getByRole("banner");

    expect(appBar).toBeInTheDocument();
  });

  it("renders Todo List header text", () => {
    render(<Home />);

    const heading = screen.getByText(/Todo List/);

    expect(heading).toBeInTheDocument();
  });

  it("renders accordion list", () => {
    render(<Home />);

    const accordions = screen.getAllByRole("accordion");

    accordions.map((accordion) => {
      expect(accordion).toBeInTheDocument();
    });
  });
});
