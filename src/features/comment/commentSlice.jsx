import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  commentsById: {},
  updatedComment: {},
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

    updateCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const updatedComment = action.payload.data;
      state.updatedComment = updatedComment;
    },
    deleteCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      delete state.comment;
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

export const updateComment =
  ({ taskId, id, content }) =>
    async (dispatch) => {
      try {
        dispatch(slice.actions.startLoading());
        const response = await apiService.put(`/comments/${id}`, { content });
        dispatch(slice.actions.updateCommentSuccess(response.data));
        toast.success(response.data.message);
        dispatch(getComments({ taskId }));
      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }
    };

export const deleteComment =
  ({ taskId, id }) =>
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
        const response = await apiService.delete(`/comments/${id}`);
        dispatch(slice.actions.deleteCommentSuccess(response.data));
        toast.success(response.data.message);
        dispatch(getComments({ taskId }));
      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }
    };
