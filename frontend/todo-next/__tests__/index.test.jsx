import { render, screen } from "@testing-library/react";
import Home from "../pages/index";

describe("Home", () => {
  const tasks = [
    { id: 1, name: "Limpar o forno", date: "2021-10-31", status: false },
    { id: 2, name: "Fazer o jantar", date: "2021-11-01", status: false },
    { id: 3, name: "Fazer o jantar", date: "2021-11-01", status: true },
  ];

  it("renders the app bar", () => {
    render(<Home tasks={tasks} />);

    const appBar = screen.getByRole("banner");

    expect(appBar).toBeInTheDocument();
  });

  it("renders Todo List header text", () => {
    render(<Home tasks={tasks} />);

    const heading = screen.getByText(/Todo List/);

    expect(heading).toBeInTheDocument();
  });

  it("renders accordion list", () => {
    render(<Home tasks={tasks} />);

    const accordions = screen.getAllByRole("accordion");

    accordions.map((accordion) => {
      expect(accordion).toBeInTheDocument();
    });
  });
});
