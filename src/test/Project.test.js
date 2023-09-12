import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import ProjectList from "../features/project/ProjectList";
import projectReducer from "../features/project/projectSlice";

const rootReducer = combineReducers({
  project: projectReducer,
});
const mockStore = configureStore({ reducer: rootReducer });

// Mock the useAuth hook to return a user object with the role property
jest.mock("../hooks/useAuth", () => ({
  __esModule: true,
  default: () => ({
    user: {
      role: "Manager",
    },
  }),
}));

const MockProjectsList = () => {
  return (
    <BrowserRouter>
      <Provider store={mockStore}>
        <ProjectList />
      </Provider>
    </BrowserRouter>
  );
};

describe("Project List", () => {
  it("Should render buttons in project list", async () => {
    render(<MockProjectsList />);
   
    const buttonAddProjectElement = screen.getByText(/create new project/i);
    expect(buttonAddProjectElement).toBeInTheDocument();
  
  });

});

