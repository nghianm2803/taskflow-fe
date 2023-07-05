import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import projectReducer from "../features/project/projectSlice";

const rootReducer = combineReducers({
  user: userReducer,
  project: projectReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
