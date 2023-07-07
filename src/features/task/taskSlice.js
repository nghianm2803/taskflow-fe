import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { TASKS_PER_PAGE } from "../../app/config";
import { getCurrentUserProfile } from "../user/userSlice";

const initialState = {
  isLoading: false,
  error: null,
  task: [],
  projectTo: {},
};

const slice = createSlice({
  name: "task",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    resetTasks(state, action) {
      state.task = {};
      state.currentPageTasks = [];
    },

    getTasksSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { projectId, tasks } = action.payload;

      tasks.forEach((task) => (state.task = task));
      state.projectTo[projectId] = tasks.map((task) => task._id).reverse();
    },

    createTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newTask = action.payload;
      if (state.currentPageTasks.length % TASKS_PER_PAGE === 0)
        state.currentPageTasks.pop();
      state.task = newTask;
      state.currentPageTasks.unshift(newTask._id);
    },
  },
});

export const getTasks =
  ({ projectId, page = 1, limit = TASKS_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      const response = await apiService.get("/task", {
        params,
      });
      dispatch(slice.actions.getTasksSuccess(...response.data, projectId));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const createTask =
  ({ content }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/task", {
        content,
      });
      dispatch(slice.actions.createTaskSuccess(response.data));
      toast.success("Create task successfully");
      dispatch(getCurrentUserProfile());
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export default slice.reducer;
