import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { cloudinaryUpload } from "../../utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  updatedProfile: null,
  user: null,
  users: [],
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { users, totalPages, count } = action.payload.data;
      users.forEach((user) => (state.users[user._id] = user));
      state.users = users;
      state.count = count;
      state.totalPages = totalPages;
    },
    getUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.user = action.payload;
    },
    updateUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const updatedUser = action.payload;
      state.updatedProfile = updatedUser;
    },
  },
});

export default slice.reducer;

export const getUsers =
  ({ page, limit, name }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      if (name) {
        params.name = name;
      }
      const response = await apiService.get(`/users`, {
        params,
      });
      dispatch(slice.actions.getUsersSuccess(response.data));
    } catch (error) {
      console.error("Error occurred during API request:", error);
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getUser = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/users/${id}`);
    dispatch(slice.actions.getUserSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};

export const getCurrentUserProfile = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/users/me");
    dispatch(slice.actions.updateUserProfileSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

export const updateUserProfile =
  ({ userId, name, avatar }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = { name };
      if (avatar instanceof File) {
        const imageUrl = await cloudinaryUpload(avatar);
        data.avatar = imageUrl;
      }
      const response = await apiService.put(`/users/${userId}`, data);
      dispatch(slice.actions.updateUserProfileSuccess(response.data));
      toast.success(response.data.message);
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const sendInvitation =
  ({ email }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = { email };
      await apiService.post(`/auth/invitation`, data);
      toast.success("Send invitation successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const forgotPassword =
  ({ email }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = { email };
      await apiService.post(`/auth/forget-password`, data);
      toast.success("Send email successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
