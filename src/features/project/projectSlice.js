import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
import { PROJECTS_LIMIT_PER_PAGE } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  project: [],
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
    // createDonationSuccess(state, action) {
    //   state.isLoading = false;
    //   state.error = null;
    //   const { donation } = action.payload;
    //   state.donation = donation;
    // },
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

      console.log("API Response:", response.data); // Log the response data

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
    dispatch(slice.actions.getSingleProjectSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

// export const createDonation =
//   ({ projectId, userId, amount, status }) =>
//   async (dispatch) => {
//     try {
//       dispatch(slice.actions.startLoading());
//       const response = await apiService.post(
//         `/project/${projectId}/donation/${userId}`,
//         { amount, status }
//       );
//       dispatch(slice.actions.createDonationSuccess(response.data));

//     } catch (error) {
//       dispatch(slice.actions.hasError(error.message));
//       toast.error(error.message);
//     }
//   };

export default slice.reducer;
