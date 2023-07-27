import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
import { PROJECTS_LIMIT_PER_PAGE } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  project: [],
  updatedProject: {},
  currentPageProjects: [],

  currentPagePosts: [],
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
      const { projects, totalPages, count } = action.payload.data;

      projects.forEach((project) => (state.project[project._id] = project));
      state.project = projects;
      state.count = count;
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
      const { id } = action.payload.data;
      state.project = state.project.filter((project) => project._id !== id);
      state.currentProject = {};
    },
  },
});

export const getProjects =
  ({ page, limit = PROJECTS_LIMIT_PER_PAGE, name }) =>
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
        const params = { page, limit };
        if (name) {
          params.name = name;
        }
        const response = await apiService.get(`/projects`, {
          params,
        });

        dispatch(slice.actions.getProjectSuccess(response.data));
      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }
    };

export const getSingleProject = (id) => async (dispatch) => {
  try {
    dispatch(slice.actions.startLoading());

    const response = await apiService.get(`projects/${id}`);

    dispatch(slice.actions.getSingleProjectSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const createProject =
  ({ name, description, page, limit = PROJECTS_LIMIT_PER_PAGE }) =>
    async (dispatch) => {
      try {
        dispatch(slice.actions.startLoading());
        const response = await apiService.post("/projects", {
          name,
          description,
        });
        dispatch(slice.actions.createProjectSuccess(response.data));
        toast.success(response.data.message);
        dispatch(getProjects({ page, limit }));
      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }
    };

export const updateProject =
  ({ id, name, description }) =>
    async (dispatch) => {
      try {
        dispatch(slice.actions.startLoading());
        const data = { name, description };
        const response = await apiService.put(`/projects/${id}`, data);
        dispatch(slice.actions.updateProjectSuccess(response.data));
        toast.success(response.data.message);
        dispatch(getSingleProject(id));
      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }
    };

export const deleteProject =
  ({ id }) =>
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
        const response = await apiService.delete(`/projects/${id}`);
        console.log("res", response);
        dispatch(slice.actions.deleteProjectSuccess(response.data));
        toast.success(response.data.message);
        dispatch(getSingleProject(id));
      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }
    };

export default slice.reducer;
