import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  notifications: [],
  count: null
};

const slice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getNotificationSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { notifications, totalPage, count } = action.payload.data;
      state.notifications = notifications;
      state.totalPage = totalPage
      state.count = count
    },
    countNewNotificationSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { count } = action.payload.data;
      state.count = count;
    }
  },
});

export const getAllNotificationOfUser = ({ limit = 10, page }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const params = { limit, page }
    const response = await apiService.get(`/notifications`, { params });
    dispatch(slice.actions.getNotificationSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const updateNotification = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put("/notifications");
    console.log(response.data)
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
}

export const countNewNotifications = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get('/notifications/new');
    dispatch(slice.actions.countNewNotificationSuccess(response.data))
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
}

export default slice.reducer;
