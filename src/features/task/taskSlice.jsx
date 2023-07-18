import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  tasksList: [],
  projectTo: {},
  updatedTask: {},
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
        (task) =>
          task.projectTo._id === action.payload.projectId && !task.isDeleted
      );
    },
    getSingleTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const currentTask = action.payload.data;
      state.currentTask = currentTask;
    },
    createTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newTask = action.payload.data;
      state.tasksList.unshift(newTask);
    },
    updateTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const updatedTask = action.payload.data;
      state.updatedTask = updatedTask;
    },
    assignTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const currentTask = action.payload.data;
      state.currentTask = currentTask;
    },
    deleteTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { id } = action.payload.data;
      state.tasksList = state.tasksList.filter((task) => task._id !== id);
    },
  },
});

export const getTasks =
  ({ projectId, limit, filterBy, filterValue }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { limit };
      if (filterBy && filterValue) {
        params[filterBy] = filterValue;
      }
      const response = await apiService.get(`/tasks?limit=${limit}`, {
        params,
      });
      dispatch(slice.actions.getTasksSuccess(response.data, projectId));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getTasksOfCurrentUser =
  ({ limit, filterBy, filterValue }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { limit };
      if (filterBy && filterValue) {
        params[filterBy] = filterValue;
      }
      const response = await apiService.get(`/tasks/mytasks`, {
        params,
      });
      dispatch(slice.actions.getTasksSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getSingleTask = (id) => async (dispatch) => {
  try {
    dispatch(slice.actions.startLoading());
    const response = await apiService.get(`tasks/${id}`);
    dispatch(slice.actions.getSingleTaskSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const createTask = (data) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post("/tasks", data);
    const createdTask = response.data;
    dispatch(slice.actions.createTaskSuccess(createdTask));
    toast.success(response.data.message);
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
      await apiService.put(`/tasks/${taskId}/projects/${projectId}`);
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const updateTask =
  ({ id, name, description, status, deadline, priority }) =>
  async (dispatch) => {
    try {
      dispatch(slice.actions.startLoading());
      const data = { name, description, status, deadline, priority };
      const response = await apiService.put(`/tasks/${id}`, data);
      dispatch(slice.actions.updateTaskSuccess(response.data));
      // toast.success("Task updated successfully");
      toast.success(response.data.message);
      dispatch(getSingleTask(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteTask =
  ({ id }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.delete(`/tasks/${id}`);
      dispatch(slice.actions.deleteTaskSuccess(response.data));
      toast.success(response.data.message);
      dispatch(getTasks());
      console.log("getTasks called after delete");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const assignTask =
  ({ taskId, userId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/tasks/${taskId}/users/${userId}`);
      dispatch(slice.actions.assignTaskSuccess(response.data));
      toast.success(response.data.message);
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export default slice.reducer;
