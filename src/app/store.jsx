import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import projectReducer from "../features/project/projectSlice";
import taskReducer from "../features/task/taskSlice";
import commentReducer from "../features/comment/commentSlice";
import notificationReducer from "../features/notification/notificationSlice";

const rootReducer = combineReducers({
  user: userReducer,
  project: projectReducer,
  task: taskReducer,
  comment: commentReducer,
  notification: notificationReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
