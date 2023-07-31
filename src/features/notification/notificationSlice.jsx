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
      state.totalPage = totalPage;
      state.count = count;
    },
    countNewNotificationSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { count } = action.payload.data;
      state.unreadCount = count;
    }
  },
});

export const getAllNotificationOfUser = ({ limit }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const params = { limit }
    const response = await apiService.get(`/notifications`, { params });
    dispatch(slice.actions.getNotificationSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const readAllNotifications = (limit) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    await apiService.put("/notifications");
    dispatch(getAllNotificationOfUser({ limit }));
    dispatch(countNewNotifications());
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
}

export const readNotification = ({ id, limit }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    await apiService.put(`/notifications/${id}`);
    dispatch(getAllNotificationOfUser({ limit }));
    dispatch(countNewNotifications());
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
}

export const countNewNotifications = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get('/notifications/new');
    dispatch(slice.actions.countNewNotificationSuccess(response.data))
    console.log("count new noti:", response);
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
}

export default slice.reducer;
