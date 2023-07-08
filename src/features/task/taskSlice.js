import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { TASKS_PER_PAGE } from "../../app/config";
import { getCurrentUserProfile } from "../user/userSlice";

const initialState = {
  isLoading: false,
  error: null,
  tasksList: [],
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
      state.tasksList = [];
    },

    getTasksSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { taskList } = action.payload.data;

      state.tasksList = taskList.map((task) => ({
        ...task,
        projectTo: task.projectTo,
      }));
    },

    createTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newTask = action.payload.data;
      state.tasksList.unshift(newTask);
    },
  },
});

export const getTasks =
  ({ projectId, page = 1, limit = TASKS_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      const response = await apiService.get("/task", { params });
      console.log("getTasks - response:", response.data);
      dispatch(slice.actions.getTasksSuccess(response.data));
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
