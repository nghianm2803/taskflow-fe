import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

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

      state.tasksList = taskList.filter(
        (task) => task.projectTo._id === action.payload.projectId
      );
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
  ({ projectId, limit }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`/task?limit=${limit}`);
      dispatch(slice.actions.getTasksSuccess(response.data, projectId));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const createTask = (data) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post("/task", data);
    const createdTask = response.data;
    dispatch(slice.actions.createTaskSuccess(createdTask));
    toast.success("Task created successfully");
    return createdTask;
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
    throw error;
  }
};

export const addTaskToProject =
  ({ taskId, projectId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await apiService.put(`/task/${taskId}/project/${projectId}`);
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export default slice.reducer;
