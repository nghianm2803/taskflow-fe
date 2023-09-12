import { fireEvent, render, screen } from "@testing-library/react";
import LoginPage from "../pages/LoginPage";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";

const MockPage = () => {
  return (
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );
};

describe("LoginPage", () => {
  it("Should render login button", () => {
    render(<MockPage />);
    const buttonElement = screen.getByText(/login/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it("Should render input element", async () => {
    render(<MockPage />);
    const inputElement = screen.getByLabelText(/email address/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("Should be able to type in input", async () => {
    render(<MockPage />);
    const inputElement = screen.getByLabelText(/email address/i);
    fireEvent.change(inputElement, { target: { value: "employee@gmail.com" } });
    expect(inputElement.value).toBe("employee@gmail.com");
  });
});

