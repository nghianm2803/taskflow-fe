import { render, screen } from "@testing-library/react";
import App from "../App";
import { Provider } from "react-redux";
import store from "../app/store";
import "@testing-library/jest-dom/extend-expect";


it("Taskflow App", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const buttonElement = screen.getByText(/login/i);
  expect(buttonElement).toBeInTheDocument();
});

