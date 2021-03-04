import { render, screen } from "@testing-library/react";
import HomePage from "../HomePage";

test("Welcome message is visible", () => {
  render(<HomePage />);

  const title = screen.getByRole("heading", {
    name: "Welcome to Mobx State Tree Course 🧑‍🏫 💻",
  });

  expect(title).toBeInTheDocument();
});
