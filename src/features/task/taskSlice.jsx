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
    deleteTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { id } = action.payload.data;
      state.tasksList = state.tasksList.filter((task) => task._id !== id);
    },

    // deleteTaskSuccess(state, action) {
    //   state.isLoading = false;
    //   state.error = null;
    //   const taskId = action.payload;
    //   state.tasksList = state.tasksList.filter((task) => task._id !== taskId);
    // },
  },
});

export const getTasks =
  ({ projectId, limit }) =>
  async (dispatch) => {
    console.log("getTasks called");
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`/task?limit=${limit}`);
      dispatch(slice.actions.getTasksSuccess(response.data, projectId));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getSingleTask = (id) => async (dispatch) => {
  try {
    dispatch(slice.actions.startLoading());
    const response = await apiService.get(`task/${id}`);
    dispatch(slice.actions.getSingleTaskSuccess(response.data));
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

export const updateTask =
  ({ id, name, description, status, deadline, priority }) =>
  async (dispatch) => {
    try {
      dispatch(slice.actions.startLoading());
      const data = { name, description, status, deadline, priority };
      const response = await apiService.put(`/task/${id}`, data);
      dispatch(slice.actions.updateTaskSuccess(response.data));
      toast.success(response.message);
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
      const response = await apiService.delete(`/task/${id}`);
      dispatch(slice.actions.deleteTaskSuccess(response.data));
      toast.success(response.data);
      console.log("delete task succeed");
      dispatch(getTasks());
      console.log("getTasks called after delete");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export default slice.reducer;