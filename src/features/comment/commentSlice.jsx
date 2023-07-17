import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  commentsById: {},
};

const slice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getCommentsSuccess(state, action) {
      state.isLoading = false;
      state.error = "";
      const { comments } = action.payload.data;

      comments.forEach((comment) => {
        state.commentsById[comment._id] = comment;
      });
    },

    createCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export default slice.reducer;

export const getComments =
  ({ taskId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`/tasks/${taskId}/comments`);
      console.log("API response:", response.data); // Log the response data
      dispatch(
        slice.actions.getCommentsSuccess({
          ...response.data,
          taskId,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const createComment =
  ({ taskId, content }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/comments", {
        taskId,
        content,
      });
      dispatch(slice.actions.createCommentSuccess(response.data));
      dispatch(getComments({ taskId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
