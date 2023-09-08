import { fireEvent, render, screen } from "@testing-library/react";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";

describe("LoginPage", () => {
  it("Should render login button", () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    const buttonElement = screen.getByText(/login/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it("Should render input element", async () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    const inputElement = screen.getByLabelText(/email address/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("Should be able to type in input", async () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    const inputElement = screen.getByLabelText(/email address/i);
    fireEvent.change(inputElement, { target: { value: "employee@gmail.com" } });
    expect(inputElement.value).toBe("employee@gmail.com");
  });

  // it("Should be redirected to home page", async () => {
  //   render(
  //     <BrowserRouter>
  //       <LoginPage />
  //       <HomePage />
  //     </BrowserRouter>
  //   );
  //   const inputEmailElement = screen.getByLabelText(/email address/i);
  //   const inputPasswordElement = screen.getByLabelText(/password/i);
  //   const buttonElement = screen.getByRole("button", { name: /login/i });
  //   fireEvent.change(inputEmailElement, {
  //     target: { value: "employee@gmail.com" },
  //   });
  //   fireEvent.change(inputPasswordElement, { target: { value: "123" } });
  //   fireEvent.click(buttonElement);

  //   // Wait for the redirect to the home page
  //   await screen.findByTestId("home-page");

  //   expect(window.location.href).toEqual("http://localhost:3000/");
  // });
});

