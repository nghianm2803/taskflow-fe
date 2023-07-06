import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
import { PROJECTS_LIMIT_PER_PAGE } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  project: [],
  updatedProject: {},
};

const slice = createSlice({
  name: "project",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getProjectSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { projects, totalPages } = action.payload.data; // The API response data <========================
      state.project = projects;
      state.totalPages = totalPages;
    },
    getSingleProjectSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const currentProject = action.payload.data;
      state.currentProject = currentProject;
    },
    createProjectSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { project } = action.payload.data;
      state.project = [...state.project, project];
    },
    updateProjectSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const updatedProject = action.payload.data;
      state.updatedProject = updatedProject;
    },
    deleteProjectSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { project } = action.payload.data;
      console.log("project", project);
      delete state.project;
    },
  },
});

export const getProjects =
  ({ page, limit = PROJECTS_LIMIT_PER_PAGE, search, sortBy }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      if (search) {
        params.search = search;
      }
      if (sortBy) {
        params.sortBy = sortBy;
      }
      const response = await apiService.get(`/project`, {
        params,
      });

      dispatch(slice.actions.getProjectSuccess(response.data));
    } catch (error) {
      console.error("Error occurred during API request:", error);
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getSingleProject = (id) => async (dispatch) => {
  try {
    dispatch(slice.actions.startLoading());

    const response = await apiService.get(`project/${id}`);

    console.log("log response: ", response);
    dispatch(slice.actions.getSingleProjectSuccess(response.data));

    console.log("log response.data: ", response.data);
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const createProject =
  ({ name, description }) =>
  async (dispatch) => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await apiService.post("/project/", {
        name,
        description,
      });
      dispatch(slice.actions.createProjectSuccess(response.data));
      toast.success(response.message);
      dispatch(getProjects());
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const updateProject =
  ({ id, name, description, deadline, priority }) =>
  async (dispatch) => {
    try {
      dispatch(slice.actions.startLoading());
      const data = { name, description, deadline, priority };
      const response = await apiService.put(`/project/${id}`, data);
      dispatch(slice.actions.updateProjectSuccess(response.data));
      toast.success(response.message);
      dispatch(getSingleProject(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export default slice.reducer;
