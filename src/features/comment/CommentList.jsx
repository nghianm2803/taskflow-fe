import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getComments } from "./commentSlice";
import CommentCard from "./CommentCard";
import LoadingScreen from "../../components/LoadingScreen";

function CommentList({ taskId }) {
  const { commentsById, isLoading } = useSelector(
    (state) => ({
      commentsById: state.comment.commentsById,
      isLoading: state.comment.isLoading,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (taskId) {
      dispatch(getComments({ taskId }));
    }
  }, [taskId, dispatch]);

  const filterCommentsOfTaskId = () => {
    return Object.values(commentsById).filter(
      (comment) => comment.task === taskId
    );
  };

  const commentsOfTask = filterCommentsOfTaskId();

  let renderComments;

  if (commentsOfTask.length > 0) {
    renderComments = (
      <Stack spacing={1.5}>
        {commentsOfTask.map((comment) => (
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
