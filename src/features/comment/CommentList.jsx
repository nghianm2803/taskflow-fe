import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getComments } from "./commentSlice";
import CommentCard from "./CommentCard";
import LoadingScreen from "../../components/LoadingScreen";

function CommentList({ taskId }) {
  const { commentsByTask, commentsById, isLoading } = useSelector(
    (state) => ({
      commentsByTask: state.comment.commentsByTask[taskId],
      commentsById: state.comment.commentsById,
      isLoading: state.comment.isLoading,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("taskId:", taskId); // Log taskId
    if (taskId) {
      dispatch(getComments({ taskId }));
    }
  }, [taskId, dispatch]);

  console.log("commentsByTask:", commentsByTask); // Log commentsByTask
  console.log("commentsById:", commentsById); // Log commentsById

  let renderComments;

  if (commentsByTask) {
    const comments = commentsByTask.map((commentId) => commentsById[commentId]);
    renderComments = (
      <Stack spacing={1.5}>
        {comments.map((comment) => (
          <CommentCard key={comment._id} comment={comment} />
        ))}
      </Stack>
    );
  } else if (isLoading) {
    renderComments = <LoadingScreen />;
  }

  return <Stack spacing={1.5}>{renderComments}</Stack>;
}

export default CommentList;
