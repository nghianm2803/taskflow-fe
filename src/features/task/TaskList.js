import React, { useEffect } from "react";
import TaskCard from "./TaskCard";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getTasks } from "./taskSlice";
import LoadingScreen from "../../components/LoadingScreen";
import { Stack } from "@mui/material";

/**
 * Check project id to GET total tasks of its.
 * Display tasks?.map in TaskCard form
 * Box list of tasks devided into 4 column Pending, Working, Review, Done
 * Check task.status === "status" for fit column
 * SingleProject get import TaskList of its
 */

const TaskList = ({ projectId }) => {
  const { projectTo, isLoading } =
    useSelector(
      (state) => ({
        projectTo: state.task.projectTo,
        isLoading: state.task.isLoading,
      }),
      shallowEqual
    );
  const dispatch = useDispatch();

  useEffect(() => {
    if (projectId) dispatch(getTasks({ projectId }));
  }, [projectId, dispatch]);

  let renderTasks;

  if (projectTo) {
    const tasks = projectTo.map((taskId) => projectTo[taskId]);
    renderTasks = (
      <Stack spacing={1.5}>
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </Stack>
    );
  } else if (isLoading) {
    renderTasks = <LoadingScreen />;
  }
};

export default TaskList;
