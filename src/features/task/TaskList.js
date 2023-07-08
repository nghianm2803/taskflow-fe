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
 * SingleProject get import TasksList of its
 */

const TaskList = ({ projectId }) => {
  const { tasksList, isLoading } = useSelector((state) => state.task);
  console.log("TaskList - tasksList:", tasksList);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (projectId) {
      dispatch(getTasks({ projectId }));
    }
    console.log("TaskList - projectId:", projectId);
    console.log("TaskList - tasksList:", tasksList);
  }, [projectId, dispatch]);

  let renderTasks;

  if (tasksList && tasksList.length > 0) {
    renderTasks = (
      <Stack spacing={1.5}>
        {tasksList.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </Stack>
    );
  } else if (isLoading) {
    renderTasks = <LoadingScreen />;
  }

  console.log("TaskList - Rendered tasks:", renderTasks);

  return renderTasks;
};

export default TaskList;
